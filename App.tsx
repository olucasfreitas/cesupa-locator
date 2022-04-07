import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FAB, Portal, Provider } from "react-native-paper";

interface User {
  title: string;
  description: string;
  coord: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export default function App() {
  const [zoom, setZoom] = useState(0.01);
  const CESUPA = [
    {
      title: "Cesupa ARGO",
      description: "Escritório de Tecnologia",
      img: "https://lh5.googleusercontent.com/p/AF1QipOBf9mvzyGk3xaV0igKDfrIg3bYVKL_jIYYPwRw=w408-h544-k-no",
      coord: {
        latitude: -1.4501912,
        longitude: -48.4796603,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      },
    },
    {
      title: "Cesupa SHOPPING",
      description: "Escritório de Direito",
      img: "https://lh3.googleusercontent.com/p/AF1QipO3cjO0oN4GwaN_6I8Lq5S3yIfDGMsUsvCxm2N2=s1600-w400",
      coord: {
        latitude: -1.4453173,
        longitude: -48.4806399,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      },
    },
    {
      title: "Cesupa Petro",
      description: "Escritório de Engenharia",
      img: "data:image/jpeg;base64,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",
      coord: {
        latitude: -1.4482234,
        longitude: -48.478396,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      },
    },
    {
      title: "Cesupa Campestre",
      description: "Medicina",
      img: "data:image/jpeg;base64,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",
      coord: {
        latitude: -1.4190961,
        longitude: -48.4499243,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      },
    },
  ];
  const [regiao, setRegiao] = useState({
    latitude: -1.4450688,
    longitude: -48.4605952,
    latitudeDelta: zoom,
    longitudeDelta: zoom,
  });
  const [user, SetUser] = useState<User>();
  const [open, setOpen] = React.useState(false);

  const getLocal = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const userRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: zoom,
      longitudeDelta: zoom,
    };
    const user: User = {
      title: "Usuário",
      description: "localização do usuário",
      coord: userRegion,
    };

    setRegiao(userRegion);
    SetUser(user);
  };

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <Provider>
      <MapView style={styles.container} region={regiao} mapType={"standard"}>
        <Marker
          key={user?.title}
          coordinate={user?.coord ? user.coord : regiao}
          title={user?.title}
          description={user?.description}
          pinColor="#ff0000"
        />
        {CESUPA &&
          CESUPA.map((cesupa) => (
            <Marker
              key={cesupa.title}
              coordinate={cesupa.coord}
              title={cesupa.title}
              description={cesupa.description}
              pinColor="#053F66"
            >
              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: cesupa.img,
                }}
              />
            </Marker>
          ))}
      </MapView>
      <Portal>
        <FAB.Group
          visible={true}
          open={open}
          icon={open ? "calendar-today" : "plus"}
          actions={[
            {
              icon: "circle",
              label: "CESUPA ARGO",
              onPress: () => setRegiao(CESUPA[0].coord),
            },
            {
              icon: "circle",
              label: "CESUPA DIREITO",
              onPress: () => setRegiao(CESUPA[1].coord),
            },
            {
              icon: "circle",
              label: "CESUPA MALCHER",
              onPress: () => setRegiao(CESUPA[2].coord),
            },
            {
              icon: "circle",
              label: "CESUPA MEDICINA",
              onPress: () => setRegiao(CESUPA[3].coord),
            },
            {
              icon: "circle",
              label: "USUÁRIO",
              onPress: () => setRegiao(user?.coord ? user.coord : regiao),
            },
          ]}
          onStateChange={({ open }) => setOpen(open)}
        />
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
