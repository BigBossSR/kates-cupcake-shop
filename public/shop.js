
/*
  This object will contain all of the information we're tracking about Kate's shop.
  It will contain several properties and methods, which we'll describe below.
*/

var cupcakeShop = {

  /*
    shop.inventory: An object, representing the available stock of each flavor of cupcake. 
      If there are four chocolate available, and two vanilla, the property will be equal to:

      { 
        chocolate: 4, 
        vanilla: 2 
      }
  */
  inventory: {},

  /*
    shop.price: A number, representing the price of a single cupcake.
  */
  price: 3,

  /*
    shop.register: A number, representing the amount of money in the cash register.
  */
  register: 0,

  /*
    shop.bank: A number, representing the amount of money in the business' bank account.
  */
  bank: 0,

  
  /*
    shop.addFlavor: Accepts a string as a parameter, representing a cupcake flavor.
      Adds that flavor to the inventory of cupcake flavors available for sale.\

      If that flavor is ALREADY for sale, make sure that you don't 
      overwrite its existing inventory.

  */
  addFlavor: function(type) {
   //check if type NOT exists in inventory
   //this one worked for me...
    if (!(type in cupcakeShop.inventory)) {
    //if yes, add the type
      return cupcakeShop.inventory[type] = 0

/*    //wanted to try this one, but nothing yet 
       if (_.find(cupcakeShop.inventory, type) === undefined) {
        return cupcakeShop.inventory[type] = 0
      } else {

        return cupcakeShop.inventory[type] */

      } 
  },

  /*
    shop.removeFlavor: Accepts a string as a parameter, representing a cupcake flavor.
      Removes that flavor from the inventory of cupcake flavors available for sale.
      If there are cupcakes of that flavor, throw them away. (Eww, red velvet.)
  */
  removeFlavor: function(type) {
    //check if type exists
    if (type in cupcakeShop.inventory) {
    //remove
      delete cupcakeShop.inventory[type]
    }
  },

  /*
    shop.listFlavors: Returns a list of the flavors for sale.
  */
  listFlavors: function() {
   /*  var flavorList = []
  if (cupcakeShop.inventory.length > 0) {
      var flavorList = cupcakeShop.inventory.map(flavorList.push(cupcakeShop.inventory))
      console.log(cupcakeShop.inventory)
    }
    */

    return _.keys(cupcakeShop.inventory)

    //return flavorList
  },

  /*
    shop.showStock: Accepts a string as a parameter, representing a cupcake flavor.
      Returns the quantity of that cupcake flavor in the inventory.
      
      If that that cupcake flavor is available, returns 0.
  */
  showStock: function(flavor) {
   if (flavor in cupcakeShop.inventory) {
      return cupcakeShop.inventory[flavor]
    } else {
      return 0
    }
  },


  /*
    shop.restock: Accepts two parameters:
        * A string, representing a cupcake flavor, and
        * A number, representing an amount of cupcakes of that flavor to add.

      If that flavor exists in the inventory, add that number of cupcakes to it.

      If that flavor DOESN'T exist in the inventory, do nothing.
  */
  restock: function(flavor, count) {
    if (flavor in cupcakeShop.inventory) {
      return cupcakeShop.inventory[flavor] += count

    }

  },

  /*
    shop.makeSale: Accepts a string as parameter, representing a cupcake flavor.

      If that cupcake flavor is available and there is at least 1 in the inventory,
        then subtract one from that flavor's inventory, 
        add the price of a cupcake to the register,
        and return true.

      If that cupcake flavor is not available, or is out of inventory,
        then return false.
  */
  makeSale: function(flavor) {

    if ((flavor in cupcakeShop.inventory) && (cupcakeShop.inventory[flavor] > 0)) {
      cupcakeShop.inventory[flavor] -= 1


      cupcakeShop.register += cupcakeShop.price

      return true

    } else {
      return false
    }

  },

  /*
    shop.reconcile: Adds the number in the register to the bank.
      Sets the register to 0.

      (Think of this like depositing the day's take in the bank at night.)
  */
  reconcile: function() {
    return cupcakeShop.bank += cupcakeShop.register, cupcakeShop.register = 0


  },

  /*
    shop.sellsCookies: Returns true if this shop sells cookies. Returns false if not.
      (Note: This shop does not ever sell cookies. It is a cupcake shop.)
  */
  sellsCookies: function() {
    return false    
  }

}


/*
  This function exists for testing purposes. It's called before every test
    to ensure that results of previous tests don't have any effect on this one.

    All it does is set the cupcakeShop properties to their default, empty values.

    Don't modify it.
*/
var resetShop = function() {
  cupcakeShop.inventory = {};
  cupcakeShop.price = 3;
  cupcakeShop.register = 0;
  cupcakeShop.bank = 0;
}
