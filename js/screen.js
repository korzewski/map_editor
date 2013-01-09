
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

var ZOOM = 0.85;
$(document).ready(function(){
	$('#screen').mousewheel(function(event, delta){
		ZOOM += delta*0.3;
		if(ZOOM < 0.9){
			ZOOM = 0.85;
			//$(this).zoomTo({targetsize: ZOOM, duration:600});
		} else if(ZOOM > 1.8){
			ZOOM = 2;
			//$(this).zoomTo({targetsize: ZOOM, duration:600});
		}
		$(this).zoomTo({targetsize: ZOOM, duration:600});
		console.log('zoom: ' + ZOOM);
	});
});