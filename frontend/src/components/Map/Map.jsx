import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapNav from "./Mapnav";

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
  const navigate = useNavigate();
  const [pins, setPins] = useState([]);
  const [pinClicked, setPinClicked] = useState(false);
  const [infoWindow, setInfoWindow] = useState(null);

  const handleClick = (pin) => {
    setPinClicked(true);
    setInfoWindow(pin);
  };

  const InfoWindow = ({ school }) => (
    <div className="infoPopup">
      <h5>{school.school_name}</h5>

      <img src={school.school_image_url} alt={school.school_name} />
      <button>Close</button>
      <button
        onClick={() => {
          navigate(`/school/${school.school_id}`);
        }}
      >
        Go to school
      </button>
    </div>
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/schools/")
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
      <MapNav />
      <div className="mainMap">
        <div style={{ height: "100vh", width: "100%" }}>
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
            {/* Map over the pins array to create a pin for each object */}

            {pins.map((pin) => (
              <AnyReactComponent
                key={pin.school.school_id}
                lat={pin.lat}
                lng={pin.lng}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(pin);
                  // navigate(`/school/${pin.school.school_id}`);
                }}
                zoom={defaultProps.zoom}
              />
            ))}
            {/* Render info window if pinClicked is true */}
            {pinClicked && infoWindow && (
              <InfoWindow
                className="infoPopup"
                lat={infoWindow.lat}
                lng={infoWindow.lng}
                school={infoWindow.school}
              />
            )}
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MapNav from "./Mapnav";

// const AnyReactComponent = ({ onClick, zoom }) => {
//   const pinSize = zoom <= 13 ? "25px" : "35px";
//   return (
//     <div onClick={onClick}>
//       <img
//         className="pin"
//         src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
//         alt="Pin Icon"
//         style={{ width: pinSize, height: pinSize }}
//       />
//     </div>
//   );
// };

// export default function MapContainer() {
//   const navigate = useNavigate();
//   const [pins, setPins] = useState([]);
//   const [pinClicked, setPinClicked] = useState(false);
//   const [popUpStyle, setPopUpStyle] = useState({});

//   const handleClick = (event, pin) => {
//     event.stopPropagation();
//     setPinClicked(true);
//     setPopUpStyle({
//       display: "block",
//       position: "absolute",
//       top: `${event.pageY}px`,
//       left: `${event.pageX}px`,
//       backgroundColor: "white",
//       width: "350px",
//       height: "200px",
//     });
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/schools/")
//       .then((result) => {
//         const schools = result.data.schools;
//         const newPins = schools.map((element) => ({
//           lat: element.latitude,
//           lng: element.longitude,
//           school: element.school_name,
//           id: element.school_id,
//           type: element.type,
//         }));
//         setPins(newPins);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const defaultProps = {
//     center: {
//       lat: 31.985157,
//       lng: 35.833666,
//     },
//     zoom: 11,
//   };

//   return (
//     <>
//       <MapNav />
//       <div>
//         <div style={{ height: "100vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs",
//               language: "en",
//             }}
//             defaultZoom={defaultProps.zoom}
//             center={defaultProps.center}
//             yesIWantToUseGoogleMapApiInternals={true}
//           >
//             {/* Map over the pins array to create a pin for each object */}

//             {pins.map((pin) => (
//               <AnyReactComponent
//                 key={pin.id}
//                 lat={pin.lat}
//                 lng={pin.lng}
//                 onMouseHover={() => {
//                   console.log("first");
//                 }}
//                 onClick={(e) => {
//                   handleClick(e, pin);
//                   // navigate(`/school/${pin.id}`);
//                 }}
//               />
//             ))}
//           </GoogleMapReact>
//           {pinClicked && (
//             <div className="popup" style={popUpStyle}>
//               <h1>test</h1>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MapNav from "./Mapnav";

// const AnyReactComponent = ({ onClick, zoom }) => {
//   const pinSize = zoom <= 13 ? "25px" : "35px";
//   return (
//     <div onClick={onClick}>
//       <img
//         className="pin"
//         src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
//         alt="Pin Icon"
//         style={{ width: pinSize, height: pinSize }}
//       />
//     </div>
//   );
// };

// export default function MapContainer() {
//   const navigate = useNavigate();
//   const [pins, setPins] = useState([]);
//   const [selectedPin, setSelectedPin] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/schools/")
//       .then((result) => {
//         const schools = result.data.schools;
//         const newPins = schools.map((element) => ({
//           lat: element.latitude,
//           lng: element.longitude,
//           school: element.school_name,
//           id: element.school_id,
//           type: element.type,
//         }));
//         setPins(newPins);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const defaultProps = {
//     center: {
//       lat: 31.985157,
//       lng: 35.833666,
//     },
//     zoom: 11,
//   };

//   const handlePinClick = (pin) => {
//     setSelectedPin(pin);
//   };

//   return (
//     <>
//       <MapNav />
//       <div>
//         <div style={{ height: "100vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs",
//               language: "en",
//             }}
//             defaultZoom={defaultProps.zoom}
//             center={defaultProps.center}
//             yesIWantToUseGoogleMapApiInternals={true}
//           >
//             {/* Map over the pins array to create a pin for each object */}

//             {pins.map((pin) => (
//               <AnyReactComponent
//                 key={pin.id}
//                 lat={pin.lat}
//                 lng={pin.lng}
//                 onMouseHover={() => {
//                   console.log("first");
//                 }}
//                 onClick={() => {
//                   handlePinClick(pin);
//                   // navigate(`/school/${pin.id}`);
//                 }}
//               />
//             ))}
//           </GoogleMapReact>

//           {/* Show pop-up window if a pin is selected */}

//           {selectedPin && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: selectedPin.lat,
//                 left: selectedPin.lng,
//               }}
//             >
//               <h1>test</h1>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MapNav from "./Mapnav";

// const AnyReactComponent = ({ onClick, zoom }) => {
//   const pinSize = zoom <= 13 ? "25px" : "35px";
//   return (
//     <div onClick={onClick}>
//       <img
//         className="pin"
//         src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
//         alt="Pin Icon"
//         style={{ width: pinSize, height: pinSize }}
//       />
//     </div>
//   );
// };

// export default function MapContainer() {
//   const navigate = useNavigate();
//   const [pins, setPins] = useState([]);
//   const [pinClicked, setPinClicked] = useState(false);

//   const handleClick = () => {
//     setPinClicked(true);
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/schools/")
//       .then((result) => {
//         const schools = result.data.schools;
//         const newPins = schools.map((element) => ({
//           lat: element.latitude,
//           lng: element.longitude,
//           school: element.school_name,
//           id: element.school_id,
//           type: element.type,
//         }));
//         setPins(newPins);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const defaultProps = {
//     center: {
//       lat: 31.985157,
//       lng: 35.833666,
//     },
//     zoom: 11,
//   };

//   return (
//     <>
//       <MapNav />
//       <div>
//         <div style={{ height: "100vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs",
//               language: "en",
//             }}
//             defaultZoom={defaultProps.zoom}
//             center={defaultProps.center}
//             yesIWantToUseGoogleMapApiInternals={true}
//           >
//             {/* Map over the pins array to create a pin for each object */}

//             {pins.map((pin) => (
//               <AnyReactComponent
//                 key={pin.id}
//                 lat={pin.lat}
//                 lng={pin.lng}
//                 onMouseHover={() => {
//                   console.log("first");
//                 }}
//                 onClick={(e) => {
//                   <h1>hello</h1>
//                   handleClick(pin);
//                   navigate(`/school/${pin.id}`);
//                 }}
//               />
//             ))}
//           </GoogleMapReact>
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
// import axios from "axios";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function MapContainer() {
//   const pins = [];
//   const [pinClicked, setPinClicked] = useState(false);
//   const handleClick = () => {
//     setPinClicked(true);
//   };
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/schools/")
//       .then((result) => {
//         const schools = result.data.schools;

//         schools.forEach((element) => {
//           pins.push({
//             lat: element.latitude,
//             lng: element.longitude,
//             school: element.school_name,
//             id: element.school_id,
//             type: element.type,
//           });
//         });
//         console.log(pins);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const defaultProps = {
//     center: {
//       lat: 10.99835602,
//       lng: 77.01502627,
//     },
//     zoom: 11,
//   };

//   return (
//     <div>
//       {pinClicked ? (
//         // Render the other component when the pin is clicked
//         <OtherComponent />
//       ) : (
//         <div style={{ height: "100vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs" }}
//             defaultZoom={defaultProps.zoom}
//             center={defaultProps.center}
//             yesIWantToUseGoogleMapApiInternals={true}
//           >
//             {/* Map over the pins array to create a pin for each object */}
//             {pins.map((pin, index) => (
//               <AnyReactComponent
//                 key={index}
//                 lat={pin.lat}
//                 lng={pin.lng}
//                 text={pin.text}
//                 onClick={handleClick}
//               />
//             ))}
//           </GoogleMapReact>
//         </div>
//       )}
//     </div>
//   );
//   // Important! Always set the container height explicitly
//   // <div>
//   //   {
//   //     <div style={{ height: "100vh", width: "100%" }}>
//   //       <GoogleMapReact
//   //         bootstrapURLKeys={{
//   //           key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs",
//   //         }}
//   //         // defaultCenter={defaultProps.center}
//   //         defaultZoom={defaultProps.zoom}
//   //         center={defaultProps.center}
//   //         yesIWantToUseGoogleMapApiInternals={true}
//   //       >
//   //         <AnyReactComponent
//   //           lat={59.955413}
//   //           lng={30.337844}
//   //           text="My Marker"
//   //         />
//   //       </GoogleMapReact>
//   //     </div>
//   //   }
//   // </div>
// }
