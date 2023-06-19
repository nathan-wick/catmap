import "./styles/custom.scss";
import Facilities from "./contexts/Facilities";
import Firebase from "./contexts/Firebase";
import Home from "./views/Home";
import React from "react";
import ReactDOM from "react-dom/client";
import Theme from "./contexts/Theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<React.StrictMode>
    <Firebase>
        <Theme>
            <Facilities>
                <Home />
            </Facilities>
        </Theme>
    </Firebase>
</React.StrictMode>);
