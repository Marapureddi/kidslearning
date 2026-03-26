import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { animalData, animalQuizQuestions } from '../../data/science/animals'
import { useAudio } from '../../hooks/useAudio'
import QuizComplete from '../shared/QuizComplete'
import './ScienceGames.css'

export default function AnimalSounds() {
  const [mode, setMode] = useState('explore') // explore | quiz
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)
  const { speak } = useAudio()

  const handleAnimalTap = (animal) => {
    speak(`${animal.name} says ${animal.sound} ${animal.fact}`)
  }

  const handleQuizSelect = (val) => {
    if (isCorrect) return
    setSelected(val)
    const q = animalQuizQuestions[qIndex]
    if (val === q.correctAnswer) {
      setIsCorrect(true)
      setScore(s => s + 1)
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } })
    } else {
      setIsCorrect(false)
      setWrongAnswers(prev => [...prev, val])
      setTimeout(() => { setSelected(null); setIsCorrect(null) }, 800)
    }
  }

  const handleNext = () => {
    if (qIndex + 1 >= animalQuizQuestions.length) { setDone(true) }
    else { setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([]) }
  }

  const handleReset = () => {
    setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false); setMode('explore')
  }

  if (mode === 'explore') {
    return (
      <div className="science-game">
        <h2 className="science-title">Animal Sounds 🐶</h2>
        <p className="science-prompt">Tap an animal to hear its sound!</p>
        <div className="animal-grid">
          {animalData.map(animal => (
            <motion.button
              key={animal.name}
              className="animal-card"
              onClick={() => handleAnimalTap(animal)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="animal-emoji">{animal.emoji}</span>
              <span className="animal-name">{animal.name}</span>
            </motion.button>
          ))}
        </div>
        <motion.button
          className="science-next"
          onClick={() => setMode('quiz')}
          whileHover={{ scale: 1.05 }}
          style={{ background: 'var(--science)' }}
        >
          Take the Quiz! 🎯
        </motion.button>
      </div>
    )
  }

  if (done) return <QuizComplete score={score} total={animalQuizQuestions.length} onReset={handleReset} />

  const q = animalQuizQuestions[qIndex]

  return (
    <div className="science-game">
      <h2 className="science-title">Animal Sounds Quiz 🎯</h2>
      <div className="science-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / animalQuizQuestions.length) * 100}%` }} />
        </div>
        <span className="progress-text">{qIndex + 1} / {animalQuizQuestions.length}</span>
      </div>

      <p className="science-prompt">Who says...</p>
      <motion.div
        className="sound-bubble"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        key={qIndex}
        onClick={() => speak(q.sound)}
        style={{ cursor: 'pointer' }}
      >
        "{q.sound}" 🔊
      </motion.div>

      <div className="animal-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 400 }}>
        {q.options.map(opt => (
          <motion.button
            key={opt}
            className={`animal-card ${selected === opt && isCorrect ? 'correct' : ''} ${selected === opt && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt) ? 'dimmed' : ''}`}
            onClick={() => handleQuizSelect(opt)}
            disabled={isCorrect}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="animal-emoji">{opt}</span>
          </motion.button>
        ))}
      </div>

      {isCorrect && (
        <motion.button className="science-next" onClick={handleNext} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Next →
        </motion.button>
      )}
    </div>
  )
}
