"use client";

import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner';
import GoogleMapSection from './GoogleMapSection';

function ListingMapView({type}) {
	const [listing, setListing] = useState([])
	const [searchedAddress, setSearchedAddress] = useState()
	const [isSearching, setIsSearching] = useState(false)
	const [bedCount, setBedCount] = useState(0);
	const [bathCount, setBathCount] = useState(0);
	const [parkingCount, setParkingCount] = useState(0)
	const [homeType, setHomeType] = useState()
	const [coordinates, setCoordinates] = useState()

	useEffect(() => {
		if (!isSearching) {
			getLatestListing()
		}
	}, [type, isSearching]) 

	const getLatestListing = async () => {
		const { data, error } = await supabase
			.from('listing')
			.select(
				`*, listingImages (
           url,
           listing_id 
        )`
			)
			.eq('active', true)
			.eq('type', type)
			.order('id', { ascending: false })


		if (data) {
			setListing(data)
		}
		if (error) {
			toast('Server Side Error')
		}
	}

	const handleSearchClick = async () => {
		const searchTerm = searchedAddress?.value?.structured_formatting?.main_text

		let query = supabase
			.from('listing')
			.select(
				`*, listingImages (
            url,
            listing_id 
            )`
			)
			.eq('active', true)
			.eq('type', type)
			.gte('bedroom', bedCount)
			.gte('bathroom', bathCount)
			.gte('parking', parkingCount)
			.order('id', { ascending: false })
			.like('address', '%' + searchTerm + '%')

		if(homeType) {
			query = query.eq('propertyType', homeType)
		}

		const { data, error } = await query

		if (data) {
			setListing(data)
		}

        if(error) {
            toast("Server Error")
        }

        setIsSearching(false) 
	}

    //     const handleClearSearch = () => {
    //     setSearchedAddress(null);
    //     setIsSearching(false);    
    //     getLatestListing();    
    // };
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			<div>
				<Listing
					listing={listing}
					handleSearchClick={handleSearchClick}
					searchedAddress={(v) => setSearchedAddress(v)}
					setBedCount={setBedCount}
					setBathCount={setBathCount}
					setParkingCount={setParkingCount}
					setHomeType={setHomeType}
					setCoordinates={setCoordinates}
					// onClearSearch={handleClearSearch}
				/>
			</div>
			<div className='fixed right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]'>
				<GoogleMapSection
				coordinates={coordinates}
				listing={listing}
				/>
			</div>
		</div>
	)
}

export default ListingMapView