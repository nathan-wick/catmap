import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Map from './views/Map';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
      <Map />
    </React.StrictMode>,
);
