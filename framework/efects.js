function fadeIn(obj, time){
	if(typeof obj.fadeClock  == "undefined"){
		obj.fadeClock = new Timer();
		obj.opacity = 0;
	}else if(obj.opacity < 1){
		obj.opacity = obj.fadeClock.current()/time;
	}else{
		obj.opacity = 1;
		delete obj.fadeClock;
		return true;
	}
}

function fadeOut(obj, time){
	if(typeof obj.fadeClock  == "undefined"){
		obj.fadeClock = new Timer();
		obj.opacity = 1;
	}else if(obj.opacity > 0){
		obj.opacity = 1 - (obj.fadeClock.current()/time);
	}else{
		obj.opacity = 0;
		delete obj.fadeClock;
		return true;
	}
}