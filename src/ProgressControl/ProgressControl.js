import React from 'react'

const ProgressControl = ({ type, score, emitter }) => {
  let scoreInput

  return (
    <div className="ProgressControl">
      <input
        type="number"
        step="1"
        value={score}
        min={0}
        max={100}
        ref={node => scoreInput = node}
        onChange={event => handleRatingChange(scoreInput.value)}
      />
      <button
        style={{ width: '2rem' }}
        onClick={event => handleRatingChange(score - 5)}
      >-</button>
      <button
        style={{ width: '2rem' }}
        onClick={event => handleRatingChange(score + 5)}
      >+</button>
    </div>
  )

  function handleRatingChange(newValue) {
    if (newValue < 0 || newValue > 100) return

    emitter.emit('PROGRESS_CONTROL_SCORE_CHANGED', { score: newValue, type })
  }
}

export default ProgressControl
