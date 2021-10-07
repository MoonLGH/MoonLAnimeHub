const url = localStorage.getItem("url")

const cheerio = require("cheerio")
const axios = require("axios")
let nextprev = []
let $ = require('jquery');
const {
  ipcRenderer
} = require("electron");

let img = []
let index = 1
async function load() {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  // Image
  $("#chapter_body > div.main-reading-area").find("img").each(function () {
    image = $(this).attr("src")
    img.push({
      image,
      index
    })
    index++
  })

  $("#chapter_body > div.chapter_nav-control").eq(0).find("div.right-control > div.nextprev > a").each(function () {
    let text = $(this).text()
    let link = $(this).attr("href")
    let rel = $(this).attr("rel")
    nextprev.push({
      text,
      link,
      rel
    })
  })
  console.log(nextprev)

  let select = $("#slch").text()
  // let selectid =  $("#content > div > div > div > article > div.maincontent > div.navig").find("select").attr("id")
  let opt = []
  let selid = $("#slch").attr("id")
  let selname = $("#slch").attr("name")
  $("#slch").eq(0).find("option").each(function () {
    let selected = false
    let chapter = $(this).text()
    let link = $(this).attr("value")
    if ($(this).attr("selected")) {
      selected = true
    }
    opt.push({
      chapter,
      link,
      selected
    })
  })


  console.log(opt)

  //select

  let selectdiv = document.createElement("select")
  selectdiv.innerText = select
  selectdiv.setAttribute("name", selname)
  selectdiv.setAttribute("id", selid)
  selectdiv.onchange = function () {
    openchapter(this.options[this.selectedIndex].value)
  }

  let bottomsel = document.createElement("select")
  bottomsel.innerText = select
  bottomsel.setAttribute("name", selname)
  bottomsel.setAttribute("id", selid)
  bottomsel.onchange = function () {
    openchapter(this.options[this.selectedIndex].value)
  }
  opt.forEach(opt => {
    let option = document.createElement("option")
    option.innerText = opt.chapter
    option.setAttribute("value", opt.link)
    if (opt.selected == true) option.setAttribute("selected", "selected")
    selectdiv.appendChild(option)

    let bottomoption = document.createElement("option")
    bottomoption.innerText = opt.chapter
    bottomoption.setAttribute("value", opt.link)
    if (opt.selected == true) bottomoption.setAttribute("selected", "selected")
    bottomsel.appendChild(bottomoption)

  })
  document.getElementById("nextprev").appendChild(selectdiv)
  document.getElementById("bottom").appendChild(bottomsel)


  // document.createElement("")

  //select end



  img.forEach(img => {
    let image = document.createElement("img")
    image.src = img.image
    image.style.width = "725"
    image.style.height = "1024"
    image.setAttribute("class", "alignnone size-full wp-image-72251")
    image.setAttribute("id", img.index)



    let divimg = document.getElementById("readerarea")
    divimg.appendChild(image)
  })

  nextprev.forEach(but => {
    let a = document.createElement("a")
    a.text = but.text
    a.setAttribute("rel", but.rel)
    a.setAttribute("class", "nextprevious")
    a.setAttribute("linkvalue", but.link)
    a.onclick = function () {
      openchapter(but.link)
    }

    let bottoma = document.createElement("a")
    bottoma.text = but.text
    bottoma.setAttribute("rel", but.rel)
    bottoma.onclick = function () {
      openchapter(but.link)
    }

    document.getElementById("nextprev").appendChild(a)
    document.getElementById("bottom").appendChild(bottoma)

  })

  let chapters = $("#content > div > div > div.chapter_headpost > h1").text()

  document.getElementById("Welcomer").innerText = chapters
  ipcRenderer.send("kcchapter", {
    chapters
  })

  // let name = $("#content > div > div > div > article > div.headpost > div > a").text()

  document.getElementById("title").innerText = chapters
  let menutext = $("#content > div > div > div.chapter_headpost > div > a").text()
  let menulink = $("#content > div > div > div.chapter_headpost > div > a").attr("href")
  document.getElementById("menu").innerHTML = `Kembali Ke <a class="link" onclick="openkomik('${menulink}')">${menutext}</a>`

}
load()

function openchapter(url) {
  localStorage.setItem("url", url)
  console.log(url)
  window.location.href = "./index.html"
}
async function openkomik(url) {
  console.log(url)
  localStorage.setItem("url", url)
  window.location.href = "../komik/index.html"
}

let indexes = 1
document.onkeydown = function (e) {
  e = e || window.event;
  if (e.keyCode == '37') {
    if(indexes <= 1)return
    imagess = document.getElementById(indexes - 1)
    indexes -= 1
    imagess.scrollIntoView(true);
  } else if (e.keyCode == '39') {
    if(indexes >= img.length){
      if($('a.nextprevious[rel=next]').attr("linkvalue") !== undefined){
        return openchapter($('a.nextprevious[rel=next]').attr("linkvalue"))
      }else{
        return
      }
    }
    imagess = document.getElementById(indexes + 1)
    indexes += 1
    imagess.scrollIntoView(true);
  }
}