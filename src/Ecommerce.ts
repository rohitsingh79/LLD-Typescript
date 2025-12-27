// pattern
// decorator , strategy , observer

// interfaces (contract)
interface OrderState{
    placed():void
    completed():void
}
interface Product{
    getName():string;
    getPrice():number;
}


// product class and builder
class PdBuilder{
    public name:string;
    public price:number;
    constructor(){
        this.name = '';
        this.price = 0;
    }
    Name(n:string):PdBuilder{this.name = n; return this}
    Price(n:number):PdBuilder{this.price = n; return this}
    build():PD{
        return new PD(this)
    }
}
class PD implements Product {
    private name:string;
    private price:number;
    constructor(PdBuilder:PdBuilder){
        this.name = PdBuilder.name;
        this.price = PdBuilder.price;
    }
    getName():string{return this.name;}
    getPrice():number{return this.price;}
    addPrice(p:number):number{this.price+=p; return this.price}
}

// abstract class
abstract class Decorator implements Product{
    protected pd:PD
    protected constructor(p:PD){
        this.pd = p
    }
    abstract  addPrice():number
    abstract getName():string
    abstract getPrice():number
}


// product decorator
class GiftWrapper extends Decorator{
    constructor(pd:PD){
        super(pd);
    }
    addPrice():number{
        const price = this.pd.addPrice(250)
        console.log('gift pd' , this.pd)

        return price


    }
    getName():string{return this.pd.getName()}
    getPrice():number{return this.pd.getPrice()}
}

// user class
class User {
    public name:string;
    public id:string;
    constructor(id:string , name:string){
        this.id = id
        this.name = name
    }

}


// states of orders
class PState implements OrderState{
    public ser:Service
    constructor(service:Service){
        this.ser = service;
    }
    placed():void{this.ser.state = new CState(this.ser);console.log('changed from placed state')}
    completed(){}
}
class CState implements OrderState{
    public ser:Service
    constructor(service:Service){
        this.ser = service;
    }
    placed():void{}
    completed(){console.log('order placed')}
}



// order class
class EOrder{
    public orId:string;
    private userId:string;
    private items:Array<Product>;
    public OrderStatus:string = ''
    constructor(orId:string, userId:string , items:Array<Product>){
        this.orId = orId;
        this.userId = userId;
        this.items = items;
    }
    getOrderDetails():{name:string , price:number}[]{
        console.log('items' , this.items)
        return this.items.map((item:Product):{name:string , price:number} => ( {name:item.getName() , price:item.getPrice()}))
    }
}

//payment Service
class Payment{
    pay(amount:number):boolean{return true;}
}

// cart class
class Cart{
    private userId:string;
    public items:Array<Product>;
    constructor(userId:string){
        this.userId = userId;
        this.items = [];
    }
    addItem(item:Product):void{this.items.push(item)}
}

// main service
class Service{
    public cart:Cart
    public orderList:EOrder[]
    public pService :Payment;
    public state:OrderState;
    constructor(cart:Cart){
        this.cart = cart;
        this.orderList = [];
        this.pService = new Payment();
        this.state = new PState(this);
    }
    placeOrder(order:EOrder):void{
        order.OrderStatus = 'INPROGRESS'
        this.orderList.push(order);
        console.log('order status' ,order.orId ,  order.OrderStatus)
        this.state.placed();
    }
    makePayment(order:EOrder , amount:number):void{

        const pStatus:boolean = this.pService.pay(amount);
        if(pStatus){
            order.OrderStatus = 'COMPLETED PAYMENT'
            console.log('payment is completed' , order.OrderStatus)
            this.state.completed();
        }
    }
}

// driver code

// create user
const rohit = new User('id_123' , 'Rohit')

// create product
const pd1:PD = new PdBuilder().Name('pencil').Price(100).build();
const giftWrapped:Decorator = new GiftWrapper(pd1);
console.log('gift wrapped' ,giftWrapped)

// create cart
const cart:Cart = new Cart(rohit.id);
cart.addItem(giftWrapped)

// create an Order
const Order1:EOrder = new EOrder('order_123' ,rohit.id , cart.items )

// get order details
console.log('order details' , Order1.getOrderDetails())

const ecomService = new Service(cart);

// place order
ecomService.placeOrder(Order1)

// make payment
ecomService.makePayment(Order1 , 100)




