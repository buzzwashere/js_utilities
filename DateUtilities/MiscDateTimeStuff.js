
// Method that pads a number with leading zeros...  Added to Number prototype
//   Parm 1 is the length of the number with leading zeros (regardless
//   whether the number is an whole or rational number).  Dflt is 2 digits long.
if (!Number.hasOwnProperty('padZero')) {
    Number.prototype.padZero = function(len) {
        var s = String(this), c = '0';
        len = len || 2;
        while(s.length < len) s = c + s;
        return s;
    };
}

var bwh = bwh || {};

bwh.MiscDateTimeStuff = (function() {

    // Return public attr's and methods as defined below.
    // (Private attributes and methods defined above are only accessible
    //  within the return-block below.)
    return {

        // Format time as hh:mm:ss, with leading zeros when necessary.
        formatTime : function( time ) {
            if (time === undefined || time === null) {
                time = new Date();
            }
            return time.getHours().padZero() + ":" + time.getMinutes().padZero() + ":" + time.getSeconds().padZero();
        },
        
        // Format time as hh:mm:ss, with leading zeros when necessary.
        formatDate : function( date ) {
            if (date === undefined || date === null) {
                date = new Date();
            }
            var months = date.getMonth() + 1;
            return months.padZero() + "/" + date.getDate().padZero() + "/" + date.getFullYear().padZero();
        }
    
    };
        
})();