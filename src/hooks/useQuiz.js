import { useState, useCallback } from 'react'
import confetti from 'canvas-confetti'

export function useQuiz(questions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('active') // active | answered | complete
  const [isCorrect, setIsCorrect] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])

  const currentQuestion = questions[currentIndex] || null
  const total = questions.length

  const checkAnswer = useCallback((answer) => {
    if (status === 'answered') return

    setSelectedAnswer(answer)
    const correct = answer === currentQuestion.correctAnswer

    if (correct) {
      setIsCorrect(true)
      setStatus('answered')
      setScore(s => s + 1)
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF9F43', '#0ABDE3', '#A29BFE', '#00B894', '#FECA57', '#FD79A8'],
      })
    } else {
      setIsCorrect(false)
      setWrongAnswers(prev => [...prev, answer])
    }
  }, [status, currentQuestion])

  const next = useCallback(() => {
    if (currentIndex + 1 >= total) {
      setStatus('complete')
    } else {
      setCurrentIndex(i => i + 1)
      setStatus('active')
      setIsCorrect(null)
      setSelectedAnswer(null)
      setWrongAnswers([])
    }
  }, [currentIndex, total])

  const reset = useCallback(() => {
    setCurrentIndex(0)
    setScore(0)
    setStatus('active')
    setIsCorrect(null)
    setSelectedAnswer(null)
    setWrongAnswers([])
  }, [])

  return {
    currentQuestion,
    currentIndex,
    total,
    score,
    status,
    isCorrect,
    selectedAnswer,
    wrongAnswers,
    checkAnswer,
    next,
    reset,
  }
}
