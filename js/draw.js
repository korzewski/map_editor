
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
			if(i == 0) ctx.moveTo(shapeArray[j][0].x, shapeArray[j][0].y);
			else{
				ctx.lineTo(shapeArray[j][i].x, shapeArray[j][i].y);
			}
		}
		ctx.strokeStyle = '#f00';
		ctx.stroke();
		ctx.closePath();
	}
}

function addShapeToStage(){
	for(var j = 0; j < shapeArray.length; j++){
		shapeOnStage[j] = new createjs.Shape();
		for(var i = 0; i < shapeArray[j].length; i++){
			if(i == 0) shapeOnStage[j].graphics.beginFill('#ffa200').moveTo(shapeArray[j][0].x, shapeArray[j][0].y);
			else{
				shapeOnStage[j].graphics.lineTo(shapeArray[j][i].x, shapeArray[j][i].y);
			}
		}
		stage.addChild(shapeOnStage[j]);
		stage.update();
		
		shapeOnStage[j].id = j;
		shapeOnStage[j].onClick = shapeClickHandle;
	}
}

function shapeClickHandle(e){
	console.log('click on shape: ' + e.target.id);
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
