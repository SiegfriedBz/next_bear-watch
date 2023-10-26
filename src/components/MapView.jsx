import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import Logo from './Logo'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapPopup from './MapPopup'
import { bearWasSeenWithinLastweek } from '@/utils/bearWasSeenWithinLastweek'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function MapView({ bearMarkers, setBearMarkers, handleToast }) {
  const mapRef = useRef(null)
  const [mapHeight, setMapHeight] = useState(400)
  const [showPopup, setShowPopup] = useState(false)
  const [popup, setPopup] = useState(null)

  // dynamic set map height = f (viewport width) before painting component to the screen
  useLayoutEffect(() => {
    if (window == undefined) return

    const width = window.innerWidth
    setMapHeight(width > 768 ? 800 : 500)
  }, [])

  useEffect(() => {
    if (mapRef?.current == null || !showPopup) return

    const [latitude, longitude] = [popup.latitude, popup.longitude]
    mapRef?.current?.flyTo({
      center: [longitude, latitude + 0.0125],
      duration: 2000,
      zoom: 7,
    })
  }, [showPopup, popup])

  const handleSetPopup = (id) => {
    const marker = bearMarkers.find((marker) => marker.id === id)
    setPopup(marker)
    setShowPopup(true)
  }

  const onAddBearMarker = async (e) => {
    try {
      const { lng: longitude, lat: latitude } = e.lngLat

      const response = await fetch('/api/markers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
      })

      const data = await response.json()

      if (response.status === 401) {
        handleToast(data?.message)
        return
      }

      setBearMarkers([...bearMarkers, data])
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Map
      onClick={onAddBearMarker}
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        latitude: 48.43,
        longitude: -71.07,
        zoom: 6,
      }}
      style={{ width: 'auto', height: mapHeight }}
      mapStyle='mapbox://styles/mapbox/outdoors-v12'
    >
      {showPopup && (
        <Popup
          latitude={popup.latitude}
          longitude={popup.longitude}
          anchor='bottom'
          onClose={() => {
            setPopup(null)
            setShowPopup(false)
          }}
          closeButton={false}
          offsetTop={-30}
        >
          <MapPopup popup={popup} />
        </Popup>
      )}

      {bearMarkers?.map((marker) => {
        const { id, latitude, longitude, createdAt } = marker
        return (
          <div
            key={id}
            onClick={(e) => {
              e.stopPropagation()
              handleSetPopup(id)
            }}
          >
            <Marker latitude={latitude} longitude={longitude} anchor='bottom'>
              <Logo
                className={
                  bearWasSeenWithinLastweek(createdAt)
                    ? 'h-10 w-10 rounded-full bg-red-200 ring-2 ring-red-500'
                    : 'h-8 w-8 ring-1 ring-green-500'
                }
              />
            </Marker>
          </div>
        )
      })}
    </Map>
  )
}
