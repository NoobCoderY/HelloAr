import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import hexData from "../data/countries_hex_data.json"
import Globe from "react-globe.gl";
import { useSelector } from "react-redux";


export default function CustomGlobe() {
    const { loading, Weather, error } = useSelector((state) => state);
    console.log(Weather,"globe");
  const globeEl = useRef();
//   const country = getRandomCountry();
  const [selectedCountry, setSelectedCountry] = useState({
    lat: Weather?.coord.lat,
    lng: Weather?.coord.lon,
    label: Weather?.name
  });
  const [hex, setHex] = useState({ features: [] });

  useEffect(() => {
    setHex(hexData);
  }, []);



//   useEffect(() => {
//     // globeEl.current.controls().autoRotate = true;
//     // globeEl.current.controls().autoRotateSpeed = 0.2;

//     const MAP_CENTER = { lat: 0, lng: 0, altitude: 1.5 };
//     globeEl.current.pointOfView(MAP_CENTER, 0);
//   }, [globeEl]);

  useEffect(() => {
    const countryLocation = {
      lat: selectedCountry.lat,
      lng: selectedCountry.lng,
      altitude: 1.5
    };

    globeEl.current.pointOfView(countryLocation, 0);
  }, [selectedCountry]);

  return (
    <Globe
      ref={globeEl}
      backgroundColor="rgba(0,0,0,0)"
      labelsData={[selectedCountry]}
      labelText={"label"}
      labelSize={1.6}
      labelColor={useCallback(() => "white", [])}
      labelDotRadius={0.4}
      labelAltitude={0.05}
      hexPolygonsData={hex.features}
      hexPolygonResolution={3} //values higher than 3 makes it buggy
      hexPolygonMargin={0.62}
      hexPolygonColor={useCallback(() => "#1b66b1", [])}
    />
  );
}

