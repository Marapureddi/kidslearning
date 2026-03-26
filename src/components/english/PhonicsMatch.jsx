import { useAudio } from '../../hooks/useAudio'
import { useQuiz } from '../../hooks/useQuiz'
import { phonicsQuestions } from '../../data/english/phonics'
import QuizContainer from '../shared/QuizContainer'
import QuizComplete from '../shared/QuizComplete'

export default function PhonicsMatch() {
  const { speak } = useAudio()
  const quiz = useQuiz(phonicsQuestions)

  if (quiz.status === 'complete') {
    return <QuizComplete score={quiz.score} total={quiz.total} onReset={quiz.reset} />
  }

  const q = quiz.currentQuestion

  return (
    <QuizContainer
      question={
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, color: 'var(--english)' }}>{q.sound}</h2>
          <button
            onClick={() => speak(`${q.letter} is for`, 0.8)}
            style={{
              marginTop: 8,
              padding: '8px 20px',
              background: 'var(--english)',
              color: 'white',
              borderRadius: 'var(--radius-sm)',
              fontSize: 16,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            🔊 Hear it
          </button>
        </div>
      }
      options={q.options}
      selectedAnswer={quiz.selectedAnswer}
      correctAnswer={q.correctAnswer}
      isCorrect={quiz.isCorrect}
      isAnswered={quiz.status === 'answered'}
      wrongAnswers={quiz.wrongAnswers}
      onSelect={quiz.checkAnswer}
      onNext={quiz.next}
      questionLabel={q.letter}
      progress={{ current: quiz.currentIndex + 1, total: quiz.total }}
    />
  )
}
