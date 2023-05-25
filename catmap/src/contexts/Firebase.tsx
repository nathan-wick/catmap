import {FirebaseApp, initializeApp} from 'firebase/app';
import React, {FC, createContext} from 'react';

export const FirebaseContext =
    createContext<FirebaseApp | undefined>(undefined);
export const FirebaseContextProvider: FC<{
    children: JSX.Element
}> = ({children}) => {
  const firebaseConfig = {
    apiKey: '',
    authDomain: 'nathan-wick-catmap.firebaseapp.com',
    projectId: 'nathan-wick-catmap',
    storageBucket: 'nathan-wick-catmap.appspot.com',
    messagingSenderId: '711190574175',
    appId: '1:711190574175:web:d3ac7383a78fd4274117ea',
    measurementId: 'G-W4SH15EVWH',
  };
  const firebaseApp = initializeApp(firebaseConfig);

  return <FirebaseContext.Provider value={firebaseApp}>
    {children}
  </FirebaseContext.Provider>;
};

export default FirebaseContextProvider;
