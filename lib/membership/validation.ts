// Membership form rules, shared by the browser form and the API route so both
// sides check exactly the same things. Contains no secrets.

export const LIMITS = {
    fullName: 100,
    phone: 20,
    email: 254,
    address: 500,
    comments: 1000,
} as const;

export type MembershipInput = {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    comments: string;
};

export type MembershipField = keyof MembershipInput;

export type FieldErrors = Partial<Record<MembershipField | "consent", string>>;

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Optional leading +, then 10–15 digits (covers Indian and international numbers).
const PHONE_PATTERN = /^\+?\d{10,15}$/;

/** Trims text and strips invisible control characters. */
export function cleanText(value: unknown, multiline = false): string {
    if (typeof value !== "string") return "";
    const stripped = value.replace(CONTROL_CHARS, "");
    return multiline
        ? stripped.replace(/\r\n?/g, "\n").trim()
        : stripped.replace(/\s+/g, " ").trim();
}

/** Removes spaces, dashes, dots and brackets so "+91 98765-43210" → "+919876543210". */
export function normalizePhone(value: string): string {
    return value.replace(/[\s\-().]/g, "");
}

// Each validator returns an error message, or true when the value is fine.
export const validators: Record<MembershipField, (value: string) => string | true> = {
    fullName(value) {
        const v = cleanText(value);
        if (!v) return "Please enter your full name.";
        if (v.length < 2) return "Name looks too short.";
        if (v.length > LIMITS.fullName) return `Name must be ${LIMITS.fullName} characters or fewer.`;
        if (!NAME_PATTERN.test(v)) return "Name can only contain letters, spaces, dots, apostrophes and hyphens.";
        return true;
    },
    phone(value) {
        const v = cleanText(value);
        if (!v) return "Please enter your phone number.";
        if (v.length > LIMITS.phone) return "Phone number is too long.";
        if (!PHONE_PATTERN.test(normalizePhone(v))) return "Enter a valid phone number, e.g. +91 98765 43210.";
        return true;
    },
    email(value) {
        const v = cleanText(value);
        if (!v) return "Please enter your email address.";
        if (v.length > LIMITS.email) return "Email address is too long.";
        if (!EMAIL_PATTERN.test(v)) return "Enter a valid email address.";
        return true;
    },
    address(value) {
        const v = cleanText(value, true);
        if (!v) return "Please enter your residential address.";
        if (v.length < 10) return "Please enter your full address.";
        if (v.length > LIMITS.address) return `Address must be ${LIMITS.address} characters or fewer.`;
        return true;
    },
    comments(value) {
        const v = cleanText(value, true);
        if (v.length > LIMITS.comments) return `Comments must be ${LIMITS.comments} characters or fewer.`;
        return true;
    },
};

/**
 * Server-side check of a raw request body. Returns cleaned, normalised data
 * or a set of per-field error messages.
 */
export function validateMembership(
    raw: unknown,
): { ok: true; data: MembershipInput } | { ok: false; errors: FieldErrors } {
    const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
    const errors: FieldErrors = {};

    const data: MembershipInput = {
        fullName: cleanText(body.fullName),
        phone: cleanText(body.phone),
        email: cleanText(body.email),
        address: cleanText(body.address, true),
        comments: cleanText(body.comments, true),
    };

    for (const field of Object.keys(validators) as MembershipField[]) {
        const result = validators[field](data[field]);
        if (result !== true) errors[field] = result;
    }

    if (body.consent !== true) {
        errors.consent = "Please agree so we can store your details for your membership.";
    }

    if (Object.keys(errors).length > 0) return { ok: false, errors };

    return {
        ok: true,
        data: {
            ...data,
            phone: normalizePhone(data.phone),
            email: data.email.toLowerCase(),
        },
    };
}

/** Client-generated key that lets the server spot a repeated submission. */
export const SUBMISSION_KEY_PATTERN = /^[A-Za-z0-9-]{16,64}$/;

/** Application IDs issued by the server, e.g. "SDF260001" (older: "SDF-2026-0001"). */
export const APPLICATION_ID_PATTERN = /^SDF(?:\d{6,}|-\d{4}-\d{4,})$/;
