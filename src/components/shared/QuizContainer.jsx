import { motion, AnimatePresence } from 'framer-motion'
import FeedbackOverlay from './FeedbackOverlay'
import './QuizContainer.css'

export default function QuizContainer({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  isCorrect,
  isAnswered,
  wrongAnswers = [],
  onSelect,
  onNext,
  renderOption,
  questionLabel,
  progress,
}) {
  return (
    <div className="quiz-container">
      {progress && (
        <div className="quiz-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <span className="progress-text">{progress.current} / {progress.total}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={questionLabel || question}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="quiz-question-area"
        >
          <div className="quiz-prompt">
            {typeof question === 'string' ? <h2>{question}</h2> : question}
          </div>

          <div className="quiz-options">
            {options.map((option, i) => {
              const value = option.value ?? option
              const isSelected = selectedAnswer === value
              const isWrong = wrongAnswers.includes(value)
              const isCorrectAnswer = isAnswered && value === correctAnswer

              return (
                <motion.button
                  key={value}
                  className={`quiz-option ${isSelected && isCorrect ? 'correct' : ''} ${isSelected && isCorrect === false ? 'shake wrong' : ''} ${isWrong && !isSelected ? 'dimmed' : ''} ${isCorrectAnswer ? 'correct' : ''}`}
                  onClick={() => onSelect(value)}
                  disabled={isAnswered}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {renderOption ? renderOption(option) : (
                    <span className="option-content">
                      {option.emoji && <span className="option-emoji">{option.emoji}</span>}
                      <span className="option-label">{option.label ?? option}</span>
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isAnswered && (
          <FeedbackOverlay isCorrect={isCorrect} onNext={onNext} />
        )}
      </AnimatePresence>
    </div>
  )
}
