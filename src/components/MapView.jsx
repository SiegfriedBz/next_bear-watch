import { useState, useEffect, useRef } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useAppContext } from '@/context/appContext'
import { Logo } from './Logo'
import MapPopup from './MapPopup'
import { bearWasSeenWithinLastweek } from '@/utils/bearWasSeenWithinLastweek'
import { getUserLocation } from '@/utils/getUserLocation'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
const INIT_LATITUDE = 48.43
const INIT_LONGITUDE = -71.07
const ZOOM_INIT = 7
const ZOOM_IN = 16
const ZOOM_POPUP = 10

export default function MapView({
  isUserBearMarkersOnly,
  isWeeklyMap,
  isCenteredMap,
  isMapEditMode,
}) {
  const { user, bearMarkers, setBearMarkers, handleToast } = useAppContext()
  const mapRef = useRef(null)
  const [latitude, setLatitude] = useState(INIT_LATITUDE)
  const [longitude, setLongitude] = useState(INIT_LONGITUDE)
  const [showPopup, setShowPopup] = useState(false)
  const [popup, setPopup] = useState(null)
  const [filteredBearMarkers, setFilteredBearMarkers] = useState(null)

  useEffect(() => {
    setFilteredBearMarkers(bearMarkers)
  }, [bearMarkers])

  // filter on last week's bear sightings
  useEffect(() => {
    if (isWeeklyMap) {
      const filteredMarkers = bearMarkers?.filter((marker) => {
        return bearWasSeenWithinLastweek(marker.createdAt)
      })

      setFilteredBearMarkers(filteredMarkers)
    } else {
      setFilteredBearMarkers(bearMarkers)
    }
  }, [isWeeklyMap, bearMarkers])

  // filter on user's bear sightings
  useEffect(() => {
    if (!user) return

    if (isUserBearMarkersOnly) {
      const filteredMarkers = bearMarkers?.filter(
        (marker) => marker.userId === user.id
      )

      setFilteredBearMarkers(filteredMarkers)
    } else {
      setFilteredBearMarkers(bearMarkers)
    }
  }, [isUserBearMarkersOnly, bearMarkers, user])

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

  // center map on selected bear sighting & zoom
  useEffect(() => {
    if (mapRef?.current == null || !showPopup) return

    const [latitude, longitude] = [popup.latitude, popup.longitude]

    mapRef?.current?.flyTo({
      center: [longitude, latitude],
      duration: 2000,
      zoom: ZOOM_POPUP,
    })
  }, [showPopup, popup])

  // display popup on selected bear sighting
  const handleSetPopup = (id) => {
    const marker = bearMarkers.find((marker) => marker.id === id)
    setPopup(marker)
    setShowPopup(true)
  }

  // add bear marker to db if user signed in and map is in edit mode
  const onAddBearMarker = async (e) => {
    if (!user || !isMapEditMode) return

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

      if (response.status !== 201) {
        handleToast({
          type: 'warn',
          message: data?.message,
        })
        return
      }

      setBearMarkers([...bearMarkers, data])

      handleToast({
        type: 'success',
        message: 'Bear sight added successfully!',
      })
    } catch (e) {
      console.error(e)
    }
  }

  // delete bear marker from db if user signed in and map is in edit mode
  const onDeleteBearMarker = async (id) => {
    if (!isMapEditMode) return

    try {
      const response = await fetch(`/api/markers?id=${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
      })

      const data = await response.json()

      if (response.status !== 200) {
        handleToast({
          type: 'warn',
          message: data?.message,
        })
        return
      }

      setBearMarkers(bearMarkers.filter((marker) => marker.id !== data?.id))
      setPopup(null)
      setShowPopup(false)

      handleToast({
        type: 'success',
        message: 'Bear sight deleted successfully!',
      })
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

      {filteredBearMarkers && showPopup && (
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
          <MapPopup
            popup={popup}
            isMapEditMode={isMapEditMode}
            onDeleteBearMarker={onDeleteBearMarker}
          />
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
                className={`bg-cfg-white/60 dark:bg-transparent ${
                  bearWasSeenWithinLastweek(createdAt)
                    ? 'h-10 w-10 rounded-full ring-2 ring-warning dark:ring-warning-light'
                    : 'h-8 w-8 ring-2 ring-primary'
                }`}
              />
            </Marker>
          </div>
        )
      })}
    </Map>
  )
}
