import { useEffect } from 'react'

import { useJourneyStore } from '../store/useJourneyStore'

function isInteractiveElement(
  target: EventTarget | null,
): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return [
    'INPUT',
    'TEXTAREA',
    'SELECT',
    'BUTTON',
    'A',
  ].includes(target.tagName)
}

export function JourneyInput() {
  const addProgress = useJourneyStore(
    (state) => state.addProgress,
  )

  const setTargetProgress = useJourneyStore(
    (state) => state.setTargetProgress,
  )

  const inputEnabled = useJourneyStore(
    (state) => state.inputEnabled,
  )

  useEffect(() => {
    let previousTouchY: number | null = null

    const handleWheel = (event: WheelEvent) => {
      if (!inputEnabled || event.ctrlKey) {
        return
      }

      event.preventDefault()

      const normalizedDelta = Math.max(
        -120,
        Math.min(120, event.deltaY),
      )

      addProgress(normalizedDelta * 0.00065)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !inputEnabled ||
        isInteractiveElement(event.target)
      ) {
        return
      }

      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          event.preventDefault()
          addProgress(0.06)
          break

        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault()
          addProgress(-0.06)
          break

        case 'Home':
          event.preventDefault()
          setTargetProgress(0)
          break

        case 'End':
          event.preventDefault()
          setTargetProgress(1)
          break

        default:
          break
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      const firstTouch = event.touches[0]

      if (!firstTouch) {
        return
      }

      previousTouchY = firstTouch.clientY
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!inputEnabled || previousTouchY === null) {
        return
      }

      const firstTouch = event.touches[0]

      if (!firstTouch) {
        return
      }

      event.preventDefault()

      const movement =
        previousTouchY - firstTouch.clientY

      previousTouchY = firstTouch.clientY

      addProgress(movement * 0.0015)
    }

    const handleTouchEnd = () => {
      previousTouchY = null
    }

    window.addEventListener('wheel', handleWheel, {
      passive: false,
    })

    window.addEventListener('keydown', handleKeyDown)

    window.addEventListener(
      'touchstart',
      handleTouchStart,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'touchmove',
      handleTouchMove,
      {
        passive: false,
      },
    )

    window.addEventListener(
      'touchend',
      handleTouchEnd,
    )

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
      window.removeEventListener(
        'touchstart',
        handleTouchStart,
      )
      window.removeEventListener(
        'touchmove',
        handleTouchMove,
      )
      window.removeEventListener(
        'touchend',
        handleTouchEnd,
      )
    }
  }, [
    addProgress,
    inputEnabled,
    setTargetProgress,
  ])

  return null
}