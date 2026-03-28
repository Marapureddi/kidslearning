import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { storyData } from '../../data/english/stories'
import { useAudio } from '../../hooks/useAudio'
import { useQuiz } from '../../hooks/useQuiz'
import QuizContainer from '../shared/QuizContainer'
import QuizComplete from '../shared/QuizComplete'
import './StoryTime.css'

export default function StoryTime() {
  const [storyIndex, setStoryIndex] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)

  if (storyIndex === null) {
    return (
      <div className="story-time">
        <h2 className="st-title">Story Time 📖</h2>
        <p className="st-subtitle">Pick a story to read!</p>
        <div className="st-grid">
          {storyData.map((s, i) => (
            <motion.button
              key={s.id}
              className="st-story-card"
              onClick={() => setStoryIndex(i)}
              whileHover={{ scale: 1.03, y: -3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="st-story-emoji">{s.emoji}</span>
              <span className="st-story-name">{s.title}</span>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  const story = storyData[storyIndex]

  if (showQuiz) {
    return <StoryQuiz story={story} onBack={() => setShowQuiz(false)} onHome={() => { setStoryIndex(null); setShowQuiz(false) }} />
  }

  return <StoryReader story={story} onQuiz={() => setShowQuiz(true)} onBack={() => setStoryIndex(null)} />
}

function StoryReader({ story, onQuiz, onBack }) {
  const { speak } = useAudio()

  return (
    <div className="story-time">
      <button className="st-back" onClick={onBack}>← All Stories</button>
      <h2 className="st-title">{story.emoji} {story.title}</h2>

      <motion.div className="st-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="st-text">{story.story}</p>
        <button className="st-listen" onClick={() => speak(story.story, 0.9)}>
          🔊 Listen to the story
        </button>
      </motion.div>

      <motion.button className="st-quiz-btn" onClick={onQuiz} whileHover={{ scale: 1.05 }}>
        Answer Questions! 🎯
      </motion.button>
    </div>
  )
}

function StoryQuiz({ story, onBack, onHome }) {
  const quiz = useQuiz(story.questions)

  if (quiz.status === 'complete') {
    return <QuizComplete score={quiz.score} total={quiz.total} onReset={onHome} />
  }

  const q = quiz.currentQuestion

  return (
    <div className="story-time">
      <button className="st-back" onClick={onBack}>← Back to Story</button>
      <h2 className="st-title">{story.emoji} {story.title} — Quiz</h2>
      <QuizContainer
        question={<h3 style={{ fontSize: 22, color: 'var(--english)', textAlign: 'center' }}>{q.question}</h3>}
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
    </div>
  )
}
