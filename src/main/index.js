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


const urlbase = localStorage.getItem("BaseURL")
if(urlbase == null){
  localStorage.setItem("BaseURL", "{}")
}

let old = JSON.parse(localStorage.getItem("BaseURL"))

if(old.otakudesu == undefined){
    old["otakudesu"] = ""
  }
  if(old.komikcast == undefined){
    old["komikcast"] = ""
  }
    
if(old.otakudesu == ""){
    alert("Web Domain Otakudesu Tidak Ditemukan!")
}
if(old.komikcast == ""){
    alert("Web Domain Komikcast Tidak Ditemukan!")
}

const electron = require("electron")
const ipc = electron.ipcRenderer

//rpc getter
if(!localStorage.getItem("rpc")){
  localStorage.setItem("rpc",false)
}

if(localStorage.getItem("rpc") == "true"){
  ipc.send("rpctrue")
}
ipc.send("mainmenu")


function openlinks(){
  const electron = require("electron")
  const ipc = electron.ipcRenderer
  
  ipc.send("openwin")
}

