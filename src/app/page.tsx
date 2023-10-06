import Link from 'next/link'

import { AuthPanel } from '@/components/AuthPanel'

export default function Home () {
  return (
    <div>
      <AuthPanel />
      <menu>
        <ul>
          <li>menu here</li>
        </ul>
      </menu>
      <h2>You desk will be here (TODO)</h2>
    </div>
  )
}
