var gifencoder = require("gifencoder");
var exec = require('child_process').exec;
var gm = require("gm");
var fs = require("fs");
var all = 0;
var canvas  = require("canvas");
var image = canvas.Image;
var gf = require("gif-frames");
var uuid=require("uuid");
function X2(filename,w=160,h=120,s=0, callback=null){
	var foldername = uuid();
	gf({url:filename, frames:"all",  outputType: 'jpeg', cumulative: true}).then((data)=>{
		var counter = 0;
		fs.mkdirSync(__dirname+"/"+foldername);
		var ps = [];
		for(var d of data){
			console.log(counter);
			if(counter%s!=0){
				counter++;
				continue;
			}
			var p = new Promise((resolve,reject)=>{
				var stream = fs.createWriteStream(__dirname+"/"+foldername+"/"+counter+".jpg");
				stream.on("finish",()=>{
					resolve();
				});
				gm(d.getImage())
                        	.resize(w,h)
				.compress("JPEG")
                        	.stream()
                        	.pipe(stream);
			});
			ps[ps.length]=p;
			counter++;
			
		}
		Promise.all(ps).then(()=>{
			console.log("completed.");
			var img = new image();
                	img.src = fs.readFileSync(foldername+"/1.jpg");
			callback(foldername,img.width,img.height);
		});
		
	});
}
function fileSorter(a,b){
	return parseInt(a)-parseInt(b);
}
function F2(folder,outStream,frame,w,h){
	var en = new gifencoder(w,h);
        en.createReadStream().pipe(outStream);
        en.start();
        en.setRepeat(0);
        en.setDelay(1000/frame);
        en.setQuality(10);
        var files = fs.readdirSync(folder);
        files.sort(fileSorter);
        for(var file of files){
                console.log(file);
                var img = new image();
                img.src = fs.readFileSync(folder+"/"+file);
                var c = new canvas(img.width,img.height);
                var ctx = c.getContext("2d");
                ctx.drawImage(img,0,0,img.width,img.height);
                en.addFrame(ctx);
        }
        en.finish();
}
function F(folder,resultfile,frame,w,h){
	F2(folder,fs.createWriteStream(resultfile),frame,w,h);
}

module.exports.unpack = X2;
module.exports.packFile = F;
module.exports.packStream = F2;
//X2(process.argv[2],parseInt(process.argv[4]),parseInt(process.argv[5]), function(folder, w, h){
//	F(folder, __dirname+"/"+folder+".gif",parseInt(process.argv[3]),w,h);
//	exec("rm -rf "+__dirname+"/"+folder);
//});
