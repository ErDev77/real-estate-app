"use client"

import { supabase } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react'
import Slider from '../_components/Slider';
import Details from '../_components/Details';

function ViewListing({params}) {

    const [listingDetails, setListingDetails] = useState()

    useEffect(() => {
        GetListingDetails();
    })
    const  GetListingDetails = async () => {
        const { data, error } = await supabase
        .from('listing')
        .select('*, listingImages(url, listing_id)')
        .eq('id', params.id)
        .eq('active', true)


        if(data) {
            setListingDetails(data[0])
        }

        if(error) {
            toast('Server Side Error')
        }
    }
  return (
    <div className='px-4 md:px-32 lg:px-56 py-5'>
        <Slider 
        imageList={listingDetails?.listingImages}
        />
        <Details listingDetails={listingDetails} />
    </div>
  )
}

export default ViewListing;