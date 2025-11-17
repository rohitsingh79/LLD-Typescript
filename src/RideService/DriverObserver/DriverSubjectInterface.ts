// observer subject
// add , remove and notify observer

import {Driver} from "../Driver";
import {Ride} from "../Ride";

export interface DriverSubjectInterface  {
    addDriver:(driver:Driver) => void;
    removerDriver:(driver:Driver)=>void;
    sendNotificationToDrivers:(drivers:Driver[] , ride:Ride)=>void;
}