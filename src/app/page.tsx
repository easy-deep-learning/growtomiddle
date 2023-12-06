import { AuthPanel } from '@/components/AuthPanel'
import Link from 'next/link'

export default function HomePage () {
  return (
    <div className="HomePage">
      <AuthPanel />
      <menu>
        <ul>
          <li><Link href="/projects">Projects</Link></li>
        </ul>
      </menu>
    </div>
  )
}
