/* --------------------------------------------------------------------------
	DateUtil.js					

	Buzz Loftus, 2010 
	
	isWeekendDay( stringDate )
		Desc:		Determines if a date falls on a weekend.  
		Args: 		1:	Date string in "mm/dd/yyyy" format. (required)
		      		2: Format of incoming date (optional, defaults to 'm/d/Y')
		Usage:  	namespace.DateUtil.isWeekendDay( "01/05/2010" );
		Returns:	true - date falls on a weekend (Sat or Sun),
					false - date does not fall on a weekend 
		
	isFederalHoliday( stringDate )
		Desc:		Determines if a date falls on a Federal holiday.  
		Args: 		1: Date string in "mm/dd/yyyy" format. (required)
		      		2: Format of incoming date (optional, defaults to 'm/d/Y')
		Usage:	  	namespace.DateUtil.isFederalHoliday( "01/05/2010" );
		Returns:	true - date is a Federal holiday
					false - date is not a Federal holiday

	findFutureWorkingDay( stringDate, daysToAdd, inFormat)
		Desc:		Determines the date of a working day n-number of working days in the future.  
		Args: 		1: Base date string in "mm/dd/yyyy" format. (required)
		      		2: Number of working days to add. (required)
		      		3: Format of incoming date (optional, defaults to 'm/d/Y')
		Usage:	  	namespace.DateUtil.findFutureWorkingDay( "01/05/2010", 5, 'm/d/Y' );
		Returns:	Date string of future working day

 	addDaysToDateString( stringDate, daysToAdd, inFormat, returnFormat ) 
		Desc:		Adds a number of days (positive or negative) to a date.  
		Args: 		1: Date string in "mm/dd/yyyy" format. (required)
					2: Days to add to date in arg 1 (required)
		      		3: Format of incoming date (optional, defaults to 'm/d/Y')
					4: Format of returned date ("m/d/Y" (dflt) or "Y-m-d") (optional) 
		Usage:	  	namespace.DateUtil.addDaysToDateString( "01/05/2010", 5, "m/d/Y");
		Returns:	String value of date with days added.
		
 -------------------------------------------------------------------------
*/

namespace.DateUtil = (function() {
    
    // private attributes
	var stringDate = null; 
	var thisDate = new Date();
	var date1 = null;
	var newDate = null;
	var baseDate = null;
	var workString = null;
	var Mo_Wk_DayOfWk = null;
	var thisDaysToAdd = null;

	var pattern = null;
	var parts = null; 
	var mdY = null; 
	
    // private methods
	
	// Convert string date representation to Date object.
	function stringToDate( stringDate, inFormat ) {

		try {

			if (stringDate.length == 0) {
				return false;
			}

			thisDate = Date.parse( stringDate );
						
			return true;
	
		} catch(err) {
			
			return false;
		
		}		
	}

	// Convert Date object to string date representation.
	function dateToString( dt_Date, returnFormat ) {
		try {
			newDate = new Date(dt_Date);
			var monthNumber = newDate.getMonth() + 1;
			workString = "";
			if (returnFormat == null || returnFormat == "") {
				returnFormat =  "m/d/Y";
			}
			if (returnFormat === "m/d/Y") {
				if (monthNumber < 10) {
					workString = workString + "0";	
				} 
				workString = workString + monthNumber;	
				workString = workString + "/";
				if (newDate.getDate()<10) {
					workString = workString + '0';
				}
				workString = workString + newDate.getDate();
				workString = workString + "/";
				workString = workString + newDate.getFullYear();
			} else {		// "Y-m-d"
				workString = newDate.getFullYear();
				workString = workString + "-";	
				if (monthNumber < 10) {
					workString = workString + "0";	
				} 
				workString = workString + monthNumber;	
				workString = workString + "-";
				if (newDate.getDate()<10) {
					workString = workString + '0';
				}
				workString = workString + newDate.getDate();
			}
			return workString;
		} catch(err) {
			return '';
		}
	}
    
    // Return public attr's and methods as defined below.
    // (Private attributes and methods defined above are only accessible
    //  within the return-block below.)
    return {

		// -------------------------------------------------------------

		isWeekendDay: function( stringDate, inFormat ) {
			if ( stringToDate( stringDate, inFormat ) ) {
				newDate = new Date(thisDate);
				var dayOfTheWeek = newDate.getDay();
				if (dayOfTheWeek == 0 || dayOfTheWeek == 6 ) {
					return true;
				}
				return false;
			}
		},

		// -------------------------------------------------------------
		
		isFederalHoliday : function( stringDate, inFormat ) {

			if ( !stringToDate( stringDate, inFormat ) ) {
				return false;
			}
			newDate = new Date(thisDate);

			// check simple dates (month/date - no leading zeroes)
			var n_date 	= newDate.getDate();
			var n_month = newDate.getMonth() + 1;
			var c_month = newDate.getMonth();
			var s_date1 = n_month + '/' + n_date;
			var n_wday 	= newDate.getDay();
			var fullYear = newDate.getFullYear();

			// -----------------------------------------------------------------
			// Holidays that fall on the same date every year, but can adjust
			// if actual holiday falls on a weekend.  Saturday holiday moves to
			// Friday, Sunday holiday moves to Monday.
			// -----------------------------------------------------------------
	
			// New Year's Day
			if (  	s_date1 == '1/1' ||
					s_date1 == '12/31' && n_wday == 5 ||      // Fri
					s_date1 == '1/2' && n_wday == 1 )         // Mon
				return true;
		
			// Flag Day
			//if (  s_date1 == '6/14' ||
			//      s_date1 == '6/13' && n_wday == 5 ||       // Fri
			//      s_date1 == '6/15' && n_wday == 1 )        // Mon
			//return true;
		
			// Independence Day
			if (  	s_date1 == '7/4' ||
					s_date1 == '7/3' && n_wday == 5 ||       // Fri
					s_date1 == '7/5' && n_wday == 1 )        // Mon
				return true;
		
			// Veterans Day
			if (  	s_date1 == '11/11' ||
					s_date1 == '11/10' && n_wday == 5 ||       // Fri
					s_date1 == '11/12' && n_wday == 1 )        // Mon
				return true;
		
			// Christmas Day
			if (  	s_date1 == '12/25' ||
					s_date1 == '12/24' && n_wday == 5 ||       // Fri
					s_date1 == '12/26' && n_wday == 1 )        // Mon
				return true;
		
			// weekday from beginning of the month (month/num/day)
			n_wnum = Math.floor((n_date - 1) / 7) + 1;
			Mo_Wk_DayOfWk = n_month + '/' + n_wnum + '/' + n_wday;
			if (   Mo_Wk_DayOfWk == '1/3/1'  // Birthday of Martin Luther King, third Monday in January
				|| Mo_Wk_DayOfWk == '2/3/1'  // Washington's Birthday, third Monday in February
				|| Mo_Wk_DayOfWk == '5/3/6'  // Armed Forces Day, third Saturday in May
				|| Mo_Wk_DayOfWk == '9/1/1'  // Labor Day, first Monday in September
				|| Mo_Wk_DayOfWk == '10/2/1' // Columbus Day, second Monday in October
				|| Mo_Wk_DayOfWk == '11/4/4' // Thanksgiving Day, fourth Thursday in November
			) return true;
		
			// Memorial Day is the last Monday in May
			if ( c_month == 4 ) {
				// Get the date of the last Monday in May.
				var dt_last_mon_in_may = new Date(); 
				var dt_temp2 = new Date(newDate);
				for (var i = 1; i<32; i++) {
				  dt_temp2.setDate(i);
				  if (dt_temp2.getDay() == 1) {
					dt_last_mon_in_may.setTime(dt_temp2.getTime());
				  }
				}
				// Is date passed in equal to the last Monday in May?
				if (newDate.getTime() == dt_last_mon_in_may.getTime()) {
				  return true;
				}
			}
				
			// ------------------
			// misc complex dates
			// ------------------
		
			// Inauguration Day, January 20th every four years, starting in 1937. 
			if (s_date1 == '1/20' && (((fullYear - 1937) % 4) == 0) 
			) return true;
		
			// Election Day, Tuesday on or after November 2. 
			if (n_month == 11 && n_date >= 2 && n_date < 9 && n_wday == 2
			) return true;

			// Else not a federal holiday.
			return false;
		},
		
		// -------------------------------------------------------------

		findFutureWorkingDay: function( stringDate, daysToAdd, inFormat ) {
			
			// Desc:		Determines the date of a working day n-number of working days in the past/future.  
			// Args: 		1: Base date string in "mm/dd/yyyy" format. (required)
			//       		2: Number of working days back/forward. (required)
			// Usage:	  	namespace.DateUtil.findFutureWorkingDay( "01-05-2010", "5" );
			// Returns:		Date string of future WORKING DAY n-days in the past/future.

			var intDaysToAdd = null;
			
			if ( !stringToDate( stringDate, inFormat ) ) {
				return stringDate;
			}

			baseDate = new Date(thisDate);

			if (daysToAdd != null) {
				intDaysToAdd = parseInt( daysToAdd );
			} else {
				intDaysToAdd = 0;
			}
			
			// Starting at baseDate, iterate through working days for specified count.
			var increment = 1;
			if (intDaysToAdd < 0) {
				increment = -1;
			}
			var idx = increment;
			var dt_NextDate = new Date(baseDate);
			var msecsInADay = 86400000;
			dt_NextDate = new Date(baseDate);
			do {
				dt_NextDate.setTime(dt_NextDate.getTime() + msecsInADay);
				workString = dateToString( dt_NextDate, "m/d/Y" );
				if (!this.isFederalHoliday(workString, inFormat) && !this.isWeekendDay(workString, inFormat)) {
					idx = idx + increment;
				}
			} while (idx <= intDaysToAdd);
			
			// Return date (string) of ending working day.
			return workString;
		},
		
		// -------------------------------------------------------------

		addDaysToDateString: function( stringDate, daysToAdd, inFormat, returnFormat ) {
			
			// Is 'stringDate' a date string?
			if ( !stringToDate( stringDate, inFormat ) ) {
				return stringDate;
			}
			newDate = new Date(thisDate);
			// Is 'daysToAdd' a number?
			intDaysToAdd = parseInt( daysToAdd );
			if (intDaysToAdd == 0) {
				return stringDate;
			}
			// Perform arithmetic and return new date.
			try {
				var secsToAdd = intDaysToAdd * 86400000;
				newDate.setTime(newDate.getTime() + secsToAdd);
				if (returnFormat == null || returnFormat == "" || returnFormat == undefined || returnFormat != "m/d/Y" ) {
					returnFormat = "m/d/Y";
				}
				return dateToString( newDate, returnFormat );
			} catch(err) {
				return stringDate;
			}
					
		}
		
		// -------------------------------------------------------------

	}
	
})();