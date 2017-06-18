var EventEmitter = require("events").EventEmitter

var life = new EventEmitter()

life.on("hafhu",function(who) {
	console.log("gei"+ who + "daoshui")
	// body...
})
life.emit("hafhu","hanzi")