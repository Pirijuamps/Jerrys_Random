function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 

	console.log("work");
	loadJSON("/all", function(response) {
  
        const files = JSON.parse(response);
        console.log(files[0]); 
    });





var canvas = document.getElementById('imagenes');
var context = canvas.getContext("2d");

var imagenesArr = new Array();
imagenesArr[0] = './photo-storage/foto-1539797044371.jpeg';


function imagen(){
	foto = new Image();
	foto.src=
	foto.onload = function(){
    context.drawImage(foto,0,0,500,600);
    }
}