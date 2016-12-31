import React from 'react'

const MorphContent = (props) => {
  const { closeButtonText, handleCloseButtonClick, children } = props

  return (
    <div
      className="MorphContent"
      style={{padding: '2rem 0'}}
    >
      <div>
        <div className="container">
          {children}

          <div
            className="closeButton btn btn-secondary"
            onClick={e => handleCloseButtonClick(e)}
          >
            {closeButtonText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MorphContent
