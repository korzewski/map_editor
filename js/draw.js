
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
		if(i == 0) shapeOnStage[currentShape].graphics.beginFill('rgba(0, 0, 0, 0.1)').beginStroke('#000').moveTo(shapeArray[currentShape][0].x, shapeArray[currentShape][0].y);
		else{
			shapeOnStage[currentShape].graphics.lineTo(shapeArray[currentShape][i].x, shapeArray[currentShape][i].y);
		}
	}
	shapeOnStage[currentShape].alpha = 0.3;
	shapeOnStage[currentShape].id = currentShape;
		
	// action
	shapeOnStage[currentShape].onPress = startMoveShape;
	console.log('currentShape: ' + currentShape);
	
	stage.addChild(shapeOnStage[currentShape]);	
}

var startX, startY, offsetX, offsetY;
var SHAPE_IS_MOVE = false;
var actualShapeID;

function setActiveShape(){	
	shapeOnStage[actualShapeID].alpha = 1;
	reDrawShapes();
}
function unsetActiveShape(){	
	shapeOnStage[actualShapeID].alpha = 0.3;
	reDrawShapes();
}

function startMoveShape(e){
	if(MODE == SELECT){
		SHAPE_IS_MOVE = true;
		
		actualShapeID = e.target.id;		
		startX = e.stageX;
		startY = e.stageY;
		
		setActiveShape();
	}
}

function moveShape(stageX, stageY){
	if(SHAPE_IS_MOVE){		
		offsetX = stageX - startX;
		offsetY = stageY - startY;
		shapeOnStage[actualShapeID].x = shapeArray[actualShapeID][0].offsetX + offsetX;
		shapeOnStage[actualShapeID].y = shapeArray[actualShapeID][0].offsetY + offsetY;
		
		reDrawShapes();
	}
}

function stopMoveShape(){
	if(MODE == SELECT && SHAPE_IS_MOVE){
		SHAPE_IS_MOVE = false;
		
		shapeArray[actualShapeID][0].offsetX += offsetX;
		shapeArray[actualShapeID][0].offsetY += offsetY;
		
		unsetActiveShape();
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
