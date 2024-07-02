import Link from 'next/link'

export default function HomePage () {
  return (
    <div className="HomePage">
      <menu>
        <ul>
          <li><Link href="/information">What is the information?</Link></li>
          <li>Binary logic: why and how</li>
          <li>Programming languages</li>
          <li>JavaScript and its runtimes</li>
          <li>Client-Server interactions</li>
          <li>Server: how store and transfer data</li>
          <li>Client: HTML/CSS, DOM and types of rendering</li>
        </ul>
      </menu>
    </div>
  )
}
