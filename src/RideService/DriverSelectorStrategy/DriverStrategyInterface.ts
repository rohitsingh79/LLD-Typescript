import {Driver} from "../Driver";

export interface  DriverStrategyInterface {
    findDrivers : (drivers:Driver[]) => Driver[]
}