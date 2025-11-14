import {DriverStrategyInterface} from "./DriverSelectorStrategyInterface";
import {Driver} from "../Driver";

export class standardDriverSelector implements DriverStrategyInterface {
    findDriver(driverS: Driver[]): Driver {
        return driverS[Math.floor(Math.random() * driverS.length)]
    }
}