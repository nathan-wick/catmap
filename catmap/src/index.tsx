import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Map from './views/Map';
import 'bootstrap/dist/css/bootstrap.css';
import Firebase from './contexts/Firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
      <Firebase>
        <Map />
      </Firebase>
    </React.StrictMode>,
);
