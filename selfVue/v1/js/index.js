function SelfVue(options) {
	// body...
	var self = this;
	this.vm = this;
	this.data = options.data;

	Object.keys(this.data).forEach(function(key) {
		self.proxy(key);
	});

	obsere(this.data);
}

SelfVue.prototype = {
	proxy: function(key) {
		var self = this;
		Object.defineProperty(this, key, {
			get: function() {
				return self.data[key];
			},
			set: function(newVal) {
				self.data[key] = newVal;
			}
		})
	}
}