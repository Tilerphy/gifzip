
## Sample:

```
var util = require("./index");
util.unpack("./some.gif", 160, 120, (folder,w,h)=>{ //select a gif to unpack
                        //after unpacked.
                        //pack the gif back with frame: 60 and the origin width/height.
                        //write the gif to any stream: express response or fs.createWriteStream(filename)
                        util.packStream(folder, anyStream, 60, w,h);
                        //delete the temp folder used by unpacking
                        exec("rm -rf "+__dirname+"/"+folder);
                });
```
