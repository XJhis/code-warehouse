function observe(data) {
	if (typeof data !== 'object' || data=== null) {
		return false;
	}

	Object.keys(data).forEach(function(key){
		defineKey(data, key, data[key]);
	})

}

function defineKey(data, key, val) {
	observe(data);
	
	Object.defineProperty(data, key, {
		enumbler: true,
		configtable: true,
		get: function() {
			return val;
		},
		set: function(newVal) {
			if (val === newVal) {
				return val
			}

			
		}
	})
}