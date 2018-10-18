const fs = require('fs');
const data = fs.readFileSync('FILE.json');
const files = JSON.parse(data);

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));

const multerConfig = {
    
storage: multer.diskStorage({

 destination: function(req, file, next){
   next(null, './public/photo-storage');
   },   
    
    filename: function(req, file, next){
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        next(null, file.fieldname + '-' + Date.now() + '.'+ext);

        	var i=0;

        	while(files[i]){
        		i+=1;
        	}
        	files[i] = file.fieldname + '-' + Date.now() + '.'+ext;

    		let data = JSON.stringify(files, null, 2);

    		fs.writeFile('FILE.json', data, finished);

    		function finished (err) {
      		console.log('all set.');
     		}


      }
    }),   
    
    fileFilter: function(req, file, next){
          if(!file){
            next();
          }
        const image = file.mimetype.startsWith('image/');
        if(image){
          console.log('photo uploaded');
          next(null, true);
        }else{
          console.log("file not supported");
          return next();
        }
    }
  };

app.get('/', function(req, res){
	res.render('index.html');
});

app.post('/upload',multer(multerConfig).single('foto'),function(req,res){
   res.send('Complete!');
});

app.get("/all",(request,response)=> response.send(files));

app.listen(port,function(){
    console.log(`Server listening on port ${port}`);
});
