import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { writingExercises } from '../../data/english/writing'
import { useAudio } from '../../hooks/useAudio'
import QuizComplete from '../shared/QuizComplete'
import './WritingPractice.css'

export default function WritingPractice() {
  const [catIndex, setCatIndex] = useState(0)
  const [exIndex, setExIndex] = useState(0)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState(null)
  const [done, setDone] = useState(false)
  const { speak } = useAudio()

  const category = writingExercises[catIndex]
  const exercise = category.exercises[exIndex]
  const totalInCategory = category.exercises.length

  const handleCheck = () => {
    if (input.trim().toLowerCase() === exercise.answer.toLowerCase()) {
      setIsCorrect(true)
      setScore(s => s + 1)
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } })
      speak('Great job!')
    } else {
      setIsCorrect(false)
      speak('Try again!')
    }
  }

  const handleNext = () => {
    if (exIndex + 1 >= totalInCategory) {
      setDone(true)
    } else {
      setExIndex(i => i + 1)
      setInput('')
      setIsCorrect(null)
    }
  }

  const handleReset = () => {
    setExIndex(0)
    setInput('')
    setScore(0)
    setIsCorrect(null)
    setDone(false)
  }

  if (done) return <QuizComplete score={score} total={totalInCategory} onReset={handleReset} />

  return (
    <div className="writing-practice">
      <h2 className="wp-title">Writing Practice ✍️</h2>

      <div className="wp-categories">
        {writingExercises.map((cat, i) => (
          <button
            key={cat.category}
            className={`wp-cat ${i === catIndex ? 'active' : ''}`}
            onClick={() => { setCatIndex(i); setExIndex(0); setInput(''); setIsCorrect(null); setScore(0); setDone(false) }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="wp-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((exIndex + 1) / totalInCategory) * 100}%` }} />
        </div>
        <span className="progress-text">{exIndex + 1} / {totalInCategory}</span>
      </div>

      <motion.div className="wp-card" key={`${catIndex}-${exIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="wp-prompt">Type the word: <strong>{exercise.prompt}</strong></p>
        <p className="wp-sentence">{exercise.sentence}</p>

        <div className="wp-input-row">
          <input
            className={`wp-input ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'wrong' : ''}`}
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setIsCorrect(null) }}
            placeholder="Type here..."
            onKeyDown={e => e.key === 'Enter' && handleCheck()}
            autoFocus
          />
          {isCorrect !== true && (
            <button className="wp-check" onClick={handleCheck} disabled={!input.trim()}>Check</button>
          )}
          {isCorrect === true && (
            <motion.button className="wp-next" onClick={handleNext} initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Next →
            </motion.button>
          )}
        </div>
        {isCorrect === false && <p className="wp-hint">Hint: the word is "{exercise.answer}"</p>}
      </motion.div>
    </div>
  )
}
