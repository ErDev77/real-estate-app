import React from 'react'
import HouseTypeCard from './HouseTypeCard'
import { HouseTypeData } from '@/data'


function HousesTypes() {
	return (
		<div className='pt-16 pb-16'>
			<div className='w-[80%] mx-auto'>
                <h1 className='text-2xl sm:text-3xl font-bold mb-2 text-gray-800'>Houses Types</h1>
                <p className='text-sm text-gray-700'>We have a different types of houses</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-10 md:mt-20 gap-8 items-center'>
				{HouseTypeData.map((type) => {
                    return <div key={type.id}>
                        <HouseTypeCard type={type}/>
                    </div>
                })}
				</div>
			</div>
		</div>
	)
}


export default HousesTypes