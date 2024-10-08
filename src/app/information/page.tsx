import Link from 'next/link'

export default function InformationPage() {
  return (
    <div className="InformationPage">
      <main>
        <h2>What its the information?</h2>
        <p>Information is like knowing something.</p>
        <p>
          It&apos;s facts, details, or news about a person, thing, or event.
        </p>
        <ul>
          <li>Example: A phone number is information.</li>
          <li>Example: A recipe is information.</li>
          <li>Example: A news story is information.</li>
        </ul>
        <p>Basically, anything that tells you something is information!</p>

        <h3>Signal vs Noise</h3>
        <p>
          Noise is any random interference that obscures or changes a message
          during its transmission from the sender to the receiver. Essentially,
          it&apos;s any unwanted signal that corrupts the original data.
        </p>
      </main>
    </div>
  )
}
