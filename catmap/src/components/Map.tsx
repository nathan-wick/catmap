import {BarChart, Signpost} from "react-bootstrap-icons";
import {Button, Col, Row} from "react-bootstrap";
import {GoogleMap, InfoWindow, LoadScript, Marker} from "@react-google-maps/api";
import React, {useContext, useEffect, useState} from "react";
import {FacilitiesContext} from "../contexts/Facilities";
import {Facility} from "../types/Facility";
import {InformationWindow} from "../types/InformationWindow";
import {ThemeContext} from "../contexts/Theme";
import googleAPIKey from "../information/googleAPIKey";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import markerGreen from "../images/marker-green.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import markerRed from "../images/marker-red.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import markerYellow from "../images/marker-yellow.svg";

const Map = () => {

    const {theme} = useContext(ThemeContext),
        {todayFacilityData} = useContext(FacilitiesContext),
        currentFacilityData = todayFacilityData[todayFacilityData.length - 1],
        [
            informationWindows,
            setInformationWindows
        ] = useState<InformationWindow[]>([]),

        onMarkerClick = (facility: Facility, open: boolean) => {

            const newInformationWindows: InformationWindow[] = structuredClone(informationWindows),
                thisInformationWindow = newInformationWindows.find((informationWindow: InformationWindow) =>
                    informationWindow.name === facility.name);
            if (thisInformationWindow) {

                thisInformationWindow.isOpen = open;
                setInformationWindows(newInformationWindows);

            }

        };

    useEffect(
        () => {

            if (currentFacilityData) {

                setInformationWindows(currentFacilityData.map((facility) => ({
                    "isOpen": false,
                    "name": facility.name
                })));

            }

        },
        [currentFacilityData]
    );

    return <LoadScript
        googleMapsApiKey={googleAPIKey}>
        <GoogleMap
            mapContainerStyle={{
                "height": "74vh",
                "width": "100vw"
            }}
            center={{
                "lat": 39.132906,
                "lng": -84.514949
            }}
            zoom={16}
            options={{
                "disableDefaultUI": true,
                "mapId": theme === "light"
                    ? "64e83980abf9f725"
                    : "5b0d3e8becae82a8"
            }}>
            {
                currentFacilityData && currentFacilityData.
                    filter((facility) => facility.location?.latitude && facility.location?.longitude).
                    map((facility, index) => <Marker
                        key={index}
                        onClick={() => onMarkerClick(
                            facility,
                            true
                        )}
                        icon={facility.occupancy.available < facility.occupancy.capacity / 4
                            ? markerRed
                            : facility.occupancy.available < facility.occupancy.capacity / 2
                                ? markerYellow
                                : markerGreen}
                        position={{
                            "lat": facility.location?.latitude ?? 0,
                            "lng": facility.location?.longitude ?? 0
                        }}
                        animation={google.maps.Animation.DROP}>
                        {
                            informationWindows.find((informationWindow: InformationWindow) =>
                                informationWindow.name === facility.name)?.isOpen &&
                            <InfoWindow
                                onCloseClick={() => onMarkerClick(
                                    facility,
                                    false
                                )}>
                                <div
                                    className="text-dark text-center"
                                    style={{"width": "240px"}}>
                                    <h4>{facility.name}</h4>
                                    <Row
                                        className="gx-0">
                                        <Col
                                            md={6}
                                            sm={12}
                                            className="p-2">
                                            <Button
                                                variant={facility.occupancy.available < facility.occupancy.capacity / 4
                                                    ? "danger"
                                                    : facility.occupancy.available < facility.occupancy.capacity / 2
                                                        ? "warning"
                                                        : "success"}
                                                className="w-100 text-light"
                                                // eslint-disable-next-line no-return-assign
                                                onClick={() => location.href = `#${facility.name}`}>
                                                <BarChart
                                                    className="mx-2" />
                                                Occupancy
                                            </Button>
                                        </Col>
                                        <Col
                                            md={6}
                                            sm={12}
                                            className="p-2">
                                            <Button
                                                variant={facility.occupancy.available < facility.occupancy.capacity / 4
                                                    ? "danger"
                                                    : facility.occupancy.available < facility.occupancy.capacity / 2
                                                        ? "warning"
                                                        : "success"}
                                                className="w-100 text-light"
                                                onClick={() =>
                                                    // eslint-disable-next-line max-len
                                                    window.open(`https://www.google.com/maps/@${facility.location?.latitude},${facility.location?.longitude},20z`)}>
                                                <Signpost
                                                    className="mx-2" />
                                                Directions
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </InfoWindow>
                        }
                    </Marker>)
            }
        </GoogleMap>
    </LoadScript>;

};

export default Map;
