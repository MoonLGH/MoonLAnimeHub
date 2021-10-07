const date = new Date()
const hour = date.getHours()
const welcomer = document.getElementById("Welcomer")
if (hour < 12) {
  welcomer.innerHTML = "Good Morning"
}
if (hour >= 12 && hour < 18) {
  welcomer.innerHTML = "Good Afternoon"
}
if (hour >= 18) {
  welcomer.innerHTML = "Good Night"
}

if(!localStorage.getItem("BaseURL")){
  localStorage.setItem("BaseURL","{}")
}

let old = JSON.parse(localStorage.getItem("BaseURL"))


let keyod = document.getElementById("keywordOD")
if(old && old.otakudesu){
  keyod.setAttribute("placeholder", old.otakudesu.replace("https://", ""))  
}
let keykc = document.getElementById("keywordKC")
if(old && old.komikcast){
  keykc.setAttribute("placeholder", old.komikcast.replace("https://", ""))  
}
let keymd = document.getElementById("keywordMD")
if(old && old.mangadex){
  keymd.setAttribute("placeholder", old.mangadex.replace("https://", ""))
}

//od submit
let subod = document.getElementById("subOD")

subod.addEventListener("click", (e) => {
  console.log(keyod.value)
  if (keyod.value !== "") {
    change("otakudesu", keyod.value)
  }
})

keyod.addEventListener("keypress", (e) => {
  if (e.key == "/") {
    e.preventDefault()
  } else if (e.key == "Enter") {
    if (keyod.value !== "") {
      change("otakudesu", keyod.value)
    }
  } else {
    // console.log(e)
  }
})


//kc submit
let subkc = document.getElementById("subKC")

subkc.addEventListener("click", (e) => {
  console.log(keykc.value)
  if (keykc.value !== "") {
    change("komikcast", keykc.value)
  }
})

keykc.addEventListener("keypress", (e) => {
  if (e.key == "/") {
    e.preventDefault()
  } else if (e.key == "Enter") {
    if (keykc.value !== "") {
      change("komikcast", keykc.value)
    }
  } else {
    // console.log(e)
  }
})


//md submit
let submd = document.getElementById("subMD")

submd.addEventListener("click", (e) => {
  console.log(keymd.value)
  if (keymd.value !== "") {
    change("mangadex", keymd.value)
  }
})

keymd.addEventListener("keypress", (e) => {
  if (e.key == "/") {
    e.preventDefault()
  } else if (e.key == "Enter") {
    if (keymd.value !== "") {
      change("mangadex", keymd.value)
    }
  } else {
    // console.log(e)
  }
})

const axios = require("axios")
async function getonline(){
  console.log("okay")
  const res = await axios.get("https://moonlgh.github.io/MAHRestAPI/MoonLAnimeHub/domain.json")

  const json = await res.data
  console.log(json)
  change("mangadex",json.mangadex.replace("https://",""))
  change("otakudesu",json.otakudesu.replace("https://",""))
  change("komikcast",json.komikcast.replace("https://",""))
  window.location.reload()
}


function change(name, input) {
  old[name] = "https://" + input
  localStorage.setItem("BaseURL", JSON.stringify(old))
}