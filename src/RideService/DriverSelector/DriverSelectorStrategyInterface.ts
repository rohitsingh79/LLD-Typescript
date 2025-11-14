import {Driver} from "../Driver";

export interface  DriverStrategyInterface {
    findDriver : (drivers:Driver[]) => Driver
}