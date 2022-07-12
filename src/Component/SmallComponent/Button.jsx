import React from 'react'

function Button(bgColor,color,content,func) {
  return (
    <button
    style={{bgColor,color}}
    onClick={func}
    >
        {content}
    </button>
  )
}

export default Button