
## Sample:

```
//you can also npm install gifzip and  then require("gifzip")
var util = require("./index");

//select a gif to unpack, the first argument could be filename or url
//change the size to 160*120 and select 1 frame from 2 frames (skip one frame)
util.unpack("./some.gif", 160, 120, 2, (folder,w,h)=>{ 
                        //after unpacked.
                        //pack the gif back with frame: 60 and the origin width/height.
                        //write the gif to any stream: express response or fs.createWriteStream(filename)
                        util.packStream(folder, anyStream, 60, w,h);
                        //delete the temp folder used by unpacking
                        exec("rm -rf "+__dirname+"/"+folder);
                });
```

