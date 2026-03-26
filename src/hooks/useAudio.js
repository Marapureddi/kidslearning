import { useCallback } from 'react'

export function useAudio() {
  const speak = useCallback((text, rate = 0.85) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = 1.1
    utterance.volume = 1
    window.speechSynthesis.speak(utterance)
  }, [])

  const playCorrect = useCallback(() => {
    speak('Great job!', 1)
  }, [speak])

  const playWrong = useCallback(() => {
    speak('Try again!', 1)
  }, [speak])

  return { speak, playCorrect, playWrong }
}
