import { JourneyDebugPanel } from './components/JourneyDebugPanel'
import { JourneyInterface } from './components/JourneyInterface'
import { Experience } from './experience/Experience'
import { JourneyInput } from './experience/JourneyInput'

function App() {
  return (
    <main className="app">
      <section className="experience-layer">
        <Experience />
      </section>

      <JourneyInput />
      <JourneyInterface />
      <JourneyDebugPanel />
    </main>
  )
}

export default App