# Designing a Vending Machine

## Requirements
1. The vending machine should support multiple products with different prices and quantities.
1. The machine should accept coins and notes of different denominations.
1. The machine should dispense the selected product and return change if necessary.
1. The machine should keep track of the available products and their quantities.
1. The machine should handle multiple transactions concurrently and ensure data consistency.
1. The machine should provide an interface for restocking products and collecting money.
1. The machine should handle exceptional scenarios, such as insufficient funds or out-of-stock products.


// pattern that can be used
1. state pattern -  to maintain the state of the vending machine
2. builder pattern - to create data about the product
3. singleton pattern
4. factory pattern - to create products 
5. observer pattern - to notify the vendor and the user 
6. command pattern - can take the coin calculate the change and update the inventory
7. 

extend it to the payment method and add strategy pattern 