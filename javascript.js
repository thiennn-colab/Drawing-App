$(document).ready(function(){
	
	
//declare variables
	//painting_erasing or not
	var paint = false; 
	
	//painting or erasing
	var paint_erase = "paint"; 
	
	//get the canvas and context
	var canvas = document.getElementById("paint"); 
	var context = canvas.getContext("2d");
	
	//get the canvas container
	var container = $("#container");
	
	//mouse position
	var mouse = {x: 0, y: 0};
	
	
	//set drawing parameters (linewidth, lineJoin, lineCap)
	context.lineWidth = 3;
	context.lineCap = "round";
	context.lineJoin = "round";
	
	//click inside the container
	container.mousedown(function(e){
		paint = true;
		context.beginPath();
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		context.moveTo(mouse.x,mouse.y);
	});
	
	//move the mouse while holding mouse key
	container.mousemove(function(e){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		if(paint == true){
			if(paint_erase == "paint"){
				//get color input
				context.strokeStyle = $("#paintColor").val();
			}
			else{
				//white color
				context.strokeStyle = "white";
			}
			context.lineTo(mouse.x, mouse.y);
			context.stroke();
		}
	});
	
	//mouseup -> we are not painting anymore
	container.mouseup(function(){
		paint = false;
	});
	//if we leave the container we are not painting anymore
	container.mouseleave(function(){
		paint = false;
	});
	
	
	
	//click on the erase button
	$("#erase").click(function(){
		if(paint_erase == "paint"){
			paint_erase = "erase";
		}
		else{
			paint_erase = "paint";
		}
		$(this).toggleClass("eraseMode");
	});
	
	//click on reset button
	$("#reset").click(function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		paint_erase = "paint";
		$("#erase").removeClass("eraseMode");
	});
	
	//click on save button
	$("#save").click(function(){
		if(typeof(localStorage) != null){
			localStorage.setItem("imgCanvas", canvas.toDataURL());
		
		}else{
			window.alert("Your browser does not support local Storage!");
		}
	});
	
	
	//onload load save work from local storage
	if(localStorage.getItem("imgCanvas") != null){
		var img = new Image();
		img.onload = function(){
			context.drawImage(img, 0, 0);
		};
		img.src = localStorage.getItem("imgCanvas");
	}
	
	//change linewidth using slider
	$("#slider").slider({
		min: 3,
		max: 30,
		slide: function(event, ui){
			$("#circle").css("height",ui.value);
			$("#circle").css("width",ui.value);
			context.lineWidth = ui.value;
		}
	});
	
	//change color input
	$("#paintColor").change(function(){
		$("#circle").css("background", $(this).val());
	})
});