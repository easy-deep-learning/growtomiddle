import Link from 'next/link'

export default function HomePage () {
  return (
    <div className="HomePage">
      <header>
        <h1>How to build a web application</h1>
      </header>
      <menu>
        <ul>
          <li><Link href="/static-html">The simpliest static way: HTML + CSS</Link></li>
          <li><Link href="/static-react">The static way: React in Next.js</Link></li>
          <li><Link href="/markdown-to-react">Markdown to data</Link></li>
          <li><Link href="/contentful">Contentful</Link></li>
          <li><Link href="/databases">Databases</Link></li>
        </ul>
      </menu>
    </div>
  )
}
