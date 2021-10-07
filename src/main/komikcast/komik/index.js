const url = localStorage.getItem("url")

const cheerio = require("cheerio")
const axios = require("axios")
const { ipcRenderer } = require("electron")

async function load() {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  let komikinfo = []

  let title = $("#content > div > div > div").eq(0).find("div.komik_info-content > div.komik_info-content-body > h1").text().replace("Bahasa Indonesia", "")
  let alter = $("#content > div > div > div").eq(0).find("div.komik_info-content > div.komik_info-content-body > span.komik_info-content-native").text()
  console.log(title)
  console.log(alter)

  document.getElementById("title").innerText = title
  ipcRenderer.send("kckomik",{title})
  document.getElementById("Welcomer").innerText = title
  document.getElementById("alter").style.textAlign = "left";
  document.getElementById("alter").style.marginLeft = "25%";
  document.getElementById("alter").style.color = "#999";
  document.getElementById("alter").innerText = alter;


  let thumb = $("#content > div > div > div").eq(0).find("div.komik_info-content > div.komik_info-content-thumbnail > img").attr("src")

  const thumbs = document.createElement("div")
  thumbs.classList.add("thumb")
  thumbs.style.top = "-150px"
  thumbs.style.left = "-124px"
  thumbs.style.width = "240px"
  thumbs.style.height = "340px"

  // position: absolute;
  // top: -150px;
  // left: -125px;
  // width: 240px;
  // height: 340px;
  document.getElementById("img").appendChild(thumbs)

  const img = document.createElement("img")
  img.src = thumb
  thumbs.appendChild(img)
  let rating = $("#content > div > div > div").eq(0).find("div.komik_info-content > div.komik_info-content-rating > div.komik_info-content-rating-bungkus > div.data-rating > strong").text()

  const ret = document.getElementById("ret")
  ret.innerHTML = `<span class="fa fa-star" style="left: -5px;position: relative;"></span> ${rating}`
  ret.style.color = "#111"
  ret.style.fontSize = "20px"

  $("#content > div > div > div").eq(0).find("div.komik_info-content > div.komik_info-content-body > div.komik_info-content-meta > span").each(function () {
    const type = $(this).find("b").text()
    const things = $(this).text().replace(type, "")
    if ($(this).attr("class") == undefined) {
      classes = false
    } else {
      classes = $(this).attr("class")
    }


    console.log(type)
    console.log(things)
    komikinfo.push({
      type,
      things,
      classes,
      thumb
    })
  })

  {
    /* <div data-id="52973" class="bookmark"><span class="dashicons dashicons-heart"></span> Bookmark</div> */ }
  const bookmark = document.createElement("div")
  bookmark.classList.add("bookmark")
  bookmark.innerHTML = `<span class="fa fa-heart" style="left: -5px;position: relative;"></span> Bookmark`
  bookmark.onclick = function () {
    setbookmark()
  }
  document.getElementById("rt").appendChild(bookmark)



  console.log(komikinfo)
  let lists = []
  $("#content > div > div > div").eq(1).each(function () {
    let releases = $(this).find("div.komik_info-release > h3").text()

    document.getElementById("komikname").innerText = releases


    $(this).find("div.komik_info-chapters > ul > li").each(function () {
      leftoff = $(this).find("a").text()
      leftofflink = $(this).find("a").attr("href")
      rightoff = $(this).find("div").text()

      lists.push({
        leftoff,
        leftofflink,
        rightoff
      })
    })
    document.getElementById("load").remove()

    console.log(lists)
    const cls = document.getElementById("cls")

    lists.forEach(list => {
      const li = document.createElement("li")
      li.classList.add("komik_info-chapters-item")
      cls.appendChild(li)

      const leftoff = document.createElement("a")
      leftoff.classList.add("chapter-link-item")
      leftoff.innerText = list.leftoff
      leftoff.onclick = function () {
        openchapter(list.leftofflink)
      }
      li.appendChild(leftoff)

      const rightoff = document.createElement("div")
      rightoff.classList.add("chapter-link-time")
      rightoff.innerText = list.rightoff.toString().replace("\n","")
      li.appendChild(rightoff)
    })

    console.log(releases)
  })
  komikinfo.forEach(info => {


    const span = document.createElement("span")
    if (info.classes == false) {

    } else {
      span.setAttribute("href", classes)
    }
    document.getElementById("kominfo").appendChild(span)


    span.innerHTML = `<b>${info.type}</b>${info.things}`
    span.style.textAlign = "left"


  })

}

load()

async function openchapter(url) {
  localStorage.setItem("url", url)
  console.log(url)
  window.location.href = "../chapter/index.html"
}



const bokmark = document.getElementById("Bokmark")
let bmkname = document.getElementById("name")

// close 
document.querySelector("#Bokmark > div.modal-dialog > div.modal-content > div.modal-header > button.close")
  .addEventListener('click', function (e) {
    bokmark.style.display = "none"
  })

//yes
document.querySelector("#Bokmark > div.modal-dialog > div.modal-content > div.modal-footer > button#yes")
  .addEventListener('click', function (e) {
    bokmark.style.display = "none"

    const bmk = localStorage.getItem("Newbmk")
    if (bmk == null) {
      localStorage.setItem("Newbmk", "[]")
    }

    let old = JSON.parse(localStorage.getItem("Newbmk"))
    if (bmkname.value == "") {
      title = document.getElementById("Welcomer").innerText
      old.push({
        url,
        title
      })
    } else {
      let title = bmkname.value
      old.push({
        url,
        title
      })
    }
    localStorage.setItem("Newbmk", JSON.stringify(old))
    bmkname.value = ""

    const h1 = document.createElement("h1")
    h1.innerText = "Bookmark Saved"
    h1.classList.add("text-center")
    document.getElementById("saved").appendChild(h1)

    setTimeout(() => {
      h1.remove()
    }, 3000);
  })

function setbookmark() {
  bokmark.style.display = "block"
  let bmkname = document.getElementById("name")
  bmkname.setAttribute("placeholder", document.getElementById("Welcomer").innerText)
}

const bmk = JSON.parse(localStorage.getItem("Newbmk"))
console.log(bmk)