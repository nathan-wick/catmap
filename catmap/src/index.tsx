import './styles/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './views/Home';
import Firebase from './contexts/Firebase';
import Theme from './contexts/Theme';
import Facilities from './contexts/Facilities';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
      <Firebase>
        <Theme>
          <Facilities>
            <Home />
          </Facilities>
        </Theme>
      </Firebase>
    </React.StrictMode>,
);
