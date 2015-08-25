/**
 * InputHandeler class, handle and log down keys
 */
function InputHandeler() {
	this.pressed = {};
	this.down = {};
	this.up = {};
	this.upControl = {};
	// capture key pressedes
	var _this = this;
	document.addEventListener("keydown", function(evt) {
		_this.pressed[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete _this.pressed[evt.keyCode];
		delete _this.down[evt.keyCode];
		_this.up[evt.keyCode] = false;
	});
};

InputHandeler.prototype.GetKey = function(code) {
	return this.pressed[code];
};

InputHandeler.prototype.GetKeyDown = function(code) {
	// if key is registred as down return false else if
	// key pressed for first time return true else return false
	if (this.down[code]) {
		return false;
	} else if (this.pressed[code]) {
		return this.down[code] = true;
	}
	return false;
};

InputHandeler.prototype.GetKeyUp = function(code) {
	if(this.up[code] == false){
		return this.up[code] = true;
		delete this.up[code];
	}
};