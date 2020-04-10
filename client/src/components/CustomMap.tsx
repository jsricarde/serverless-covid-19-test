import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const MarkerComponent = ({ text }: any) => <div>{text}</div>;

const CustomMap = (props: any) => {
  const [ center, setCenter ] = useState({ lat: 6.1973219, lng: -75.5858772 });
  const [ zoom, setZoom ] = useState(11);


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDIDVwyxDatxFuRNWzQ_85Hmp1WbEooL5Q' }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals={true}
      // onClick = {this.changeMarkerPosition}
      >
        <MarkerComponent
          lat={6.1973219}
          lng={-75.5858772}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default CustomMap
