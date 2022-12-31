import { useState, useCallback } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [pickedLocation, setPickedLocation] = useState()
  const [selectedImage, setSelectedImage] = useState()

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText)
  }

  function imageTakenHandler(imageUri) {
    setSelectedImage(imageUri)
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  function savePlaceHandler() {
    console.log(enteredTitle)
    console.log(pickedLocation)
    console.log(selectedImage)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onImageTaken={imageTakenHandler} />
      <LocationPicker onLocationPicked={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary700
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
})
