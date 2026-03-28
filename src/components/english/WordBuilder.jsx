import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { wordData } from '../../data/english/words'
import { useAudio } from '../../hooks/useAudio'
import QuizComplete from '../shared/QuizComplete'
import './WordBuilder.css'

const WORDS_PER_ROUND = 15

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandom(arr, count) {
  return shuffle(arr).slice(0, count)
}

export default function WordBuilder() {
  const [words, setWords] = useState(() => pickRandom(wordData, WORDS_PER_ROUND))
  const [wordIndex, setWordIndex] = useState(0)
  const [selected, setSelected] = useState([])
  const [scrambled, setScrambled] = useState(() => shuffle(words[0].word.split('')))
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { speak } = useAudio()

  const current = words[wordIndex]
  const targetWord = current.word

  const handleLetterTap = useCallback((letter, scrambledIndex) => {
    if (isCorrect) return
    const newSelected = [...selected, { letter, scrambledIndex }]
    setSelected(newSelected)

    const builtWord = newSelected.map(s => s.letter).join('')

    if (builtWord.length === targetWord.length) {
      if (builtWord === targetWord) {
        setIsCorrect(true)
        setScore(s => s + 1)
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } })
        speak(`Great job! ${targetWord}!`)
      } else {
        speak('Try again!')
        setTimeout(() => {
          setSelected([])
        }, 800)
      }
    }
  }, [selected, targetWord, isCorrect, speak])

  const handleUndo = () => {
    if (isCorrect) return
    setSelected(prev => prev.slice(0, -1))
  }

  const handleNext = () => {
    if (wordIndex + 1 >= words.length) {
      setDone(true)
    } else {
      const nextIdx = wordIndex + 1
      setWordIndex(nextIdx)
      setSelected([])
      setScrambled(shuffle(words[nextIdx].word.split('')))
      setIsCorrect(false)
    }
  }

  const handleReset = () => {
    const newWords = pickRandom(wordData, WORDS_PER_ROUND)
    setWords(newWords)
    setWordIndex(0)
    setSelected([])
    setScrambled(shuffle(newWords[0].word.split('')))
    setScore(0)
    setDone(false)
    setIsCorrect(false)
  }

  if (done) {
    return <QuizComplete score={score} total={words.length} onReset={handleReset} />
  }

  const usedIndices = selected.map(s => s.scrambledIndex)
  const builtWord = selected.map(s => s.letter).join('')

  return (
    <div className="word-builder">
      <h2 className="wb-title">Word Builder ✏️</h2>

      <div className="wb-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((wordIndex + 1) / words.length) * 100}%` }} />
        </div>
        <span className="progress-text">{wordIndex + 1} / {words.length}</span>
      </div>

      <div className="wb-prompt">
        <span className="wb-emoji">{current.emoji}</span>
        <p className="wb-hint">{current.hint}</p>
      </div>

      <div className="wb-slots">
        {targetWord.split('').map((_, i) => (
          <motion.div
            key={i}
            className={`wb-slot ${builtWord[i] ? 'filled' : ''} ${isCorrect ? 'correct' : ''} ${builtWord.length === targetWord.length && !isCorrect && builtWord[i] ? 'shake wrong' : ''}`}
            animate={builtWord[i] ? { scale: [1, 1.1, 1] } : {}}
          >
            {builtWord[i] || ''}
          </motion.div>
        ))}
      </div>

      <div className="wb-letters">
        {scrambled.map((letter, i) => (
          <motion.button
            key={i}
            className={`wb-letter ${usedIndices.includes(i) ? 'used' : ''}`}
            onClick={() => handleLetterTap(letter, i)}
            disabled={usedIndices.includes(i)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {letter}
          </motion.button>
        ))}
      </div>

      <div className="wb-actions">
        {!isCorrect && selected.length > 0 && (
          <button className="wb-undo" onClick={handleUndo}>Undo</button>
        )}
        {isCorrect && (
          <motion.button
            className="wb-next"
            onClick={handleNext}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            Next →
          </motion.button>
        )}
      </div>
    </div>
  )
}
