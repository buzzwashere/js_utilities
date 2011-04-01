/* ----------------------------------------------------------------------------------

 * ObjHash.js 
 *
 *  This utility provides a simple way to create and maintain an array, or hash,
 *  of objects in javascript.  
 *
 *  To create a new object hash:
 *
 *      var myHash = new util.ObjHash();
 *      myHash.initialize();
 *
 *  To add an object to the hash:
 *
 *      myHash.addObject({
 *          name: 'object 1',
 *		  attr1: 'this is attr1 of object 1',
 *		  attr2: 'this is attr2 of object 1'
 *      });
 *
 *  To retrieve an object from the hash:
 *
 *      var myObject = myHash.getObject('name','object 1');
 *
 *  To update an attribute of an object on the hash:
 *
 *      myHash.updateAttribute('name', 'object 1', 'attr1', 'whats_up_dog?');
 *
 *  To remove an object from the hash:
 *
 *      var myObject = myHash.removeObject('name','object 1');
 *      
 * ---------------------------------------------------------------------------------- */

var util = util ? util : {};
util.ObjHash = util.ObjHash ? util.ObjHash : {};

util.ObjHash = function() {};

util.ObjHash.prototype.initialize = function() {
	
    var scope = this;
	this.array = [];
	this.index = 0;

	// Add an object to the array.
	//  Params:
	//		newObject = the object to add to the array 
	//  Returns:
	//		Boolean... true = object was added, false = not
	this.addObject = function( newObject ) {
		try {
			this.array.push( newObject );
			return true;
		} catch(err) {
			return false;
		}
    };

	// Retrieve an object from the array.
	//  Params:
	//		searchName = name of attribute by which to find object 
	//		searchValue = value of attribute by which to find object 
	//  Returns:
	//		the object found, or null if not found
	this.getObject = function( searchName, searchValue ) {
		try{
			if (searchName !== "" && searchValue !== "") {
				for (var i = 0; i < this.array.length; i++) {
					if (this.array[i][searchName] == searchValue) {
						this.index = i;
						return this.array[i];
					}
				}
			}
			return null;
		} catch(err) {
			return null;
		}
	};
	
	// Remove an object from the array.
	//  Params:
	//		searchName = name of attribute by which to find object 
	//		searchValue = value of attribute by which to find object 
	//  Returns:
	//		Boolean... true = object was found and removed, false = not
	this.removeObject = function( searchName, searchValue ) {
		try{
			var obj = this.getObject( searchName, searchValue );
			if (obj) {
				this.array.splice(this.index, 1);	// remove array element with index of this.index
				return true;
			} else {
				return false;
			}
		} catch(err) {
			return false;
		}
		
	};
	
	// Update a the value of an nattribute within an object of the array.  
	//  Params:
	//		searchName = name of attribute by which to find object 
	//		searchValue = value of attribute by which to find object 
	//		updateAttrName = name of attribute to update within object 
	//		updateAttrValue = value to assign to object attribute 
	//  Returns:
	//		Boolean... true = object was found and updated, false = not
	this.updateAttribute = function( searchName, searchValue, updateAttrName, updateAttrValue ) {
		try{
			var obj = this.getObject( searchName, searchValue );
			if (obj) {
				this.array[this.index][updateAttrName] = updateAttrValue;	// remove array element with index of this.index
				return true;
			} else {
				return false;
			}
		} catch(err) {
			return false;
		}
    };

};
