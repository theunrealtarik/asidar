const bytenode = require("bytenode");
const fs = require("fs");
const v8 = require("v8");

v8.setFlagsFromString("--no-lazy");

let out = "./public/app.jsc";
let src = "./app/dist/app.min.js";

bytenode.compileFile(src, out).then(() => {
  console.log("- file compiled: " + src);
});

require(out);
