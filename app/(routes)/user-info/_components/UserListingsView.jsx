'use client'

import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { BathIcon, BedDouble, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function UserListingsView({userId}) {
	const [listings, setListings] = useState([])
    const {user} = useUser();
	useEffect(() => {
		if (userId) {
			GetUserListings(userId)
		}
	}, [userId])

	const GetUserListings = async () => {
		const { data, error } = await supabase
			.from('listing')
			.select('*, listingImages(url, listing_id)')
			.eq('user_id', userId) 

		if (error) {
			console.error('Error fetching user listings:', error)
			return
		}

		setListings(data)
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
			{listings.length === 0 ? (
				<p>No listings available</p>
			) : (
				listings.map((item, index) => (
					<div
						key={index}
						className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg'
					>
						<Image
							src={item?.listingImages[0]?.url || '/draft.jpg'}
							width={800}
							height={150}
							className='rounded-lg object-cover h-[170px]'
							// alt={Listing.${index}}
						/>
						<div className='mt-2 flex flex-col gap-2'>
							<h2 className='font-bold text-xl'>${item.price}</h2>
							<h2 className='flex gap-2 text-sm text-gray-400'>
								<MapPin className='w-4 h-4' />
								{item.address}
							</h2>
							<div className='flex gap-2 mt-2 justify-between'>
								<h2 className='flex gap-2 text-sm w-full bg-slate-200 rounded-md p-2 text-grey-500 justify-center items-center'>
									<BedDouble className='h-4 w-4' />
									{item?.bedroom}
								</h2>
								<h2 className='flex gap-2 text-sm w-full bg-slate-200 rounded-md p-2 text-grey-500 justify-center items-center'>
									<BathIcon className='h-4 w-4' />
									{item?.bathroom}
								</h2>
								<h2 className='flex gap-2 text-sm w-full bg-slate-200 rounded-md p-2 text-grey-500 justify-center items-center'>
									<Ruler className='h-4 w-4' />
									{item?.area}
								</h2>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default UserListingsView
