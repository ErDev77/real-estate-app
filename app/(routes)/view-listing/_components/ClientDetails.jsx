import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ClientDetails({listingDetails}) {
	const {user} = useUser();
  return (
		<div className='gap-5 flex items-center justify-between p-5 rounded-lg shadow-md border my-6'>
			<Link href={`/user-info/` + user.id}>
				<div className='flex items-center gap-6'>
					<Image
						src={listingDetails?.profileImage}
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
			</Link>
			<Link href={'/chat'}>
				<Button>Send Message</Button>
			</Link>
		</div>
	)
}

export default ClientDetails