import React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

function RouteButton({navigate, route}) {
  return (
    <TouchableOpacity
      style={styles.routeButton}
      onPress={() => navigate(route)}>
      <Text style={styles.routeText}>{`${route.toUpperCase()} LIST`}</Text>
    </TouchableOpacity>
  );
}
export default function Home({navigation}) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RouteButton route={'Todo'} navigate={navigation.navigate} />
        <RouteButton route={'Movie'} navigate={navigation.navigate} />
      </SafeAreaView>
    </>
  );
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeButton: {
    width: width * 0.7,
    height: 70,
    borderWidth: 1,
    borderColor: '#9B9B9B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width * 0.05,
    backgroundColor: '#C73549',
  },
  routeText: {
    fontSize: 30,
    fontWeight: '100',
    color: 'white',
  },
});
