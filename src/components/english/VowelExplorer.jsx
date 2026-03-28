import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaVolumeUp } from 'react-icons/fa'
import { vowelData, vowelQuizQuestions } from '../../data/english/vowels'
import { useAudio } from '../../hooks/useAudio'
import { useQuiz } from '../../hooks/useQuiz'
import QuizContainer from '../shared/QuizContainer'
import QuizComplete from '../shared/QuizComplete'
import './VowelExplorer.css'

export default function VowelExplorer() {
  const [mode, setMode] = useState('explore')
  const [index, setIndex] = useState(0)
  const { speak } = useAudio()
  const quiz = useQuiz(vowelQuizQuestions)

  const vowel = vowelData[index]

  if (mode === 'quiz') {
    if (quiz.status === 'complete') {
      return <QuizComplete score={quiz.score} total={quiz.total} onReset={() => { quiz.reset(); setMode('explore') }} />
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
    <div className="vowel-explorer">
      <h2 className="vowel-title">Vowel Explorer 🔤</h2>
      <p className="vowel-subtitle">A, E, I, O, U — The 5 Vowels!</p>

      <div className="vowel-nav">
        {vowelData.map((v, i) => (
          <button
            key={v.vowel}
            className={`vowel-tab ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          >
            {v.vowel}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={vowel.vowel}
          className="vowel-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="vowel-letter">{vowel.vowel}</div>

          <button className="vowel-hear" onClick={() => speak(`${vowel.vowel}. The vowel ${vowel.vowel}`)}>
            <FaVolumeUp /> Hear it!
          </button>

          <div className="vowel-sounds">
            <div className="sound-section">
              <h3>Short Sound</h3>
              <p className="sound-text">{vowel.shortSound}</p>
              <div className="sound-words">
                {vowel.shortWords.map(w => (
                  <button key={w.word} className="sound-word" onClick={() => speak(w.word)}>
                    <span>{w.emoji}</span> {w.word}
                  </button>
                ))}
              </div>
            </div>
            <div className="sound-section">
              <h3>Long Sound</h3>
              <p className="sound-text">{vowel.longSound}</p>
              <div className="sound-words">
                {vowel.longWords.map(w => (
                  <button key={w.word} className="sound-word" onClick={() => speak(w.word)}>
                    <span>{w.emoji}</span> {w.word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="vowel-nav-arrows">
        <button className="vowel-arrow" onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0}>
          <FaArrowLeft /> Prev
        </button>
        <button className="vowel-arrow" onClick={() => setIndex(i => Math.min(vowelData.length - 1, i + 1))} disabled={index === vowelData.length - 1}>
          Next <FaArrowRight />
        </button>
      </div>

      <motion.button className="vowel-quiz-btn" onClick={() => setMode('quiz')} whileHover={{ scale: 1.05 }}>
        Take the Quiz! 🎯
      </motion.button>
    </div>
  )
}
