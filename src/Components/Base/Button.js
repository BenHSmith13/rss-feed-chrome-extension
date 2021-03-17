import React from 'react'

export default function Button({
  children, onClick, className='', style,
}) {

  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      style={style}
    >
      {children}
    </button>
  )
}
