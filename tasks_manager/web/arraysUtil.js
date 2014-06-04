var arrayUtil = {
	
	uniqueValues : function (array) {
		return array.filter(this.onlyUnique);
	},
	
	onlyUnique : function (value, index, self) { 
    	return self.indexOf(value) === index;
	}
}