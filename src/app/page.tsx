import Link from 'next/link';

import { AuthPanel } from '@/components/AuthPanel';

export default function HomePage() {
  return (
    <div className="HomePage">
      <AuthPanel />
      <menu>
        <ul>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/learn-english">learn-english</Link>
          </li>
        </ul>
      </menu>
    </div>
  );
}
