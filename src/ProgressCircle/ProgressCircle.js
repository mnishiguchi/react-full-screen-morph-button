import React      from 'react'
import classNames from 'classnames'

import './ProgressCircle.css'

const ProgressCircle = (props) => {
  const { rating } = props

  const progressClassName = classNames({
    'rating-progress' : true,
    'under-30'        : (rating <= 30),
    'under-70'        : (rating <= 70 && rating > 30),
  })

  const progressStyle = {
    strokeDashoffset: 100 - rating
  }

  return (
    <div className="ProgressCircle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
        <circle
          cx="16" cy="16" r="15.9155"
          className="rating-progress-background"
        />
        <circle
          cx="16" cy="16" r="15.9155"
          className={progressClassName}
          style={progressStyle}
        />
      </svg>
      <div className="ratingText">
        {rating}
      </div>
    </div>
  )
}

export default ProgressCircle
