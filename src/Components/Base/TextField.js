import React from 'react'

export default function TextField({
  value = '', onChange, className = '',
}) {

  return (
    <input
      className={`textfield ${className}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}
