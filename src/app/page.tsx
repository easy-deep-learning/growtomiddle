import { AuthPanel } from '@/components/AuthPanel'
import { Goal } from '@/components/Goal'

export default function HomePage () {
  return (
    <div className="HomePage">
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
