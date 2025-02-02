/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

const MapWithPolyline = ({ coordinates }) => {
  // console.log(coordinates);
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: coordinates.length > 0 ? coordinates[coordinates.length - 1].lat : 0,
    lng: coordinates.length > 0 ? coordinates[coordinates.length - 1].lng : 0,
  };

  const mapOptions = {
    zoom: 50,
    center,
  };

  const polylineOptions = {
    path: coordinates,
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  //   console.log({ lat: coordinates[0].lat, lng: coordinates[0].lng })
  return (
    <></>
    // coordinates&&
    // <LoadScript googleMapsApiKey="AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8">
    //   <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center} options={mapOptions}>
    //     {/* <Marker position={{ lat: coordinates.length > 0 ? coordinates[0].lat : 0, lng: coordinates.length > 0 ? coordinates[0].lng : 0 }} /> */}
    //     <Polyline options={polylineOptions} />
    //   </GoogleMap>
    // </LoadScript>
  );
};

MapWithPolyline.propTypes = {
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default MapWithPolyline;
