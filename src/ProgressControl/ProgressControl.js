import React from 'react'

const ProgressControl = ({ rating, emitter }) => {
  let ratingInput

  return (
    <div className="ProgressControl">
      <label htmlFor="rating">
        Rating:
      </label>
      <input
        id="rating"
        type="number"
        step="1"
        value={rating}
        min={0}
        max={100}
        ref={node => ratingInput = node}
        onChange={event => handleRatingChange(ratingInput.value)}
      />
      <button
        style={{ width: '2rem' }}
        onClick={event => handleRatingChange(rating - 5)}
      >-</button>
      <button
        style={{ width: '2rem' }}
        onClick={event => handleRatingChange(rating + 5)}
      >+</button>
    </div>
  )

  function handleRatingChange(newValue) {
    if (newValue < 0 || newValue > 100) return

    emitter.emit('PROGRESS_CONTROL_RATING_CHANGED', { rating: newValue })
  }
}

export default ProgressControl
