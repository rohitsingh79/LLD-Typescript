import {DriverStrategyInterface} from "./DriverStrategyInterface";
import {Driver} from "../Driver";

export class regularDriverSelector implements DriverStrategyInterface {
    findDrivers(drivers: Driver[]): Driver[] {
        return drivers.filter((driver:Driver):boolean => driver.serviceType === 'REGULAR' );
    }
}