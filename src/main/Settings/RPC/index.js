const date = new Date()
const hour = date.getHours()
const welcomer = document.getElementById("Welcomer")
if(hour < 12){
    welcomer.innerHTML = "Good Morning"
}
if(hour >= 12 && hour < 18){
    welcomer.innerHTML = "Good Afternoon"
}
if(hour >= 18){
    welcomer.innerHTML = "Good Night"
}
if(!localStorage.getItem("rpc")){
    localStorage.setItem("rpc",false)
    console.log("false lmao")
}

console.log(localStorage.getItem("rpc"))

if(localStorage.getItem("rpc") == "false"){
    console.log("false ngab")
    document.getElementById("RPCSTATUS").checked = false
}else if(localStorage.getItem("rpc") == "true"){
    console.log("true ngab")
    document.getElementById("RPCSTATUS").checked = true
}

const electron = require("electron")
const ipc = electron.ipcRenderer
function send(param){
    console.log(param)
    localStorage.setItem("rpc",param)
}
function restart(){
    ipc.send("restart")
}