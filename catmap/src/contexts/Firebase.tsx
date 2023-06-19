import {FirebaseApp, initializeApp} from "firebase/app";
import React, {FC, createContext} from "react";
import googleAPIKey from "../information/googleAPIKey";

export const FirebaseContext = createContext<FirebaseApp | undefined>(undefined),
    FirebaseContextProvider: FC<{
        children: JSX.Element
    }> = ({children}) => {

        const firebaseConfig = {
                "apiKey": googleAPIKey,
                "appId": "1:711190574175:web:d3ac7383a78fd4274117ea",
                "authDomain": "nathan-wick-catmap.firebaseapp.com",
                "measurementId": "G-W4SH15EVWH",
                "messagingSenderId": "711190574175",
                "projectId": "nathan-wick-catmap",
                "storageBucket": "nathan-wick-catmap.appspot.com"
            },
            firebaseApp = initializeApp(firebaseConfig);

        return <FirebaseContext.Provider
            value={firebaseApp}>
            {children}
        </FirebaseContext.Provider>;

    };

export default FirebaseContextProvider;
