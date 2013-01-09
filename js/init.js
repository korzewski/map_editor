
// MODE TYPE
var SELECT = 'select';
var SHAPE = 'shape';
var CIRCLE = 'circle';
var RECTANGLE = 'rectangle';
var IMAGE = 'image';

var MODE = SHAPE;


var CREATING_SHAPE = false;

// ---------------------------------------------------------- MAP SETTINGS ---------------------------------------------------- //
var screenWidth, screenHeight;
var mapWidth = 2000;
var mapHeight = 1000;
// ---------------------------------------------------------- MAP SETTINGS ---------------------------------------------------- //

var stage;
var pointArray = new Array;
var shapeArray = new Array;

$(document).ready(function(){
	screenWidth = $('#screen').width();
	screenHeight = $('#screen').height();
	
	$('#screen').append('<canvas id="map" width="'+ mapWidth +'" height="'+ mapHeight +'"></canvas>');
	
	ctx = $('#map')[0].getContext('2d');
	stage = new createjs.Stage(document.getElementById('map'));
	
	stage.onMouseDown = function(e){
		if(MODE == SHAPE){
			var point = {x: e.stageX, y: e.stageY};
			addPoint(point);
		}
	};
	stage.onMouseUp = function(){
		stopMoveShape();
	};
	stage.onMouseMove = function(e){
		if(CREATING_SHAPE){
			drawCurrentShape(e.stageX, e.stageY); // draw pointArray
		}
		
		moveShape(e.stageX, e.stageY);
		setScreenPosition(e.stageX, e.stageY);
	};
	
	reDrawShapes();
	
	
	$('#screen').mouseout(function(){
		$(this).stop();
	});
	
	// ---------------------------------------------------------- DEBUG ---------------------------------------------------- //
	$('#map').click(function(){
		if(MODE == SHAPE){
			//console.log('mode: shape');
		} else if(MODE == CIRCLE){
			console.log('mode: circle');
		} else if(MODE == RECTANGLE){
			console.log('mode: rectangle');
		} else if(MODE == IMAGE){
			console.log('mode: image');
		} else if(MODE == SELECT){
			//console.log('mode: select');
		} else{
			console.log('mode: unknow');
		}
	});
	// ---------------------------------------------------------- DEBUG ---------------------------------------------------- //
	
	// menu --------------------------------------------------------
	$('#save').click(function(){
		save();
	});
	$('#load').click(function(){
		load();
	});
	$('.option').click(function(){
		if(!$(this).hasClass('active')){
			$('#menu .option').removeClass('active');
			$(this).addClass('active');
			changeMode($(this).attr('id'));
		}
	});
	// menu --------------------------------------------------------
	
	//createjs.Ticker.addListener(window);
	//createjs.Ticker.setFPS(30);
});

function setMenuOption(newMode){
	if(MODE != newMode){
		$('#menu .option').removeClass('active');
		$('#' + newMode).addClass('active');
		changeMode(newMode);
	}
}

/*
function tick(){
	console.log('tick, ');
	stage.update();
}
*/

function changeMode(newMode){
	MODE = newMode;
	CREATING_SHAPE = false;
	
	console.log('actual mode: ' + MODE);
	pointArray = new Array();
	reDrawShapes();
}

function save(){
	if(shapeArray.length > 0){
		shapeArray[0][0].mapWidth = mapWidth;
		shapeArray[0][0].mapHeight = mapHeight;
		
		var json = JSON.stringify(shapeArray);
		localStorage.setItem('map', json);
		
		console.log('json: ' + json);
	}
}
function load(){
	var load = localStorage.getItem('map');
	
	alert(load);
}

function createShape(){
	CREATING_SHAPE = false;
	
	if(pointArray.length > 2){
		pointArray.push({x: pointArray[0].x, y: pointArray[0].y});
		shapeArray.push(pointArray);
		
		shapeArray[shapeArray.length - 1][0].offsetX = 0;
		shapeArray[shapeArray.length - 1][0].offsetY = 0;
		/*
		shapeArray[shapeArray.length - 1][0].mapWidth = mapWidth;
		shapeArray[shapeArray.length - 1][0].mapHeight = mapHeight;
		*/
		
		addShapeToStage(); // beta ----------------------------------------------------------------------
		
		pointArray = new Array; // clear pointArray[]
		
	} else {
		alert('you need minimum 3 points to create a shape');
		pointArray = new Array; // clear pointArray[]
	}
	
	reDrawShapes();
}

function addPoint(newPoint){
	CREATING_SHAPE = true;
	
	var newX = parseInt(newPoint.x);
	var newY = parseInt(newPoint.y);
	pointArray.push({x: newX, y: newY});
	
	console.log(pointArray.length);
}
