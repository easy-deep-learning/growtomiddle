import {Footer} from '@/components/Footer/Footer';

export default function StaticHTMLPage() {
  return (
    <div className="StaticHTMLPage">
      <h1>Welcome to the Static HTML Page</h1>
      <section>
        <header>
          <h2>What is HTML and CSS?</h2>
        </header>
        <article>
          <p>
            HTML (HyperText Markup Language) is the standard markup language for
            documents designed to be displayed in a web browser.
            CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML.
          </p>
        </article>
        <article>
          <h3>What is HTML?</h3>
          <p>
            HTML (HyperText Markup Language) is the standard markup language for
            documents designed to be displayed in a web browser.
          </p>
        </article>
        <article>
          <h3>What is CSS?</h3>
          <p>
            CSS (Cascading Style Sheets) is a stylesheet language used to
            describe the presentation of a document written in HTML.
          </p>
        </article>
        <article>
          <h3>How to create a simple HTML page?</h3>
          <p>To create a simple HTML page, you need to write HTML code.</p>
        </article>
        <article>
          <h3>How to make your page available for the world?</h3>
          <p>
            To make your page available for the world, you need to upload it to
            a web server.
          </p>
        </article>
        <Footer />
      </section>
    </div>
  );
}
