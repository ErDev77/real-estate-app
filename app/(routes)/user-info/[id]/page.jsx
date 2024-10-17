'use client'

import { useUser } from '@clerk/nextjs'
import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import UserListingsView from '../_components/UserListingsView'

function UserInfo({userId}) {
	const [listingDetails, setListingDetails] = useState()

	useEffect(() => {
		if (userId) {
			GetListingDetails(userId)
		}
	}, [userId])

	const GetListingDetails = async () => {
		const { data, error } = await supabase
			.from('listing')
			.select('*, listingImages(url, listing_id)')
			.eq('user_id', userId)
			.eq('active', true)

		if (data) {
			setListingDetails(data[0])
		}

		if (error) {
			toast('Server Side Error')
			console.error('Error fetching listing details:', error)
		}
	}

	if (!listingDetails) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<div className='flex items-center gap-6'>
				<Image
					src={listingDetails?.profileImage || '/default-profile.png'}
					alt='profileImage'
					width={60}
					height={60}
					className='rounded-full'
				/>
				<div>
					<h2 className='font-bold text-lg'>{listingDetails?.fullName}</h2>
					<h2 className='text-gray-500'>{listingDetails?.createdBy}</h2>
				</div>
			</div>

			<div className='pt-4'>
				<h3>User Listings</h3>
				<UserListingsView userId={userId} />{' '}
			</div>
		</div>
	)
}

export default UserInfo
