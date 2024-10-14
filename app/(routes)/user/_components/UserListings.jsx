import { Button } from '@/components/ui/button'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import {
	BathIcon,
	BedDouble,
	Eye,
	MapPin,
	Pencil,
	Ruler,
	Trash,
} from 'lucide-react'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function UserListings() {
	const { user } = useUser()
	const [listing, setListing] = useState()
	const [loading, setLoading] = useState(false)
	const [selectedItem, setSelectedItem] = useState(null)

	useEffect(() => {
		user && GetUserListings()
	}, [user])

	const DeleteUserListings = async item => {
		const { error: imageDeleteError } = await supabase
			.from('listingImages')
			.delete()
			.eq('listing_id', item.id)

		if (imageDeleteError) {
			toast('Server Side Error')
			return
		}

		const { error: listingDeleteError } = await supabase
			.from('listing')
			.delete()
			.eq('id', item.id)

		if (listingDeleteError) {
			toast('Server Side Error')
		} else {
			setListing(prevListing =>
				prevListing.filter(listingItem => listingItem.id !== item.id)
			)
			toast('Ad successfully removed')
		}
	}

	const GetUserListings = async () => {
		const { data, error } = await supabase
			.from('listing')
			.select('*, listingImages(url, listing_id)')
			.eq('createdBy', user?.primaryEmailAddress.emailAddress)
		setListing(data)
	}

	const confirmDelete = item => {
		setSelectedItem(item)
	}

	const handleDelete = async () => {
		if (selectedItem) {
			await DeleteUserListings(selectedItem)
			setSelectedItem(null)
		}
	}
	return (
		<div className='ml-6'>
			<h2 className='font-bold text-2xl'>Manage your listings</h2>
            			{listing?.length === 0 ? (
				<div className='flex flex-col items-center mt-10'>
					<Image src='/empty.png' width={130} height={130} alt='No listings' />
					<h3 className='mt-4 text-gray-600 text-lg'>You have no listings yet</h3>
					<Link href='/add-new-listing'>
						<Button className='mt-4'>Create your first listing</Button>
					</Link>
				</div>
			) : (
			<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
				{listing &&
					listing.map((item, index) => (
						<div
							key={index}
							className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg'
						>
							<h2 className='bg-primary m-1 rounded-lg text-white absolute px-2 text-sm p-1'>
								{item.active ? 'Published' : 'Draft'}
							</h2>
							<Image
								src={
									item?.listingImages[0]
										? item?.listingImages[0]?.url
										: '/draft.jpg'
								}
								width={800}
								height={150}
								className='rounded-lg object-cover h-[170px]'
								alt={index}
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
							<div className='flex gap-2 justify-between mt-2'>
								<Link href={'/view-listing/' + item.id} className='w-[60px]'>
									<Button variant='outline'>
										<Eye />
									</Button>
								</Link>
								<Link href={'/edit-listing/' + item.id} className='w-[60px]'>
									<Button>
										<Pencil />
									</Button>
								</Link>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											variant='destructive'
											className='w-[60px]'
											onClick={() => confirmDelete(item)}
										>
											<Trash />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you sure you want to delete this ad?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action is irreversible, the deleted ad cannot be
												restored.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={handleDelete}>
												{loading ? 'Deleting...' : 'Delete'}
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					))}
			</div>
            )}
		</div>
  
)

}

export default UserListings
