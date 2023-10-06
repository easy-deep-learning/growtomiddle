import { AuthPanel } from '@/components/AuthPanel'
import { Goal } from '@/components/Goal'

export default function Home () {
  return (
    <div>
      <AuthPanel />
      <menu>
        <ul>
          <li>menu here</li>
        </ul>
      </menu>
      <h2>Начало пути</h2>
      <Goal />
    </div>
  )
}
