import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sightWordSets, sightWordQuiz } from '../../data/english/sightWords'
import { useAudio } from '../../hooks/useAudio'
import { useQuiz } from '../../hooks/useQuiz'
import QuizContainer from '../shared/QuizContainer'
import QuizComplete from '../shared/QuizComplete'
import './SightWords.css'

export default function SightWords() {
  const [mode, setMode] = useState('learn')
  const [levelIndex, setLevelIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const { speak } = useAudio()
  const quiz = useQuiz(sightWordQuiz)

  const level = sightWordSets[levelIndex]
  const word = level.words[wordIndex]

  if (mode === 'quiz') {
    if (quiz.status === 'complete') {
      return <QuizComplete score={quiz.score} total={quiz.total} onReset={() => { quiz.reset(); setMode('learn') }} />
    }
    const q = quiz.currentQuestion
    return (
      <QuizContainer
        question={<h2 style={{ fontSize: 28, color: 'var(--english)', textAlign: 'center' }}>{q.question}</h2>}
        options={q.options.map(o => ({ value: o, label: o }))}
        selectedAnswer={quiz.selectedAnswer}
        correctAnswer={q.correctAnswer}
        isCorrect={quiz.isCorrect}
        isAnswered={quiz.status === 'answered'}
        wrongAnswers={quiz.wrongAnswers}
        onSelect={quiz.checkAnswer}
        onNext={quiz.next}
        questionLabel={quiz.currentIndex}
        progress={{ current: quiz.currentIndex + 1, total: quiz.total }}
      />
    )
  }

  return (
    <div className="sight-words">
      <h2 className="sw-title">Sight Words 👁️</h2>

      <div className="sw-levels">
        {sightWordSets.map((s, i) => (
          <button
            key={s.level}
            className={`sw-level ${i === levelIndex ? 'active' : ''}`}
            onClick={() => { setLevelIndex(i); setWordIndex(0) }}
          >
            {s.level}
          </button>
        ))}
      </div>

      <div className="sw-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((wordIndex + 1) / level.words.length) * 100}%` }} />
        </div>
        <span className="progress-text">{wordIndex + 1} / {level.words.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${levelIndex}-${wordIndex}`}
          className="sw-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="sw-word" onClick={() => speak(word.word)}>{word.word}</div>
          <p className="sw-sentence">{word.sentence}</p>
          <button className="sw-hear" onClick={() => speak(word.sentence)}>
            🔊 Hear the sentence
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="sw-nav">
        <button
          className="sw-nav-btn"
          onClick={() => setWordIndex(i => i - 1)}
          disabled={wordIndex === 0}
        >
          ← Previous
        </button>
        <button
          className="sw-nav-btn"
          onClick={() => setWordIndex(i => i + 1)}
          disabled={wordIndex === level.words.length - 1}
        >
          Next →
        </button>
      </div>

      <motion.button className="sw-quiz-btn" onClick={() => setMode('quiz')} whileHover={{ scale: 1.05 }}>
        Take the Quiz! 🎯
      </motion.button>
    </div>
  )
}
