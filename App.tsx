import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {

  const CESUPA = [
    {
      title: "Cesupa ARGO",
      description: 'Escritório de Tecnologia',
      coord: {
        latitude: -1.4501912,
        longitude: -48.4796603,
        latitudeDelta: 0.09,
        longitudeDelta: 0.0401,
      },
    },
    {
      title: "Cesupa SHOPPING",
      description: 'Escritório de Direito',
      coord: {
        latitude: -1.4453173,
        longitude: -48.4806399,
        latitudeDelta: 0.09,
        longitudeDelta: 0.0401,
      },
    },
    {
      title: "Cesupa Petro",
      description: 'Escritório de Engenharia',
      coord: {
        latitude: -1.4482234,
        longitude: -48.478396,
        latitudeDelta: 0.09,
        longitudeDelta: 0.0401,
      },
    },
    {
      title: "Cesupa Campestre",
      description: 'Medicina',
      coord: {
        latitude: -1.4190961,
        longitude: -48.4499243,
        latitudeDelta: 0.09,
        longitudeDelta: 0.0401,
      },
    },
  ]

  const [zoom, setZoom] = useState(0.11)
  const [regiao, setRegiao] = useState(
    {
      latitude: -1.4450688,
      longitude: -48.4605952,
      latitudeDelta: zoom,
      longitudeDelta: 0.0401,
    }
  ); 

  return (
    <MapView
        style={styles.container}
        region={regiao}
        mapType={'standard'}
    >

      {CESUPA.map(
        (cesupa) => (
          <Marker 
            coordinate={cesupa.coord}
            title={cesupa.title}
            description={cesupa.description}
            pinColor='#053F66'
          />
        )        
      )}

    </MapView>     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
