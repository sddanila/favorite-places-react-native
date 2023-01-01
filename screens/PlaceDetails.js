import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlace } from "../util/database";

export default function PlaceDetails({ navigation, route }) {
  const [selectedPlace, setSelectedPlace] = useState()

  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: selectedPlace.location.lat,
      initialLng: selectedPlace.location.lng
    })
  }

  const selectedPlaceId = route.params.placeId

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlace(selectedPlaceId)
      setSelectedPlace(place)
      navigation.setOptions({
        title: place.title
      })
    }

    loadPlaceData()
  }, [selectedPlaceId])

  if (!selectedPlace) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.address}>Loading place data...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedPlace.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  }
})
