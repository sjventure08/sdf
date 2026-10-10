import './globals.css'
import Hero from '@/components/Hero'
import KumbhMela from '@/components/KumbhMela'
import Overview from '@/components/Overview'
import Mission from '@/components/Mission'
import Impact from '@/components/Impact'
import InterestedForm from '@/components/Intrestedform'
import Blog from '@/components/Blog'
import Hero1 from '@/components/Hero1'

export default function Home() {
  return(
    <main>
      <Hero1 />
      <KumbhMela />
      <Overview />
      <Mission />
      <Impact />
      <InterestedForm />
      <Blog />
    </main>
  )
}
