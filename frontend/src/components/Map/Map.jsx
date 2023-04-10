import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapContainer() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div>
      {
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs" }}
            // defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            center={defaultProps.center}
            yesIWantToUseGoogleMapApiInternals={true}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      }
    </div>
  );
}
