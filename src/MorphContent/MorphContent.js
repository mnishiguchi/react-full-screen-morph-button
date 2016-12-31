import React from 'react'

const MorphContent = (props) => {
  const { closeButtonText, emitter, children } = props

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
            onClick={e => emitter.emit('MORPH_CONTENT_CLOSE_BUTTON_CLICKED', { e })}
          >
            {closeButtonText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MorphContent
