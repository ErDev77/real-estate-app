"use client";


import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner';

function ListingMapView({type}) {
	const [listing, setListing] = useState([])
	const [searchedAddress, setSearchedAddress] = useState()
	const [isSearching, setIsSearching] = useState(false)

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
			.like('address', '%' + searchTerm + '%')

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
		<div className='grid grid-cols-1 md:grid-cols-2'>
			<div>
				<Listing
					listing={listing}
					handleSearchClick={handleSearchClick}
					searchedAddress={v => setSearchedAddress(v)}
					// onClearSearch={handleClearSearch}
				/>
			</div>
			<div>Map</div>
		</div>
	)
}

export default ListingMapView