import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'

// English
import AlphabetExplorer from './components/english/AlphabetExplorer'
import PhonicsMatch from './components/english/PhonicsMatch'
import WordBuilder from './components/english/WordBuilder'

// Math
import CountingGame from './components/math/CountingGame'
import NumberRecognition from './components/math/NumberRecognition'
import AdditionGame from './components/math/AdditionGame'
import ShapeExplorer from './components/math/ShapeExplorer'

// Puzzles
import MemoryCards from './components/puzzles/MemoryCards'
import PatternCompletion from './components/puzzles/PatternCompletion'
import MatchingPairs from './components/puzzles/MatchingPairs'

// Science
import AnimalSounds from './components/science/AnimalSounds'
import ColorMixing from './components/science/ColorMixing'
import NatureExplorer from './components/science/NatureExplorer'
import BodyParts from './components/science/BodyParts'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:subjectId" element={<SubjectPage />} />

        {/* English */}
        <Route path="/english/alphabet" element={<AlphabetExplorer />} />
        <Route path="/english/phonics" element={<PhonicsMatch />} />
        <Route path="/english/words" element={<WordBuilder />} />

        {/* Math */}
        <Route path="/math/counting" element={<CountingGame />} />
        <Route path="/math/numbers" element={<NumberRecognition />} />
        <Route path="/math/addition" element={<AdditionGame />} />
        <Route path="/math/shapes" element={<ShapeExplorer />} />

        {/* Puzzles */}
        <Route path="/puzzles/memory" element={<MemoryCards />} />
        <Route path="/puzzles/patterns" element={<PatternCompletion />} />
        <Route path="/puzzles/matching" element={<MatchingPairs />} />

        {/* Science */}
        <Route path="/science/animals" element={<AnimalSounds />} />
        <Route path="/science/colors" element={<ColorMixing />} />
        <Route path="/science/nature" element={<NatureExplorer />} />
        <Route path="/science/body" element={<BodyParts />} />
      </Routes>
    </AppShell>
  )
}

export default App
