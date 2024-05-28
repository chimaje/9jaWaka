// useLocation.js
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    (async () => {
      const permissionsResponse = await Location.requestForegroundPermissionsAsync();
      const status = permissionsResponse.status;
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      if (isMounted) {
        setLocation(userLocation);
      }
    })();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, []);

  return { location, errorMsg };
};

export default useLocation;
