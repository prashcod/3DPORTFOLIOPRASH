import { Experience } from './experience/Experience'

function App() {
  return (
    <main className="app">
      <section className="experience-layer">
        <Experience />
      </section>

      <section className="interface-layer">
        <div className="hero-copy">
          <p className="eyebrow">IMMERSIVE PORTFOLIO</p>

          <h1>Prashant Gyawali</h1>

          <p className="description">
            Enter my mind, explore my projects and travel through
            the worlds that shaped my journey.
          </p>

          <div className="status">
            <span className="status-dot" />
            Phase 1 · Experience online
          </div>
        </div>
      </section>
    </main>
  )
}

export default App