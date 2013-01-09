
document.oncontextmenu = function(){
	return false;
};

document.onkeydown = function(e){
	//console.log(e.keyCode);
	if(e.keyCode == 13){
		// enter
		if(MODE == SHAPE){
			if(pointArray.lenght != 0){
				createShape();
			}
			// ---------------------------------------------------------- DEBUG ---------------------------------------------------- //
			var printShapeArray = 'shapeArray = [';
			for(var i = 0; i < shapeArray.length; i++){
				printShapeArray += 'shape['+ i +']';
				if(shapeArray.length != i + 1) printShapeArray += ', ';
			}
			printShapeArray += ']';
			console.log(printShapeArray);
			// ---------------------------------------------------------- DEBUG ---------------------------------------------------- //
		}
	}
	if(e.keyCode == 27){
		// escape
		if(CREATING_SHAPE){
			pointArray.splice(pointArray.length - 1, 1);
			console.log('deleted last point');
			if(pointArray.length == 0){
				CREATING_SHAPE = false;
			};
		} else{
			
		}
		reDrawShapes();
		drawCurrentShape();
	}
	if(e.keyCode == 83){
		// 's'
		setMenuOption(SELECT);
	}
	if(e.keyCode == 68){
		// 'd'
		setMenuOption(SHAPE);
	}
};