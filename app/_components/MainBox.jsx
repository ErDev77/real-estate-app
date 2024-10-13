import React from 'react'
import AddressSearch from './AddressSearch'
import HousesTypes from './HousesTypes'

function MainBox() {
	return (
		<div className='absolute w-full h-screen top-0'>
			<div className='absolute inset-0 bg-[url("/mainphoto.jpg")] bg-cover bg-center'></div>
			<div className='absolute inset-0 bg-black opacity-30'></div>
			<div className='flex justify-center items-center flex-col w-[95%] sm:w-[80%] h-full mx-auto relative z-10'>
				<h1 className='text-white text-opacity-80 text-center text-base sm:text-lg uppercase font-medium'>
					Find Your Dream Home
				</h1>
				<p className='mt-4 text-center text-sm sm:text-base text-gray-200'>
					We have more then 100,000 houses
				</p>
				<div className='mt-12 w-[700px] '>
					<AddressSearch />
				</div>
			</div>
            <HousesTypes />
		</div>
	)
}

export default MainBox
