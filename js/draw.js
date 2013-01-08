
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

function clearStage(){
	ctx.clearRect(0, 0, mapWidth, mapHeight);
}

function reDrawShapes(){
	clearStage();
	drawMargins();
	for(var j = 0; j < shapeArray.length; j++){
		ctx.beginPath();
		for(var i = 0; i < shapeArray[j].length; i++){
			if(i == 0) ctx.moveTo(shapeArray[j][0].x + shapeArray[j].offsetX, shapeArray[j][0].y + shapeArray[j].offsetY);
			else{
				ctx.lineTo(shapeArray[j][i].x + shapeArray[j].offsetX, shapeArray[j][i].y + shapeArray[j].offsetY);
			}
		}
		ctx.strokeStyle = '#f00';
		ctx.stroke();
		ctx.closePath();
	}
}

/*
function addShapeToStage(){
	for(var j = 0; j < shapeArray.length; j++){
		shapeOnStage[j] = new createjs.Shape();
		for(var i = 0; i < shapeArray[j].length; i++){
			if(i == 0) shapeOnStage[j].graphics.beginFill('#ffa200').moveTo(shapeArray[j][0].x, shapeArray[j][0].y);
			else{
				shapeOnStage[j].graphics.lineTo(shapeArray[j][i].x, shapeArray[j][i].y);
			}
		}
		
		shapeOnStage[j].id = j;
		shapeOnStage[j].onPress = startMoveShape;
		
		stage.addChild(shapeOnStage[j]);
		
		stage.update();
	}
}
*/


function addShapeToStage(){
		
		shapeOnStage.push(new createjs.Shape());
		var currentShape = shapeOnStage.length - 1;
		
		console.log('currentShape: ' + currentShape);
		
		for(var i = 0; i < shapeArray[currentShape].length; i++){
			if(i == 0) shapeOnStage[currentShape].graphics.beginFill('#ffa200').moveTo(shapeArray[currentShape][0].x + shapeOnStage[currentShape].x, shapeArray[currentShape][0].y);
			else{
				shapeOnStage[currentShape].graphics.lineTo(shapeArray[currentShape][i].x, shapeArray[currentShape][i].y);
			}
		}
		
		shapeOnStage[currentShape].id = currentShape;
		shapeOnStage[currentShape].onPress = startMoveShape;
		
		stage.addChild(shapeOnStage[currentShape]);
		
		stage.update();
	
}

/*
function reDrawShapeToStage(){
	for(var j = 0; j < shapeArray.length; j++){
		for(var i = 0; i < shapeArray[j].length; i++){
			if(i == 0) shapeOnStage[j].graphics.beginFill('#ffa200').moveTo(shapeArray[j][0].x + shapeArray[j].offsetX, shapeArray[j][0].y + shapeArray[j].offsetY);
			else{
				shapeOnStage[j].graphics.lineTo(shapeArray[j][i].x + shapeArray[j].offsetX, shapeArray[j][i].y + shapeArray[j].offsetY);
			}
		}
				
		stage.update();
	}
}
*/



var startX, startY, offsetX, offsetY;
var MOUSE_MOVE = false;
var actualShapeID;

function startMoveShape(e){
	MOUSE_MOVE = true;
	actualShapeID = e.target.id;
	console.log('actualShapeID: '+ actualShapeID);
	
	startX = e.stageX;
	startY = e.stageY;
	console.log('x: ' + shapeOnStage[actualShapeID].x + ' y: ' + shapeOnStage[actualShapeID].y);
	console.log('offsetX: ' + shapeArray[actualShapeID].offsetX + ' offsetY: ' + shapeArray[actualShapeID].offsetY);
}

function moveShape(stageX, stageY){
	if(MOUSE_MOVE){
		var currentX = stageX;
		var currentY = stageY;
		
		offsetX = currentX - startX;
		offsetY = currentY - startY;
		
		
		shapeArray[actualShapeID].offsetX = offsetX;
		shapeArray[actualShapeID].offsetY = offsetY;
		
		shapeOnStage[actualShapeID].x = offsetX;
		shapeOnStage[actualShapeID].y = offsetY;
		
		//clearStage();
		stage.update();
	}
}

function stopMoveShape(){
	MOUSE_MOVE = false;
	console.log('offsetX: ' + offsetX + ' offsetY: ' + offsetY);
}

function drawCurrentShape(){
	ctx.beginPath();
	for(var i = 0; i < pointArray.length; i++){
		if(i == 0) ctx.moveTo(pointArray[0].x, pointArray[0].y);
		else{
			ctx.lineTo(pointArray[i].x, pointArray[i].y);
		}
	}
	ctx.strokeStyle = '#000';
	ctx.stroke();
	ctx.closePath();
}
