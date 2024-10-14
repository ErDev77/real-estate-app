"use client"
import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import MapMarker from './MapMarker'


const containerStyle = {
	width: '100%',
	height: '75vh',
	borderRadius: 10
}

function GoogleMapSection({ coordinates, listing }) {
	// const { isLoaded, loadError } = useJsApiLoader({
	// 	id: 'google-map-script',
	// 	googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
	// })
	const [center, setCenter] = useState({
		lat: -3.745,
		lng: -38.523,
	})
	const [map, setMap] = React.useState(null)

	useEffect(() => {
		coordinates && setCenter(coordinates)
	}, [coordinates])

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center)
		map.fitBounds(bounds)

		setMap(map)
	}, [])

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null)
	}, [])

	// if (loadError) {
	// 	return <div>Error loading maps</div>
	// }

	// if (!isLoaded) {
	// 	return <div>Loading Maps</div>
	// }

	return (
		<div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
				gestureHandling="greedy"
			>
				{listing.map((item, index) => (	
				<MapMarker 
				key={index}
				item={item}
				/>
				))}
			</GoogleMap>
		</div>
	)
}

export default GoogleMapSection;