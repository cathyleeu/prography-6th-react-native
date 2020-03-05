/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@scenes/Home.js';
import Todo from '@scenes/Todo.js';
import Movie from '@scenes/Movie.js';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Movie" component={Movie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
