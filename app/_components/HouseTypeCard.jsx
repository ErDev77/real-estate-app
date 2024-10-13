import Image from 'next/image'
import React from 'react'

function HouseTypeCard({type}) {
  return (
    <div className='rounded-lg shadow-lg p-6 hover:scale-110 transition-all duration-300 cursor-pointer'>
        <Image 
        src={type.icon}
        alt={type.type}
        width={50}
        height={50}
        />
        <div className='mt-12'>
            <h1 className='text-lg font-bold'>{type.type}</h1>
        </div>
    </div>
  )
}

export default HouseTypeCard