
var SCREEN_IS_ANIMATE = false;
var SCREEN_SENSITIVITY = 100;

function setScreenPosition(stageX, stageY){
	var scrollY = $('#screen').scrollTop();
	var scrollX = $('#screen').scrollLeft();
	// bottom edge
	if(stageY >= screenHeight + scrollY - SCREEN_SENSITIVITY){
		if(!SCREEN_IS_ANIMATE){
			SCREEN_IS_ANIMATE = true;
			$('#screen').stop().animate({scrollTop : mapHeight - screenHeight+20}, 1000, function(){
				SCREEN_IS_ANIMATE = false;
			});
		}
	// top edge
	} else if(stageY <= scrollY + SCREEN_SENSITIVITY){
		if(!SCREEN_IS_ANIMATE){
			SCREEN_IS_ANIMATE = true;
			$('#screen').stop().animate({scrollTop : 0}, 1000, function(){
				SCREEN_IS_ANIMATE = false;
			});
		}
	// right edge
	} else if(stageX >= screenWidth + scrollX - SCREEN_SENSITIVITY){
		if(!SCREEN_IS_ANIMATE){
			SCREEN_IS_ANIMATE = true;
			$('#screen').stop().animate({scrollLeft : mapWidth - screenWidth+20}, 1000, function(){
				SCREEN_IS_ANIMATE = false;
			});
		}
	// left edge
	} else if(stageX <= scrollX + SCREEN_SENSITIVITY){
		if(!SCREEN_IS_ANIMATE){
			SCREEN_IS_ANIMATE = true;
			$('#screen').stop().animate({scrollLeft : 0}, 1000, function(){
				SCREEN_IS_ANIMATE = false;
			});
		}
	} else {
		$('#screen').stop();
		SCREEN_IS_ANIMATE = false;
	}
}