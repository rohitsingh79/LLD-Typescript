// all interfaces
interface State1{
    selectState(c:CoffeeTemplate):void;
    dispenseState():void;
}

// abstract class
abstract class CoffeeTemplate {
    private coffeeType:string;
    protected  constructor(type:string){
        this.coffeeType = type;
    }
    prepare():void{this.addCoffee(); this.addWater();}
    addCoffee():void{
        console.log('add coffee\n');
    }
    addWater():void{
        console.log('add water\n')
    }
    getCoffeeType():string{return this.coffeeType}
    abstract getPrice():number;
}
abstract class CoffeeDecorator extends CoffeeTemplate{
    public coffee:CoffeeTemplate;
    protected constructor(c:CoffeeTemplate){
        super(c.getCoffeeType())
        this.coffee = c;
    }
    prepare():void{
        this.coffee.prepare();
    }

    getPrice():number{
        return this.coffee.getPrice();
    }




}

// concrete class
class SelectState1 implements State1{
    private machine:MachineService;
    constructor(vm:MachineService){
        this.machine = vm;
    }
    selectState(c:CoffeeTemplate) {
        console.log('coffee selected')
        this.machine.setCoffee(c)
        this.machine.setState(new DispenseState1(this.machine));
    }
    dispenseState():void{
        console.log('cannot dispense in selection state')
    }
}
class DispenseState1 implements State1{
    private machine:MachineService;
    constructor(vm:MachineService){
        this.machine = vm;
    }
    selectState(c:CoffeeTemplate) {
        console.log('coffee already selected')
    }
    dispenseState():void{
        console.log('add payment and dispense')
        console.log('cannot dispense in selection state')
    }
}
class Latte extends CoffeeTemplate{
    constructor(){
        super('Latte');
    }
    addExtra():void{
        console.log('adding more cream')
    }
    getPrice():number {return 250}
}
class PlainCoffee extends CoffeeTemplate{
    constructor(type:string){
        super(type);
    }
    getPrice():number {return 100}
    addExtra():void{
        console.log('no extra for simple coffee')
    }
}
class CoffeeFactory{
    getCoffee(type:string): CoffeeTemplate {
        if(type === 'Latte') return new Latte();
        else return new PlainCoffee('plain');
    }
}
class extraSugarDecorator extends CoffeeDecorator{
    constructor(baseCoffee:CoffeeTemplate){
        super(baseCoffee)
    }
    prepare():void{
        this.coffee.prepare();
        console.log('stirring extra sugar')
    }

    getPrice():number{
        return this.coffee.getPrice() + 100;
    }

}
class MachineService{
    state1:State1;
    coffeeFactory:CoffeeFactory;
    currCoffee:CoffeeTemplate | null;
    constructor(){
        this.state1 = new SelectState1(this);
        this.coffeeFactory = new CoffeeFactory();
        this.currCoffee = null;
    }
    chooseCf(type:string):CoffeeTemplate{
        const fac = new CoffeeFactory();
        const cf:CoffeeTemplate = fac.getCoffee(type);
        const sugarCoffee = new extraSugarDecorator(cf);
        this.state1.selectState(sugarCoffee)
        return sugarCoffee;
    }
    setCoffee(c:CoffeeTemplate){
        this.currCoffee = c;
    }
    setState(s:State1):void{
        this.state1 = s;
    }
}



// machine service
const ser = new MachineService();
ser.chooseCf('Latte')



