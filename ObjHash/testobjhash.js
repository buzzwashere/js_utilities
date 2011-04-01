
// Test objarr utility.
// --------------------

function testit() {

	var myArray = new util.ObjHash();
	myArray.initialize();

	myArray.addObject(
		{
			name: 'object 1',
			attr1: 'this is attr1 of object 1',
			attr2: 'this is attr2 of object 1'
		}
	);
	myArray.addObject(
		{
			name: 'object 2',
			attr1: 'this is attr1 of object 2',
			attr2: 'this is attr2 of object 2'
		}
	);

	var results;
	var x = myArray.getObject('name','object 1');
	if (x) {
		results = "get object 1 = " + x.attr1;
	} else {
		results = "get object 1 failed";
	}
	
	document.getElementById('content').innerHTML = results;

}
