
// Test objarr utility.
// --------------------

function testit() {

    var results;

	var myHash = new util.ObjHash();
	myHash.initialize();

	myHash.addObject(
		{
			name: 'object 1',
			attr1: 'this is attr1 of object 1',
			attr2: 'this is attr2 of object 1'
		}
	);
    results = "1. An object was added to the hash with name: " + myHash.getObject('name','object 1').name;

    myHash.addObject(
		{
			name: 'object 2',
			attr1: 'this is attr1 of object 2',
			attr2: 'this is attr2 of object 2'
		}
	);
    results += "<br>2. An object was added to the hash with name: " + myHash.getObject('name','object 2').name;

    myHash.removeObject('name','object 1');
    if (myHash.getObject('name','object 1') === null) {
        results += "<br>3. 'object 1' was removed from the hash";
    } else {
        results += "<br>3. 'object 1' was NOT removed from the hash";
    }        

    document.getElementById('content').innerHTML = results;

}
