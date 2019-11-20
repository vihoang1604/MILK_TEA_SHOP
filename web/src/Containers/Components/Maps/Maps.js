import React, { Component } from 'react'
import "./Maps.css"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGoogleMap from "react-google-map"
const Map = () =>
    <ReactGoogleMapLoader
        params={{
            key: "AIzaSyCI3cDduwloUnVSfREo-6wuRYTMjOHcQjc",
            // AIzaSyBnOC2cYnLyaaYXtnd_IEQWZLkqvg0tqoE
            libraries: "places,geometry",
        }}
        render={googleMaps =>
            googleMaps && (
                <div className="map">
                    <ReactGoogleMap
                        googleMaps={googleMaps}
                        center={{ lat: 16.042087, lng: 108.210251 }}
                        zoom={8}
                    />
                </div>
            )}
    />
export default class Maps extends Component {
    render() {
        return (
            <div className="contact_map">
                <div className="map">
                    <div id="google_map" className="google_map">
                        <div className="map_container">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
