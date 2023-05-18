import React from 'react';
import DeckGL from '@deck.gl/react/typed';

const Map = () => {
  const initialViewState = {
    longitude: 39.132906,
    latitude: -84.514949,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  return <div>
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={[]} />
  </div>;
};

export default Map;
