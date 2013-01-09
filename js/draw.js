
var shapeOnStage = new Array;

function drawMargins(){
	var MARGIN_DISTANCE = 50;
	ctx.beginPath();
	ctx.moveTo(MARGIN_DISTANCE, MARGIN_DISTANCE);
	ctx.lineTo(mapWidth - MARGIN_DISTANCE, MARGIN_DISTANCE);
	ctx.lineTo(mapWidth - MARGIN_DISTANCE, mapHeight - MARGIN_DISTANCE);
	ctx.lineTo(MARGIN_DISTANCE, mapHeight - MARGIN_DISTANCE);
	ctx.lineTo(MARGIN_DISTANCE, MARGIN_DISTANCE);
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
	ctx.stroke();
	ctx.closePath();
}

function reDrawShapes(){
	stage.update();
	drawMargins();
}

function addShapeToStage(){
	shapeOnStage.push(new createjs.Shape());
	var currentShape = shapeOnStage.length - 1;
	
	for(var i = 0; i < shapeArray[currentShape].length; i++){
		if(i == 0) shapeOnStage[currentShape].graphics.beginFill('#ffa200').beginStroke('#00f').moveTo(shapeArray[currentShape][0].x, shapeArray[currentShape][0].y);
		else{
			shapeOnStage[currentShape].graphics.lineTo(shapeArray[currentShape][i].x, shapeArray[currentShape][i].y);
		}
	}
	
	shapeOnStage[currentShape].id = currentShape;
		
	// action
	shapeOnStage[currentShape].onPress = startMoveShape;
	console.log('currentShape: ' + currentShape);
	
	stage.addChild(shapeOnStage[currentShape]);	
}

var startX, startY, offsetX, offsetY;
var SHAPE_IS_MOVE = false;
var actualShapeID;

function startMoveShape(e){
	if(MODE == SELECT){
		SHAPE_IS_MOVE = true;
		
		actualShapeID = e.target.id;
		console.log('actualShapeID: '+ actualShapeID);
		
		startX = e.stageX;
		startY = e.stageY;
	}
}

function moveShape(stageX, stageY){
	if(SHAPE_IS_MOVE){		
		offsetX = stageX - startX;
		offsetY = stageY - startY;
				
		shapeOnStage[actualShapeID].x = shapeArray[actualShapeID].offsetX + offsetX;
		shapeOnStage[actualShapeID].y = shapeArray[actualShapeID].offsetY + offsetY;
		
		console.log('shapeOnStage[actualShapeID].x: ' + shapeOnStage[actualShapeID].x + ' | shapeArray[actualShapeID].offsetX: ' + shapeArray[actualShapeID].offsetX);
		console.log('shapeOnStage[actualShapeID].y: ' + shapeOnStage[actualShapeID].y + ' | shapeArray[actualShapeID].offsetY: ' + shapeArray[actualShapeID].offsetY);
		
		reDrawShapes();
	}
}

function stopMoveShape(){
	if(MODE == SELECT && SHAPE_IS_MOVE){
		SHAPE_IS_MOVE = false;
		
		shapeArray[actualShapeID].offsetX += offsetX;
		shapeArray[actualShapeID].offsetY += offsetY;
		console.log('shapeArray[actualShapeID].offsetX: ' + shapeArray[actualShapeID].offsetX + 'shapeArray[actualShapeID].offsetY: ' + shapeArray[actualShapeID].offsetY);
	}
}

function drawCurrentShape(stageX, stageY){
	reDrawShapes();
	
	ctx.beginPath();
	for(var i = 0; i < pointArray.length; i++){
		if(i == 0) ctx.moveTo(pointArray[0].x, pointArray[0].y);
		else{
			ctx.lineTo(pointArray[i].x, pointArray[i].y);
		}
	}
	ctx.lineTo(stageX, stageY);
	ctx.strokeStyle = '#000';
	ctx.stroke();
	ctx.closePath();
}
