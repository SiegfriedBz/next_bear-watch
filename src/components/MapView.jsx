import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useAppContext } from '@/context/appContext'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import { Logo } from './Logo'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapPopup from './MapPopup'
import { bearWasSeenWithinLastweek } from '@/utils/bearWasSeenWithinLastweek'
import { getUserLocation } from '@/utils/getUserLocation'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
const INIT_LATITUDE = 48.43
const INIT_LONGITUDE = -71.07
const ZOOM_INIT = 7
const ZOOM_IN = 16

export default function MapView({
  isFilteredMap,
  isCenteredMap,
  isMapAddMode,
  bearMarkers,
  setBearMarkers,
}) {
  const { user, handleToast } = useAppContext()
  const mapRef = useRef(null)
  const [latitude, setLatitude] = useState(INIT_LATITUDE)
  const [longitude, setLongitude] = useState(INIT_LONGITUDE)
  const [showPopup, setShowPopup] = useState(false)
  const [popup, setPopup] = useState(null)
  const [filteredBearMarkers, setFilteredBearMarkers] = useState(null)

  useEffect(() => {
    if (isFilteredMap) {
      // display only last week's bear sightings
      const filteredMarkers = bearMarkers?.filter((marker) => {
        return bearWasSeenWithinLastweek(marker.createdAt)
      })

      setFilteredBearMarkers(filteredMarkers)
    } else {
      setFilteredBearMarkers(bearMarkers)
    }
  }, [isFilteredMap, bearMarkers])

  // center map on user location
  useEffect(() => {
    if (!isCenteredMap) {
      setLatitude(INIT_LATITUDE)
      setLongitude(INIT_LONGITUDE)

      if (mapRef?.current != null) {
        mapRef?.current?.flyTo({
          center: [INIT_LONGITUDE, INIT_LATITUDE],
          duration: 5000,
          zoom: ZOOM_INIT,
        })
      }
      return
    }

    ;(async () => {
      const { latitude, longitude } = await getUserLocation()
      setLatitude(latitude)
      setLongitude(longitude)

      if (mapRef?.current != null) {
        mapRef?.current?.flyTo({
          center: [longitude, latitude],
          duration: 5000,
          zoom: ZOOM_IN,
        })
      }
    })()
  }, [isCenteredMap])

  // center map on bear sighting & zoom in
  useEffect(() => {
    if (mapRef?.current == null || !showPopup) return

    const [latitude, longitude] = [popup.latitude, popup.longitude]

    mapRef?.current?.flyTo({
      center: [longitude, latitude],
      duration: 2000,
      zoom: ZOOM_IN,
    })
  }, [showPopup, popup])

  const handleSetPopup = (id) => {
    const marker = bearMarkers.find((marker) => marker.id === id)
    setPopup(marker)
    setShowPopup(true)
  }

  // add bear marker to db if user signed in and map is in edit mode
  const onAddBearMarker = async (e) => {
    if (!user || !isMapAddMode) return

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
        handleToast({
          type: 'warn',
          message: data?.message,
        })
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
        latitude: latitude,
        longitude: longitude,
        zoom: ZOOM_INIT,
      }}
      style={{ width: 'auto', height: 475 }}
      mapStyle='mapbox://styles/mapbox/outdoors-v12'
    >
      <NavigationControl />
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

      {filteredBearMarkers?.map((marker) => {
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
                    ? 'h-10 w-10 rounded-full bg-warning-light/50 ring-2 ring-warning'
                    : 'h-8 w-8 ring-1 ring-success'
                }
              />
            </Marker>
          </div>
        )
      })}
    </Map>
  )
}
