// EXPO MAPVIEW
import MapView, { Marker } from 'react-native-maps'
import { Alert, StyleSheet } from 'react-native'
import { useCallback, useLayoutEffect, useState } from 'react'
import IconButton from '../components/ui/IconButton'

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState()

  const region = {
    latitude: 51.04,
    longitude: -114.07,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude

    setSelectedLocation({
      lat: lat,
      lng: lng
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Chosen",
        "You have to select a location first."
      )
      return
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
    })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    })
  }, [navigation, savePickedLocationHandler])

  return (
    <MapView
      initialRegion={region}
      onPress={selectLocationHandler}
      style={styles.map}
    >
      {
        selectedLocation && <Marker
          title="Selected Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng}}
        />
      }
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
