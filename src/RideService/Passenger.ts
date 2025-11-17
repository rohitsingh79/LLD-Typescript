export class Passenger {
    private readonly name:string
    constructor(name:string) {
        this.name = name
    }
    getPassenger():string{
        return this.name
    }
}