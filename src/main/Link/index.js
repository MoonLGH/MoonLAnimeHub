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
const axios = require("axios")
const cheerio = require("cheerio");
async function convert() {
  const url = document.getElementById("Link").value.split("\n")
  let urllist = []
  url.forEach(async(url) => {
    if (url.includes("zippyshare")) {
      const urls = await zippy(url)
      
      urllist.push(urls.url)
      gettolist(urllist)
    } else if (url.includes("desudrive.com")) {
      let urls = await drive(url)

      urllist.push(urls.url)
      gettolist(urllist)
    } else {  
      document.getElementById("Output").innerText = "The Only Supported Link Is Zippyshare.com And Desudrive.com"

      if (document.getElementById("copi").hasAttribute("disabled") === false) {
        document.getElementById("copi").setAttribute("disabled", "disabled")
      }

    }
  })

}

async function gettolist(urlarr){
  let now = document.getElementById("Output").value
  urlarr.forEach(url=>{
    document.getElementById("Output").value = now + url + "\n"
    document.getElementById("copi").removeAttribute("disabled")
  })
}
async function drive(url) {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)

  let dlurl = $("#uc-download-link").attr("href")
  console.log(dlurl)
  let baseurl = res.request.responseURL.split("/")[2]
  console.log(baseurl)
  finaldlurl = "https://" + baseurl + dlurl
  return {
    url: finaldlurl
  }
}
async function zippy(url) {
  const zippy = await axios.get(url)
  let _math = require('mathjs');
  let _url = require('url')

  let $ = cheerio.load(zippy.data)

  const urls = _url.parse($('.flagen').attr('href'), true)
  const urlori = _url.parse(url)
  const key = urls.query['key']

  try {
    time = /var b = ([0-9]+);$/gm.exec($('#dlbutton').next().html())[1]
    dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (2 + 2 * 2 + parseInt(time)) + '3/DOWNLOAD'
  } catch (error) {
    time = _math.evaluate(/ \+ \((.*)\) \+ /gm.exec($('#dlbutton').next().html())[1])
    dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (time) + '/DOWNLOAD'
  }
  return {
    url: dlurl
  }
}

async function copy() {
  let output = document.getElementById("Output")
  const textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  textarea.value = output.value;
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function openlinks(){
  const electron = require("electron")
  const ipc = electron.ipcRenderer
  
  ipc.send("openwin")
}
