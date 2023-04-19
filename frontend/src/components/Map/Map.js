import "./map.css";
import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";

import InfoWindow from "./InfoWindow";

import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  Box,
  Text,
  Image,
  Button,
  VStack,
  Flex,
  useDisclosure,
  Drawer,
  Input,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import Nav from "../Navbar/Nav";
import Header from "./Header";

const API_LINK = process.env.REACT_APP_API_LINK;

const AnyReactComponent = ({ onClick, zoom }) => {
  const pinSize = zoom <= 13 ? "25px" : "35px";
  return (
    <div onClick={onClick}>
      <img
        className="pin"
        src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
        alt="Pin Icon"
        style={{ width: pinSize, height: pinSize }}
      />
    </div>
  );
};

export default function MapContainer() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pins, setPins] = useState([]);
  const [pinClicked, setPinClicked] = useState(false);
  const [infoWindow, setInfoWindow] = useState(null);

  const handleClick = (pin) => {
    setPinClicked(true);
    setInfoWindow({ ...pin, fixed: false });
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${API_LINK}/schools/`)
      .then((result) => {
        const schools = result.data.schools;
        const newPins = schools.map((element) => ({
          lat: element.latitude,
          lng: element.longitude,
          school: element,
        }));
        setPins(newPins);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const defaultProps = {
    center: {
      lat: 31.985157,
      lng: 35.833666,
    },
    zoom: 11,
  };

  return (
    <>
      <Nav />
      <Header />
      <Flex className="mainMap">
        <Sidebar
          pins={pins}
          handleClick={(pin) => handleClick(pin, true)}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Box flex="1" h="100vh">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs",
              language: "en",
            }}
            defaultZoom={defaultProps.zoom}
            center={defaultProps.center}
            yesIWantToUseGoogleMapApiInternals={true}
            onClick={() => setInfoWindow(null)}
          >
            {pins
              .filter((pin) =>
                pin.school.school_name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              )
              .map((pin) => (
                <AnyReactComponent
                  key={pin.school.school_id}
                  lat={pin.lat}
                  lng={pin.lng}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(pin, false);
                  }}
                  zoom={defaultProps.zoom}
                />
              ))}
            {pinClicked && infoWindow && (
              <InfoWindow
                className="infoPopup"
                lat={infoWindow.lat}
                lng={infoWindow.lng}
                school={infoWindow.school}
                fixed={infoWindow.fixed}
                setPinClicked={setPinClicked}
              />
            )}
          </GoogleMapReact>
        </Box>
      </Flex>
    </>
  );
}
