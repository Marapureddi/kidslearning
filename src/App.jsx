import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'

// English
import AlphabetExplorer from './components/english/AlphabetExplorer'
import VowelExplorer from './components/english/VowelExplorer'
import PhonicsMatch from './components/english/PhonicsMatch'
import SightWords from './components/english/SightWords'
import WordBuilder from './components/english/WordBuilder'
import StoryTime from './components/english/StoryTime'
import WritingPractice from './components/english/WritingPractice'

// Math
import CountingGame from './components/math/CountingGame'
import NumberRecognition from './components/math/NumberRecognition'
import AdditionGame from './components/math/AdditionGame'
import AdvancedAddition from './components/math/AdvancedAddition'
import SubtractionGame from './components/math/SubtractionGame'
import AdvancedSubtraction from './components/math/AdvancedSubtraction'
import ShapeExplorer from './components/math/ShapeExplorer'

// Puzzles
import MemoryCards from './components/puzzles/MemoryCards'
import PatternCompletion from './components/puzzles/PatternCompletion'
import MatchingPairs from './components/puzzles/MatchingPairs'
import JigsawPuzzle from './components/puzzles/JigsawPuzzle'

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
        <Route path="/english/vowels" element={<VowelExplorer />} />
        <Route path="/english/phonics" element={<PhonicsMatch />} />
        <Route path="/english/sight-words" element={<SightWords />} />
        <Route path="/english/words" element={<WordBuilder />} />
        <Route path="/english/stories" element={<StoryTime />} />
        <Route path="/english/writing" element={<WritingPractice />} />

        {/* Math */}
        <Route path="/math/counting" element={<CountingGame />} />
        <Route path="/math/numbers" element={<NumberRecognition />} />
        <Route path="/math/addition" element={<AdditionGame />} />
        <Route path="/math/advanced-addition" element={<AdvancedAddition />} />
        <Route path="/math/subtraction" element={<SubtractionGame />} />
        <Route path="/math/advanced-subtraction" element={<AdvancedSubtraction />} />
        <Route path="/math/shapes" element={<ShapeExplorer />} />

        {/* Puzzles */}
        <Route path="/puzzles/memory" element={<MemoryCards />} />
        <Route path="/puzzles/patterns" element={<PatternCompletion />} />
        <Route path="/puzzles/matching" element={<MatchingPairs />} />
        <Route path="/puzzles/jigsaw" element={<JigsawPuzzle />} />

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
