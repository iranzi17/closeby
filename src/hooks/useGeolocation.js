import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot, collection } from "firebase/firestore";

/**
 * Watches device position and syncs to Firestore `locations` collection.
 *
 * @param {object} user Firebase auth user
 * @returns {object} geolocation API
 * @returns {object|null} return.position - current position `{lat,lng}`
 * @returns {Array} return.markers - users sharing their location
 * @returns {Function} return.shareLocation - begin watching and updating
 * @returns {Function} return.stopSharing - stop watching and disable sharing
 */
export default function useGeolocation(user) {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const watchIdRef = useRef(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "locations"), (snapshot) => {
      const shared = snapshot.docs
        .map((doc) => doc.data())
        .filter((data) => data.sharing === true);
      setMarkers(shared);
    });
    return () => unsub();
  }, []);

  const shareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    if (watchIdRef.current) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });

        if (user?.uid) {
          await updateDoc(doc(db, "locations", user.uid), {
            lat: latitude,
            lng: longitude,
            sharing: true,
          });
        }
      },
      (error) => {
        console.error("Error watching position", error);
        alert("Unable to retrieve location.");
      }
    );
  };

  const stopSharing = async () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setPosition(null);
    if (user?.uid) {
      await updateDoc(doc(db, "locations", user.uid), {
        sharing: false,
        lat: null,
        lng: null,
      });
    }
  };

  useEffect(() => {
    return () => {
      stopSharing();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { position, markers, shareLocation, stopSharing };
}
