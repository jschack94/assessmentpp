import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styled from "@emotion/styled";

import getStops from "../services/getStops";
import StopMarker from "./StopMarker";
import colors from "../theme/colors";

const MapContainer = styled.div`
  width: 100%;
  height: 60rem;
  background-color: ${colors.white};
`;

const RouteDetail = ({
  match: {
    params: { routeId }
  },
  history
}) => {
  const [stops, setStops] = useState([]);
  const center = { lat: 42.3601, lng: -71.0589 };
  const zoom = 12;

  useEffect(() => {
    getStops(routeId).then(newStops => setStops(newStops));
  }, [routeId]);

  const handleClick = () => {
    history.push('/', {params: routeId})
  }

  return (
    <MapContainer>
      <span style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={handleClick}>Home</span> - The {routeId} line
      <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
        {stops.map(stop => (
          <StopMarker
            key={stop.id}
            lat={stop.attributes.latitude}
            lng={stop.attributes.longitude}
            text={stop.attributes.name}
          />
        ))}
      </GoogleMapReact>
    </MapContainer>
  );
};

export default RouteDetail;
