// MODE TYPE
var SHAPE = 'shape';
var CIRCLE = 'circle';
var RECTANGLE = 'rectangle';
var IMAGE = 'image';

var CREATING_SHAPE = false;

var screenWidth, screenHeight;
var mapWidth = 2000; // still have to be setup in canvas tag width
var mapHeight = 1000;// still have to be setup in canvas tag height
var MODE = SHAPE;

var stage;
var pointArray = new Array;
var shapeArray = new Array;

$(document).ready(function(){
	screenWidth = $('#screen').width();
	screenHeight = $('#screen').height();
	
	ctx = $('#map')[0].getContext('2d');
	stage = new createjs.Stage(document.getElementById('map'));
	
	stage.onMouseDown = function(e){
		if(MODE == SHAPE){
			var point = {x: e.stageX, y: e.stageY};
			addPoint(point);
		}
	};
	stage.onMouseMove = function(e){
		if(CREATING_SHAPE){
			reDrawShapes();
			drawCurrentShape(); // draw pointArray
			
			ctx.beginPath();
			ctx.moveTo(pointArray[pointArray.length - 1].x, pointArray[pointArray.length - 1].y);
			ctx.lineTo(e.stageX, e.stageY);
			ctx.strokeStyle = '#000';
			ctx.stroke();
			ctx.closePath();
		}
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
});

function changeMode(newMode){
	MODE = newMode;
	CREATING_SHAPE = false;
	
	console.log('actual mode: ' + MODE);
	pointArray = new Array();
	reDrawShapes();
}

function save(){
	var json = JSON.stringify(shapeArray);
	console.log('json: ' + json);

	localStorage.setItem('map', json);
}
function load(){
	var load;
	load = localStorage.getItem('map');
	alert(load);
}

function createShape(){
	CREATING_SHAPE = false;
	
	if(pointArray.length > 2){
		pointArray.push({x: pointArray[0].x, y: pointArray[0].y});
		shapeArray.push(pointArray);
		
		pointArray = new Array; // clear pointArray[]
		
	} else {
		alert('you need minimum 3 points to create a shape');
		pointArray = new Array; // clear pointArray[]
	}
	
	reDrawShapes();
	addShapeToStage();
}

function addPoint(newPoint){
	CREATING_SHAPE = true;
	
	var newX = newPoint.x;
	var newY = newPoint.y;
	pointArray.push({x: newX, y: newY});
	
	console.log(pointArray.length);
}
