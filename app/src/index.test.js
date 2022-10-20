const { convert } = require("./utils/converter");

// quick test for the converter function
const url = "https://www.youtube.com/watch?v=TMw9UNXVDG0";

convert(url, {
  filename: String(Math.random() * 10 ** 3),
  fileprefix: "",
}).then((proc) => {
  proc.on("progress", (progress) => {
    console.log(progress);
  });
});
