import {DriverSubjectInterface} from "./DriverSubjectInterface";
import {Driver} from "../Driver";
import {Ride} from "../Ride";

export class DriverSubject implements DriverSubjectInterface {

    private observers: Driver[];

    constructor(){
        this.observers = [];
    }

    addDriver(driver:Driver){
        this.observers.push(driver);
    }

    removerDriver(driver:Driver){
        this.observers = this.observers.filter((d:Driver) => d.name!==driver.name);
    }

    sendNotificationToDrivers(drivers:Driver[] , ride:Ride):void{
        drivers.forEach((driver:Driver):void =>
            driver.notifyRideRequest(ride)

        )
    }
}