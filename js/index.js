function navigation() {

	this.current = {};
	this.stack = new Array();

	this.push = function(func, params) {
		var fp = {};
		fp.func = func;
		fp.params = params;
		this.stack.push(fp);
	}

	this.pop = function() {
		var fp = this.stack.pop();
		return fp;
	}
	
	this.test = function() {
		console.log(this.stack);
	}
}