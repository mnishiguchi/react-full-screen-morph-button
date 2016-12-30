import React      from 'react'
import classNames from 'classnames'

import './ProgressCircle.css'

const ProgressCircle = (props) => {
  const { label, score, children } = props

  const progressClassName = classNames({
    'rating-progress': true,
    'under-50'       : (score <= 50),
    'under-75'       : (score <= 75 && score > 50),
    'over-75'        : (score > 75),
  })

  const progressStyle = {
    strokeDashoffset: 100 - score
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
      {children}
      <div className="labelText">
        <a href="#">{label || ""}</a>
      </div>
      <div className="scoreText">
        {Number(score) || 0}
      </div>
    </div>
  )
}

export default ProgressCircle
