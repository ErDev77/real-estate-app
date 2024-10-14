import GoogleMapSection from '@/app/_components/GoogleMapSection'
import { Button } from '@/components/ui/button'
import { BedDouble, Drill, Home, LandPlot, MapPin, Share } from 'lucide-react'
import React from 'react'
import ClientDetails from './ClientDetails'

function Details({listingDetails}) {


  return (
		listingDetails && (
			<div className='my-6 flex gap-2 flex-col'>
				<div className='flex justify-between items-center'>
					<div>
						<h2 className='font-bold text-3xl'>$ {listingDetails?.price}</h2>
						<h2 className='text-gray-500 text-lg flex gap-2'>
							<MapPin />
							{listingDetails?.address}
						</h2>
					</div>
					<Button className='flex gap-2'>
						<Share /> Share
					</Button>
				</div>
				<hr></hr>
				<div className='mt-4 flex flex-col gap-3'>
					<h2 className='font-bold text-2xl'>Key Features</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
						<h2 className='flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center'>
							<Home />
							{listingDetails?.propertyType}
						</h2>
						<h2 className='flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center'>
							<Drill />
							Built In {listingDetails?.builtIn}
						</h2>
						<h2 className='flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center'>
							<LandPlot />
							{listingDetails?.area}
						</h2>
						<h2 className='flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center'>
							<BedDouble />
							{listingDetails?.bedroom} Bed
						</h2>
						<h2 className='flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center'>
							<BedDouble />
							{listingDetails?.bathroom} Bath
						</h2>
						<h2 className='flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center'>
							<BedDouble />
							{listingDetails?.parking} Parking
						</h2>
					</div>
				</div>
				<div className='mt-4'>
					<h2 className='font-bold text-2xl'>What's special?</h2>
					<p className='text-gray-600'>{listingDetails?.description}</p>
				</div>
				<div className='pt-4'>
					<h2 className='font-bold text-2xl gap-2'>Find on map</h2>
					<GoogleMapSection
						coordinates={listingDetails.coordinates}
						listing={[listingDetails]}
					/>
				</div>
				<div className='pt-4'>
					<h2 className='font-bold text-2xl'>Contact User</h2>
					<ClientDetails listingDetails={listingDetails} />
				</div>
			</div>
		)
	)
}

export default Details