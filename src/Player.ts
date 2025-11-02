export class Player {
    private name: string;
    private position:number

    constructor(name:string){
        this.name = name;
        this.position = 0
    }

    getPlayerName():string{
        return this.name
    }

    getPlayerPosition():number{
        return this.position
    }

    setPlayerPosition(pos:number):void{
        this.position = pos
    }
}