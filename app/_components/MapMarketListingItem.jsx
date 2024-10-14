import { Button } from '@/components/ui/button'
import { BathIcon, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
function MapMarketListingItem({ item, closeHandler }) {
	return (
		<div>
			<div className='cursor-pointer rounded-lg w-[180px]'>
				<X onClick={() => closeHandler()} />
				<Image
					src={item.listingImages[0].url}
					width={800}
					height={150}
					className='rounded-lg object-cover h-[120px] w-[180px]'
				/>
				<div className='mt-2 flex flex-col gap-2 p-2 bg-white rounded-lg'>
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
					</div>
					<Link href={'/view-listing/' + item.id} className=''>
						<Button size='sm'>View details</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default MapMarketListingItem