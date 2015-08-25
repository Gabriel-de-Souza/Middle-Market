var Video = function(video){
	
	this.video = video;
	
	var videoControl = true;
	
	this.video.play();
	
	var jump = false;
	
	this.update = function(){
		if(videoControl){
			if(blackScreen.opacity != 0){
				this.video.pause();
				fadeOut(blackScreen, 1);
			}else{
				videoControl = false;
				this.video.play();
			}
		}else{
			if(this.video.ended){
				if(blackScreen.opacity != 1){
					fadeIn(blackScreen, 1);
				}else{
					scene = new Menu();
				}
			}
			if(input.GetKeyDown(32) || input.GetKeyDown(13) || input.GetKeyDown(27)){
				jump = true;
			}
			if(jump){
				this.video.pause();
				if(blackScreen.opacity != 1){
					fadeIn(blackScreen, 1);
				}else{
					scene = new Menu();
				}
			}
		}
	}
	
	this.draw = function(){
		ctx.drawImage(this.video, 0, 0, 1024, 768);
	}
}