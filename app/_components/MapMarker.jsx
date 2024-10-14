import { GoogleMapsMarkerClusterer, GoogleMarkerClusterer, Marker, MarkerClusterer, MarkerClustererF, MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useState } from 'react'
import MapMarketListingItem from './MapMarketListingItem';

function MapMarker({item}) {

    const [selectedListing, setSelectedListing] = useState();
  return (
		<div>
			<Marker
				position={item.coordinates}
				onClick={() => setSelectedListing(item)}
				icon={{
					url: '/location.png',
					scaledSize: {
						width: 40,
						height: 40,
					},
				}}
			>
				{selectedListing && (
					<OverlayView
						position={selectedListing.coordinates}
						mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					>
						<div>
							<MapMarketListingItem 
							item={selectedListing} 
							closeHandler={() => setSelectedListing(null)} />
						</div>
					</OverlayView>
				)}
			</Marker>
		</div>
	)
}

export default MapMarker