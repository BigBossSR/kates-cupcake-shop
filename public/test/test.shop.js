describe("Kate's Cupcake Shop LLC. A Delaware Company", function(){

  describe("cupcakeShop.addFlavor", function(){

    it("exists", function(){
      expect(cupcakeShop.addFlavor).to.be.a("function");
    });
    
    it("can create new flavors as objects", function(){
      resetShop();

      cupcakeShop.addFlavor("chocolate", 5);
      expect(cupcakeShop.inventory).to.have.keys("chocolate");
      cupcakeShop.addFlavor("vanilla", 2);
      expect(cupcakeShop.inventory).to.have.keys("vanilla", "chocolate");
      cupcakeShop.addFlavor("strawberry", 9);
      expect(cupcakeShop.inventory).to.have.keys("vanilla", "chocolate", "strawberry");


    });

    it("includes price and empty quantity keys", function(){
      resetShop();

      cupcakeShop.addFlavor("chocolate", 3);
      expect(cupcakeShop.inventory).to.have.keys("chocolate");
      cupcakeShop.addFlavor("vanilla", 3);
      expect(cupcakeShop.inventory).to.have.keys("vanilla", "chocolate");
      cupcakeShop.addFlavor("twist", 4);
      expect(cupcakeShop.inventory).to.have.keys("vanilla", "chocolate", "twist");

      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {price: 3, quantity: 0},
        vanilla: {price: 3, quantity: 0},
        twist: {price: 4, quantity: 0}
      });
    });


    it("doesn't overwrite existing flavors", function(){
      resetShop();

      cupcakeShop.addFlavor("chocolate");
      cupcakeShop.inventory.chocolate = 10;

      cupcakeShop.addFlavor("chocolate");

      expect(cupcakeShop.inventory).to.have.keys("chocolate");
      expect(cupcakeShop.inventory.chocolate).to.equal(10);
    });

  });

  describe("cupcakeShop.removeFlavor", function(){

    it("exists", function(){
      expect(cupcakeShop.removeFlavor).to.be.a("function");
    });

    it("removes flavors", function(){
      resetShop();
//update to match new inventory
      cupcakeShop.inventory = {
        chocolate: {price: 3, quantity: 10},
        vanilla: {price: 3, quantity: 3},
        "red velvet": {price: 5, quantity: 7}
      }

      cupcakeShop.removeFlavor("red velvet"); // so gross

      expect(cupcakeShop.inventory).to.have.keys("chocolate", "vanilla");
      expect(cupcakeShop.inventory).to.not.have.keys("red velvet");
    });

    it ("adds flavor to retired", function(){
      resetShop();

//update to new inventory
      cupcakeShop.inventory = {
        coconut: {price: 3, quantity: 3},
        blueberry: {price: 3, quantity: 5},
        rainbow: {price: 10, quantity: 1}
      }

      cupcakeShop.removeFlavor("rainbow");

      expect(cupcakeShop.retired).to.deep.equal([
        "rainbow"]);
    });

    it ("doesn't duplicate retired flavors", function(){
      resetShop();

//update to new inventory
      cupcakeShop.inventory = {
        coconut: {price: 3, quantity: 1},
        blueberry: {price: 3, quantity: 3}
      }

      cupcakeShop.retired = [
        "coconut"
        ]

      cupcakeShop.removeFlavor("coconut");

      expect(cupcakeShop.retired).to.deep.equal([
        "coconut"
        ]);

    });

  });

  describe("cupcakeShop.listFlavors", function(){

    it("exists", function(){
      expect(cupcakeShop.listFlavors).to.be.a("function");
    });

    it("returns empty array if there's no inventory", function(){
      resetShop();

      expect(cupcakeShop.listFlavors()).to.deep.equal([]);
    });

    it("lists cupcake flavors", function(){
      resetShop();

//update to new inventory
      cupcakeShop.inventory = {
        chocolate: {price: 3, quantity: 10},
        vanilla: {price: 2, quantity: 5},
        strawberry: {price: 3, quantity: 14},
        "red velvet": {price: 5, quantity: 0}
      }

      expect(cupcakeShop.listFlavors()).to.be.same.members([
        "chocolate",
        "vanilla",
        "strawberry",
        "red velvet"
      ]);
    });

  });


  describe("cupcakeShop.showStock", function(){

    it("exists", function(){
      expect(cupcakeShop.showStock).to.be.a("function");
    });

    it("shows object-based stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        vanilla: {price: 3, quantity: 20},
        chocolate: {price: 3, quantity: 0},
      }

      expect(cupcakeShop.showStock("vanilla")).to.equal(20)
      expect(cupcakeShop.showStock("chocolate")).to.equal(0)
    })

// Will fail; needs to go deeper for quantity
    it("shows old stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        vanilla: 20,
        chocolate: 0
      }

      expect(cupcakeShop.showStock("vanilla")).to.equal(20)
      expect(cupcakeShop.showStock("chocolate")).to.equal(0)
    })

    it("in new format returns 0 for non-existent flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        vanilla: {price: 3, quantity: 20}
      }

      expect(cupcakeShop.showStock("strawberry")).to.equal(0)
    })

// Will fail; needs to go deeper for quantity - actually, will probably work, zero is zero
    it("in old format returns 0 for non-existent flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        vanilla: 20
      }

      expect(cupcakeShop.showStock("strawberry")).to.equal(0)
    })

  });

  describe("cupcakeShop.restock", function(){

    it("exists", function(){
      expect(cupcakeShop.restock).to.be.a("function");
    });

    it("adds to new object stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {price: 3, quantity: 8},
        vanilla: {price: 3, quantity: 4},
        strawberry: {price: 4, quantity: 0}
      }

      cupcakeShop.restock("vanilla", 10)
      cupcakeShop.restock("strawberry", 3)
      
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {price: 3, quantity: 8},
        vanilla: {price: 3, quantity: 14},
        strawberry: {price: 4, quantity: 3}
      })
    });

// Will fail; needs to go deeper for quantity 
    it("FAIL adds to stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: 8,
        vanilla: 4,
        strawberry: 0
      }

      cupcakeShop.restock("vanilla", 10)
      cupcakeShop.restock("strawberry", 3)
      
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: 8,
        vanilla: 14,
        strawberry: 3
      })
    });

    it("doesn't add to stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {price: 3, quantity: 8},
        vanilla: {price: 3, quantity: 4}
      }

      cupcakeShop.restock("rhubarb", 6)
      
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {price: 3, quantity: 8},
        vanilla: {price: 3, quantity: 4}
      })
    });

  });

  describe("cupcakeShop.makeSale", function(){

    it("exists", function(){
      expect(cupcakeShop.makeSale).to.be.a("function");
    });

    it("should make a NEW sale", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {price: 4, quantity: 5},
        strawberry: {price: 3, quantity: 3}
      }

      var saleResult = cupcakeShop.makeSale("chocolate");

      expect(saleResult).to.equal(true);
      expect(cupcakeShop.register).to.equal(4);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {price: 4, quantity: 4},
        strawberry: {price: 3, quantity: 3}
      })
    });


    it("FAIL OLD should make a sale", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: 5,
        strawberry: 3
      }

      var saleResult = cupcakeShop.makeSale("chocolate");

      expect(saleResult).to.equal(true);
      expect(cupcakeShop.register).to.equal(3);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: 4,
        strawberry: 3
      })
    });

    it("should not sell an out of stock cupcake", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {price: 3, quantity: 5},
        strawberry: {price: 4, quantity: 0}
      }

      var saleResult = cupcakeShop.makeSale("strawberry");

      expect(saleResult).to.equal(false);
      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {price: 3, quantity: 5},
        strawberry: {price: 4, quantity: 0}
      })

    });

    it("should not sell an non-existent flavor", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {price: 4, quantity: 5},
        strawberry: {price: 3, quantity: 3}
      }

      var saleResult = cupcakeShop.makeSale("vanilla");

      expect(saleResult).to.equal(false);
      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {price: 4, quantity: 5},
        strawberry: {price: 3, quantity: 3}
      })
    });

  });

  describe("cupcakeShop.reconcile", function(){

    it("exists", function(){
      expect(cupcakeShop.reconcile).to.be.a("function");
    });

    it("should deposit the register take in the bank account", function(){
      resetShop();

      cupcakeShop.register = 100;
      cupcakeShop.reconcile()

      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.bank).to.equal(100);

      cupcakeShop.register = 150;
      cupcakeShop.reconcile()

      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.bank).to.equal(250);
    });

  });

  describe("cupcakeShop.sellsCookies", function(){

    it("exists", function(){
      expect(cupcakeShop.sellsCookies).to.be.a("function");
    });

    it("returns whether or not the store sells cookies", function(){
      expect(cupcakeShop.sellsCookies()).to.equal(false);
    });

  });

  describe("cupcakeShop.discountSale", function(){

    it("exists", function(){
      expect(cupcakeShop.discountSale).to.be.a("function");
    });

    it("should apply a NEW discount", function(){
        resetShop();

//updated inventory
        cupcakeShop.inventory = {
          vanilla: {price: 3, quantity: 1},
        }

        var saleResult = cupcakeShop.discountSale("vanilla", 1/3);


        expect(cupcakeShop.register).to.equal(2);

    });


    it("should make a NEW sale", function(){
        resetShop();

        cupcakeShop.inventory = {
          chocolate: {price: 7, quantity: 7},
          strawberry: {price: 3, quantity: 4}
        }

        var saleResult = cupcakeShop.discountSale("chocolate", 0.50);

        expect(saleResult).to.equal(true);
        expect(cupcakeShop.register).to.equal(3.5);
        expect(cupcakeShop.inventory).to.deep.equal({
          chocolate: {price: 3.5, quantity: 6},
          strawberry: {price: 3, quantity: 4}
        })
      });


    it("FAIL should make a sale", function(){
        resetShop();

        cupcakeShop.inventory = {
          chocolate: 7,
          strawberry: 4
        }

        var saleResult = cupcakeShop.discountSale("chocolate", 0.50);

        expect(saleResult).to.equal(true);
        expect(cupcakeShop.register).to.equal(1.5);
        expect(cupcakeShop.inventory).to.deep.equal({
          chocolate: 6,
          strawberry: 4
        })
      });

      it("should not sell an out of stock cupcake", function(){
        resetShop();

//updated inventory to match new format
        cupcakeShop.inventory = {
          chocolate: {price: 3, quantity: 5},
          strawberry: {price: 4, quantity:0}
        }

        var saleResult = cupcakeShop.makeSale("strawberry", 0.10);

        expect(saleResult).to.equal(false);
        expect(cupcakeShop.register).to.equal(0);
        expect(cupcakeShop.inventory).to.deep.equal({
          chocolate: {price: 3, quantity: 5},
          strawberry: {price: 4, quantity:0}
        })

      });

      it("should not sell a non-existent flavor", function(){
        resetShop();
//updated inventory to match new format
        cupcakeShop.inventory = {
          chocolate: {price: 3, quantity: 5},
          strawberry: {price: 4, quantity: 3}
        }

        var saleResult = cupcakeShop.makeSale("vanilla", 0.4);

        expect(saleResult).to.equal(false);
        expect(cupcakeShop.register).to.equal(0);
        expect(cupcakeShop.inventory).to.deep.equal({
          chocolate: {price: 3, quantity:5},
          strawberry: {price: 4, quantity: 3}
        })
      });
  });


  describe("cupcakeShop.bulkRestock", function() {

    it("exists", function(){
      expect(cupcakeShop.bulkRestock).to.be.a("function");
    });

//updated inventory to match new format
    it("should restock all available flavors", function() {
      resetShop;

      cupcakeShop.inventory = {
        vanilla: {price: 3, quantity: 13},
        strawberry: {price: 4, quantity: 3},
        banana: {price: 2, quantity: 37}
      }

      cupcakeShop.bulkRestock(5);

      expect(cupcakeShop.inventory).to.deep.equal({
        vanilla: {price: 3, quantity: 18},
        strawberry: {price: 4, quantity: 8},
        banana: {price: 2, quantity: 42}
        }) 
    });


  });



});