import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Home from './views/Home';
import 'bootstrap/dist/css/bootstrap.css';
import Firebase from './contexts/Firebase';
import Theme from './contexts/Theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
      <Firebase>
        <Theme>
          <Home />
        </Theme>
      </Firebase>
    </React.StrictMode>,
);
