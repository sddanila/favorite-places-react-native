import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors'
import Map from './screens/Map'
import { useState, useEffect } from 'react'
import { init } from './util/database'
import * as SplashScreen from 'expo-splash-screen'
import PlaceDetails from './screens/PlaceDetails';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    init().then(() => {
      setAppIsReady(true)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  if(appIsReady) {
    SplashScreen.hideAsync()
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
              title: "Your Favorite Places",
              headerRight: ({tintColor}) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              )
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a New Place"
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Add a New Place"
            }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Place Details"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
