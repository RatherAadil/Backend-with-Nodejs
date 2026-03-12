const os = require("os");
// Get logical core count
console.log(os.availableParallelism());  