import React from 'react'
import './style.css'
export default function Grid({value, key, flip, onClicked}) {
 

  return (
    <div className='grid' key={key} onClick={onClicked}>{flip? value: '' }</div>
  )
}
