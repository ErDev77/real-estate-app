import React, { useState, useEffect } from 'react'
import Listing from './Listing'
import { supabase } from '@/utils/supabase/client'
import HousesTypes from './HousesTypes'

function MainBox() {
	const [listings, setListings] = useState([])

	useEffect(() => {
		const fetchListings = async () => {
			const { data, error } = await supabase
				.from('listing')
				.select(`*, listingImages ( url, listing_id )`)
				.eq('active', true)
				.order('id', { ascending: false })
				.limit(6) 

			if (data) {
				console.log(data)
				setListings(data)
			}
			if (error) {
				console.error('Error while getting listings', error)
			}
		}

		fetchListings()
	}, [])

	return (
		<div className='absolute w-full h-screen top-0'>
			<div className='absolute inset-0 bg-[url("/mainphoto.jpg")] bg-cover bg-center'></div>
			<div className='absolute inset-0 bg-black opacity-30'></div>
			<div className='flex justify-center items-center flex-col w-[95%] sm:w-[80%] h-full mx-auto relative z-10'>
				<h1 className='text-white text-opacity-80 text-center text-base sm:text-lg uppercase font-medium'>
					Find Your Dream Home
				</h1>
				<p className='mt-4 text-center text-sm sm:text-base text-gray-200'>
					We have more than 100,000 houses
				</p>
			</div>
			<HousesTypes />
			<div className='bg-slate-100 pt-16 pb-16'>
				<div className='text-center mb-8'>
					<h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
						We have a wide selection for everyone
					</h1>
				</div>
				<div className='w-full flex justify-center'>
					<div className='grid  gap-4 w-[70%]'>
						{' '}
						{/* md:grid-cols-2 lg:grid-cols-3 */}
						<Listing
							listing={listings} 
							showSearchAndFilters={false} 
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainBox
