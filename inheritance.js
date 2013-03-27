// --------------------------------------------------
// simple inheritance

// The function below returns 'this'.  New objects of 
// type SimpleObject can be created using the 'new' operator.

var SimpleObject = function() {
    this.sayIt = function( text ) {
        var theText = text != undefined && text != '' ? text : 'nothing';
        console.log( 'the text is: ' + theText );
    }
    return this;  // allows SimpleObject to called directly (w/o newing up)
}

// create new SimpleObject.
var newObj = new SimpleObject();
newObj.sayIt('it worked');

// create another new SimpleObject.
var newObj2 = new SimpleObject();
newObj2.sayIt('this one also worked');

newObj.sayIt();
newObj2.sayIt('and another thing');


// --------------------------------------------------
// Factory method

// This function returns an object declared inside itself.
// The returned object is always new because local function 
// variables are thrown away when function execution ends,
// except in the case of a closure.

function factoryFunction(manuf, model) {
    var obj = {
        mfr: manuf,
        mdl: model,
	describe: function() {
	   console.log(this.mfr + ' ' + this.mdl);
	}
    };
    // other code to manipulate obj in some way here
    return obj;
}

var hondaCar = factoryFunction('Honda','Accord');
hondaCar.describe();

var mazdaCar = factoryFunction('Mazda','Miata');
mazdaCar.describe();
