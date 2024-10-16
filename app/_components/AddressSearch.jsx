'use client'

import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import React from 'react'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

const GooglePlacesAutocomplete = dynamic(
	() => import('react-google-places-autocomplete').then(mod => mod.default),
	{ ssr: false }
)

function AddressSearch({ selectedAddress, setCoordinates }) {
	return (
		<div className='flex items-center w-full'>
			<MapPin className='h-10 w-10 p-2 rounded-l-lg text-primary bg-blue-200' />
			<GooglePlacesAutocomplete
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
				selectProps={{
					placeholder: 'Search Property Address',
					isClearable: true,
					className: 'w-full',
					onChange: place => {
						console.log(place)
						selectedAddress(place)
						geocodeByAddress(place.label)
							.then(result => getLatLng(result[0]))
							.then(({ lat, lng }) => {
								setCoordinates({ lat, lng })
							})
							.catch(error => console.error('Error fetching geocode:', error))
					},
				}}
			/>
		</div>
	)
}

export default AddressSearch
