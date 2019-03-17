import React from 'react'

const Loader = props => {
  return (
    <div className='loader-container'>
      <div className='loader'>
        <svg className='circle' viewBox='0 0 50 50'>
          <circle className='path' cx={25} cy={25} r={20} fill='none' strokeWidth={3} strokeMiterlimit={10} />
        </svg>
      </div>
    </div>
  )
}

export default Loader
