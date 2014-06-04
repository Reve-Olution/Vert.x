var dateUtil = {
	
	//Conversion d'une date mongo (YYYYMMJJ) en date js
	convertMongoStrToDate : function (mongoStrDate) {
		
		var year = mongoStrDate.substr(0, 4);
		
		var month = mongoStrDate.substr(4, 2);
		month = month.replace(/^0+/, '');
		
		var day = mongoStrDate.substr(6, 2);	
		day = day.replace(/^0+/, '');
		
		return new Date(year,month-1,day);
	
	},
	
	//Conversion JS date en date mongo
	convertDateToMongoStr : function(date){
		
		var m = date.getMonth()+1;
		var mStr = ''+m;
		if(m < 10){
			mStr = '0' + mStr;
		}
		
		var d = date.getDate();
		var dateStr = ''+d;
		if(d < 10){
			dateStr = '0' + dateStr;
		}
		var d = date.getFullYear() + '' + mStr +''+ dateStr;
		return d;
	},
	
	//Conversion de decimal en HHMM
	convertDecimalToHH_MM : function (decimalTime) {
		var h = Math.floor(decimalTime);
	
		var m = Math.floor(decimalTime % 1 * 60);
		
		if(m < 10){
			m = '0' + m;
		}
		return h + ':' + m;
	},
	
	getLocaleDateFromMongo : function (date) {
		var jsDate = this.convertMongoStrToDate(date);
		return this.getLocaleDate(jsDate);
	},
	getLocaleDate : function (jsDate) {
		moment.lang('fr');
		var frLangData = moment.langData('fr');
		return frLangData.weekdays(moment(jsDate)) + ' ' + moment(jsDate).date() + ' ' +frLangData.months(moment(jsDate));
	}
}