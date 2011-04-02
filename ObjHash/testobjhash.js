
// Test objarr utility.
// --------------------

function testit() {

    var results;

	var myHash = new util.ObjHash();

	myHash.addObject(
		{
			name: 'myObject 1',
			attr1: 'this is attr1 of myObject 1',
			attr2: 'this is attr2 of myObject 1'
		}
	);
    results = "1. An object was added to the hash with name: " + myHash.getObject('name','myObject 1').name + "<br>";

    myHash.addObject(
		{
			name: 'myObject 2',
			attr1: 'this is attr1 of myObject 2',
			attr2: 'this is attr2 of myObject 2'
		}
	);
    results += "<br>2. An object was added to the hash with name: " + myHash.getObject('name','myObject 2').name;

    results += "<br><br>3. List of hash objects:<br>" + myHash.getList();
    
    results += "<br><br>4. List of hash objects to JSON with root of \"someObjects\":<br>" + myHash.toJSON('someObjects') + "<br>";
    
    myHash.removeObject('name','myObject 1');
    if (myHash.getObject('name','myObject 1') === null) {
        results += "<br>5. 'object 1' was removed from the hash";
    } else {
        results += "<br>5. 'object 1' was NOT removed from the hash";
    }        

    document.getElementById('content').innerHTML = results;

}
