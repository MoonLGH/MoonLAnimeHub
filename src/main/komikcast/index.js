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

const urlbase = localStorage.getItem("BaseURL")
if (urlbase == null) {
  localStorage.setItem("BaseURL", "{}")
}

let old = JSON.parse(localStorage.getItem("BaseURL"))

if (old.komikcast === undefined) {
  old["komikcast"] = ""

}

let baseurl = old.komikcast

const cheerio = require("cheerio")
const axios = require("axios")

async function load() {
  const res = await axios.get(baseurl)
  const $ = cheerio.load(res.data)
  let name = []

  $("#content > div").find("div.bixbox.hothome").each(function () {
    const releases = $(this).find("div.releases > h3").text()
    console.log(releases)

    $(this).find("div.listupd > div > div.splide__track > div.splide__list > div.splide__slide").each(function () {
      title = $(this).find("a").attr("title")
      titlelink = $(this).find("a").attr("href")
      type = $(this).find("a > div.splide__slide-image > span.type").text()
      img = $(this).find("a > div.splide__slide-image> img").attr("src")

      $(this).find("a > div.splide__slide-info > div.other > div.chapter").each(function () {
        if ($(this).attr("href").includes("chapter")) {
          chapter = $(this).text()
          chapterlink = $(this).attr("href")
        }
      })
      rating = $(this).find("a > div.splide__slide-info > div.other > div.rate > div.rating > div.numscore").text()
      name.push({
        title,
        titlelink,
        type,
        img,
        chapter,
        chapterlink,
        rating
      })
    })
    console.log(name)
    document.getElementById("rils1").innerText = releases
    document.getElementById("more").style.display = "inline"
    document.getElementById("more").style.fontSize = "12.5px"
    document.getElementById("more").style.fontSize = "12.5px"


    const komikhot = document.getElementById("komikhot")
    let namelenght = 0
    name.forEach(name => {
      namelenght += 1
      console.log(namelenght)
      if (namelenght > 5) {
        const div = document.createElement("div")
        div.classList.add("bs")
        div.classList.add("hidemore")

        const divbsx = document.createElement("div")
        divbsx.classList.add("bsx")
        div.appendChild(divbsx)

        const absx = document.createElement("div")
        absx.setAttribute("href", name.titlelink)
        absx.setAttribute("title", name.title)
        divbsx.appendChild(absx)

        const limit = document.createElement("div")
        limit.classList.add("limit")
        absx.appendChild(limit)

        const ply = document.createElement("div")
        ply.classList.add("ply")
        ply.onclick = function () {
          openkomik(name.titlelink)
        }
        limit.appendChild(ply)

        const spantype = document.createElement("span")
        let type = name.type.replaceAll(" ", "").replaceAll("\n", "")
        spantype.setAttribute("class", "type " + type)
        spantype.innerText = type
        limit.appendChild(spantype)

        const img = document.createElement("img")
        img.src = name.img
        limit.appendChild(img)

        const bigor = document.createElement("div")
        bigor.classList.add("bigor")
        divbsx.appendChild(bigor)

        const abigor = document.createElement("a")
        abigor.setAttribute("title", name.title)
        bigor.appendChild(abigor)

        const ttitle = document.createElement("div")
        ttitle.classList.add("tt")
        ttitle.innerText = name.title
        ttitle.onclick = function () {
          openkomik(name.titlelink)
        }
        abigor.appendChild(ttitle)

        const bigoradds = document.createElement("div")
        bigoradds.classList.add("adds")
        bigor.appendChild(bigoradds)

        const addsa = document.createElement("a")
        addsa.setAttribute("title", name.title)
        bigoradds.appendChild(addsa)

        const epsx = document.createElement("div")
        epsx.classList.add("epsx")
        bigoradds.appendChild(epsx)

        const epsxa1 = document.createElement("a")
        epsxa1.setAttribute("title", name.title)
        epsx.appendChild(epsxa1)

        const epsxa2 = document.createElement("div")
        epsxa2.setAttribute("title", name.chapter)
        epsxa2.classList.add("epsxa")
        epsxa2.onclick = function () {
          openchapter(name.chapterlink)
        }
        epsxa2.innerText = name.chapter
        epsx.appendChild(epsxa2)

        const rating = document.createElement("div")
        rating.classList.add("epsxa")
        rating.style.fontWeight = "500"
        rating.style.fontSize = "15px"
        rating.innerHTML = `<i class="fa fa-star"></i> Ratings : ${name.rating}`
        bigoradds.appendChild(rating)
        komikhot.appendChild(div)

      } else if (namelenght <= 5) {
        const div = document.createElement("div")
        div.classList.add("bs")

        const divbsx = document.createElement("div")
        divbsx.classList.add("bsx")
        div.appendChild(divbsx)

        const absx = document.createElement("div")
        absx.setAttribute("href", name.titlelink)
        absx.setAttribute("title", name.title)
        divbsx.appendChild(absx)

        const limit = document.createElement("div")
        limit.classList.add("limit")
        absx.appendChild(limit)

        const ply = document.createElement("div")
        ply.classList.add("ply")
        ply.onclick = function () {
          openkomik(name.titlelink)
        }
        limit.appendChild(ply)

        const spantype = document.createElement("span")
        let type = name.type.replaceAll(" ", "").replaceAll("\n", "")
        spantype.setAttribute("class", "type " + type)
        spantype.innerText = type
        limit.appendChild(spantype)

        const img = document.createElement("img")
        img.src = name.img
        limit.appendChild(img)

        const bigor = document.createElement("div")
        bigor.classList.add("bigor")
        divbsx.appendChild(bigor)

        const abigor = document.createElement("a")
        abigor.setAttribute("title", name.title)
        bigor.appendChild(abigor)

        const ttitle = document.createElement("div")
        ttitle.classList.add("tt")
        ttitle.innerText = name.title
        ttitle.onclick = function () {
          openkomik(name.titlelink)
        }
        abigor.appendChild(ttitle)

        const bigoradds = document.createElement("div")
        bigoradds.classList.add("adds")
        bigor.appendChild(bigoradds)

        const addsa = document.createElement("a")
        addsa.setAttribute("title", name.title)
        bigoradds.appendChild(addsa)

        const epsx = document.createElement("div")
        epsx.classList.add("epsx")
        bigoradds.appendChild(epsx)

        const epsxa1 = document.createElement("a")
        epsxa1.setAttribute("title", name.title)
        epsx.appendChild(epsxa1)

        const epsxa2 = document.createElement("div")
        epsxa2.setAttribute("title", name.chapter)
        epsxa2.classList.add("epsxa")
        epsxa2.onclick = function () {
          openchapter(name.chapterlink)
        }
        epsxa2.innerText = name.chapter
        epsx.appendChild(epsxa2)

        const rating = document.createElement("div")
        rating.classList.add("epsxa")
        rating.style.fontWeight = "500"
        rating.style.fontSize = "15px"
        rating.innerHTML = `<i class="fa fa-star"></i> Ratings : ${name.rating}`
        bigoradds.appendChild(rating)
        komikhot.appendChild(div)

      }
    })

  })

  let namelenght = 0


  $("#content > div.wrapper").find("div.postbody > div.bixbox").each(function () {
    const releases = $(this).find("div.releases > h3").text()
    let name1 = []
    let bixname = []

    $(this).find(".listupd > div > div").each(function () {
      let chapt = []

      title = $(this).find("div.luf > a > h3").text()
      titlelink = $(this).find("a").attr("href")
      img = $(this).find("div.imgu > a > img").attr("src")
      if ($(this).find("div.imgu > a span.hot").length == 1) {
        ishot = true

      } else {
        ishot = false
      }
      tipe = $(this).find("div.luf > ul").attr("class")

      $(this).find("div.luf > ul > li").each(function () {
        chapter = $(this).find("a").text()
        chapterlink = $(this).find("a").attr("href")
        releasedtime = $(this).find("span > i").text()
        chapt.push({
          chapter,
          chapterlink,
          releasedtime
        })
      })


      name1.push({
        img,
        title,
        titlelink,
        ishot,
        tipe,
        chapt
      })

    })

    bixname.push({
      releases,
      name1
    })

    bixname.forEach(name => {
      let titlelenght = 0
      namelenght += 1
      console.log(namelenght + "lenght")
      const jumbotron = document.createElement("div")
      jumbotron.classList.add("jumbotron")

      const container = document.createElement("div")
      container.classList.add("container")
      container.classList.add("swing")
      container.classList.add("animated")
      container.classList.add("mb-4")
      jumbotron.appendChild(container)

      const bixbox = document.createElement("div")
      bixbox.classList.add("bixbox")
      container.appendChild(bixbox)

      const releases = document.createElement("div")
      releases.classList.add("releases")
      bixbox.appendChild(releases)

      const h3 = document.createElement("h3")
      releases.appendChild(h3)

      const span = document.createElement("span")
      span.innerText = name.releases
      h3.appendChild(span)

      const button = document.createElement("button")
      button.classList.add("btn")
      button.classList.add("btn-primary")
      button.id = "more" + namelenght;
      button.style.display = "inline"
      button.innerText = "See More..."
      button.style.fontSize = "12.5px"
      releases.appendChild(button)

      const listupd = document.createElement("div")
      listupd.classList.add("listupd")
      listupd.classList.add("project")
      listupd.id = "box" + namelenght
      bixbox.appendChild(listupd)

      //Real Things
      name.name1.forEach(komik => {
        titlelenght += 1
        if (namelenght == 1) {
          if (titlelenght < 5) {
            const utao = document.createElement("div")
            utao.classList.add("utao")
            listupd.appendChild(utao)

            const uta = document.createElement("div")
            uta.classList.add("uta")
            utao.appendChild(uta)

            const imgu = document.createElement("div")
            imgu.classList.add("imgu")
            uta.appendChild(imgu)

            const aimgu = document.createElement("a")
            aimgu.classList.add("series")
            aimgu.setAttribute("title", komik.title)
            aimgu.onclick = function () {
              openkomik(komik.titlelink)
            }
            imgu.appendChild(aimgu)

            if (komik.ishot == true) {
              const hot = document.createElement("span")
              hot.classList.add("hot")
              hot.innerText = "Hot"
              aimgu.appendChild(hot)
            } else {}
            const thumb = document.createElement("img")
            thumb.style.width = "224"
            thumb.style.height = "300"
            thumb.classList.add("attachment-thumb")
            thumb.classList.add("size-thumb")
            thumb.classList.add("wp-post-image")
            thumb.src = komik.img;
            aimgu.appendChild(thumb)

            const luf = document.createElement("div")
            luf.classList.add("luf")
            uta.appendChild(luf)

            const series = document.createElement("a")
            series.classList.add("series")
            series.setAttribute("title", komik.title)
            luf.appendChild(series)

            const h3 = document.createElement("h3")
            h3.innerText = komik.title
            h3.classList.add("pointer")
            h3.style.color = "#4e73df"
            h3.onclick = function () {
              openkomik(komik.titlelink)
            }
            series.appendChild(h3)

            const ul = document.createElement("ul")
            ul.setAttribute("class", komik.tipe)
            luf.appendChild(ul)

            komik.chapt.forEach(chapt => {
              const li = document.createElement("li")
              ul.appendChild(li)

              const ali = document.createElement("a")
              ali.onclick = function () {
                openchapter(chapt.chapterlink)
              }
              ali.innerText = chapt.chapter
              ali.classList.add("pointer")
              li.appendChild(ali)

              const spanli = document.createElement("span")
              li.appendChild(spanli)

              const ispan = document.createElement("i")
              ispan.innerText = chapt.releasedtime
              spanli.appendChild(ispan)
            })
          } else if (titlelenght >= 5) {
            const utao = document.createElement("div")
            utao.classList.add("utao")
            utao.classList.add("hidemore")
            listupd.appendChild(utao)

            const uta = document.createElement("div")
            uta.classList.add("uta")
            utao.appendChild(uta)

            const imgu = document.createElement("div")
            imgu.classList.add("imgu")
            uta.appendChild(imgu)

            const aimgu = document.createElement("a")
            aimgu.classList.add("series")
            aimgu.setAttribute("title", komik.title)
            aimgu.onclick = function () {
              openkomik(komik.titlelink)
            }
            imgu.appendChild(aimgu)

            if (komik.ishot == true) {
              const hot = document.createElement("span")
              hot.classList.add("hot")
              hot.innerText = "Hot"
              aimgu.appendChild(hot)
            } else {}
            const thumb = document.createElement("img")
            thumb.style.width = "224"
            thumb.style.height = "300"
            thumb.classList.add("attachment-thumb")
            thumb.classList.add("size-thumb")
            thumb.classList.add("wp-post-image")
            thumb.src = komik.img;
            aimgu.appendChild(thumb)

            const luf = document.createElement("div")
            luf.classList.add("luf")
            uta.appendChild(luf)

            const series = document.createElement("a")
            series.classList.add("series")
            series.setAttribute("title", komik.title)
            luf.appendChild(series)

            const h3 = document.createElement("h3")
            h3.innerText = komik.title
            h3.classList.add("pointer")
            h3.style.color = "#4e73df"
            h3.onclick = function () {
              openkomik(komik.titlelink)
            }
            series.appendChild(h3)

            const ul = document.createElement("ul")
            ul.setAttribute("class", komik.tipe)
            luf.appendChild(ul)

            komik.chapt.forEach(chapt => {
              const li = document.createElement("li")
              ul.appendChild(li)

              const ali = document.createElement("a")
              ali.onclick = function () {
                openchapter(chapt.chapterlink)
              }
              ali.innerText = chapt.chapter
              ali.classList.add("pointer")
              li.appendChild(ali)

              const spanli = document.createElement("span")
              li.appendChild(spanli)

              const ispan = document.createElement("i")
              ispan.innerText = chapt.releasedtime
              spanli.appendChild(ispan)
            })
          }
        } else if (namelenght == 2) {
          if (titlelenght < 9) {
            const utao = document.createElement("div")
            utao.classList.add("utao")
            listupd.appendChild(utao)

            const uta = document.createElement("div")
            uta.classList.add("uta")
            utao.appendChild(uta)

            const imgu = document.createElement("div")
            imgu.classList.add("imgu")
            uta.appendChild(imgu)

            const aimgu = document.createElement("a")
            aimgu.classList.add("series")
            aimgu.setAttribute("title", komik.title)
            aimgu.onclick = function () {
              openkomik(komik.titlelink)
            }
            imgu.appendChild(aimgu)

            if (komik.ishot == true) {
              const hot = document.createElement("span")
              hot.classList.add("hot")
              hot.innerText = "Hot"
              aimgu.appendChild(hot)
            } else {}
            const thumb = document.createElement("img")
            thumb.style.width = "224"
            thumb.style.height = "300"
            thumb.classList.add("attachment-thumb")
            thumb.classList.add("size-thumb")
            thumb.classList.add("wp-post-image")
            thumb.src = komik.img;
            aimgu.appendChild(thumb)

            const luf = document.createElement("div")
            luf.classList.add("luf")
            uta.appendChild(luf)

            const series = document.createElement("a")
            series.classList.add("series")
            series.setAttribute("title", komik.title)
            luf.appendChild(series)

            const h3 = document.createElement("h3")
            h3.innerText = komik.title
            h3.classList.add("pointer")
            h3.style.color = "#4e73df"
            h3.onclick = function () {
              openkomik(komik.titlelink)
            }
            series.appendChild(h3)

            const ul = document.createElement("ul")
            ul.setAttribute("class", komik.tipe)
            luf.appendChild(ul)

            komik.chapt.forEach(chapt => {
              const li = document.createElement("li")
              ul.appendChild(li)

              const ali = document.createElement("a")
              ali.onclick = function () {
                openchapter(chapt.chapterlink)
              }
              ali.innerText = chapt.chapter
              ali.classList.add("pointer")
              li.appendChild(ali)

              const spanli = document.createElement("span")
              li.appendChild(spanli)

              const ispan = document.createElement("i")
              ispan.innerText = chapt.releasedtime
              spanli.appendChild(ispan)
            })
          } else if (titlelenght >= 9) {
            const utao = document.createElement("div")
            utao.classList.add("utao")
            utao.classList.add("hidemore")
            listupd.appendChild(utao)

            const uta = document.createElement("div")
            uta.classList.add("uta")
            utao.appendChild(uta)

            const imgu = document.createElement("div")
            imgu.classList.add("imgu")
            uta.appendChild(imgu)

            const aimgu = document.createElement("a")
            aimgu.classList.add("series")
            aimgu.setAttribute("title", komik.title)
            aimgu.onclick = function () {
              openkomik(komik.titlelink)
            }
            imgu.appendChild(aimgu)

            if (komik.ishot == true) {
              const hot = document.createElement("span")
              hot.classList.add("hot")
              hot.innerText = "Hot"
              aimgu.appendChild(hot)
            } else {}
            const thumb = document.createElement("img")
            thumb.style.width = "224"
            thumb.style.height = "300"
            thumb.classList.add("attachment-thumb")
            thumb.classList.add("size-thumb")
            thumb.classList.add("wp-post-image")
            thumb.src = komik.img;
            aimgu.appendChild(thumb)

            const luf = document.createElement("div")
            luf.classList.add("luf")
            uta.appendChild(luf)

            const series = document.createElement("a")
            series.classList.add("series")
            series.setAttribute("title", komik.title)
            luf.appendChild(series)

            const h3 = document.createElement("h3")
            h3.innerText = komik.title
            h3.classList.add("pointer")
            h3.style.color = "#4e73df"
            h3.onclick = function () {
              openkomik(komik.titlelink)
            }
            series.appendChild(h3)

            const ul = document.createElement("ul")
            ul.setAttribute("class", komik.tipe)
            luf.appendChild(ul)

            komik.chapt.forEach(chapt => {
              const li = document.createElement("li")
              ul.appendChild(li)

              const ali = document.createElement("a")
              ali.onclick = function () {
                openchapter(chapt.chapterlink)
              }
              ali.innerText = chapt.chapter
              ali.classList.add("pointer")
              li.appendChild(ali)

              const spanli = document.createElement("span")
              li.appendChild(spanli)

              const ispan = document.createElement("i")
              ispan.innerText = chapt.releasedtime
              spanli.appendChild(ispan)
            })
          }
        }
      })


      const script = document.createElement("script")
      script.innerHTML = `document.getElementById("more${namelenght}").addEventListener("click",function (e){
                      $("#box${namelenght} > div").each(function(){
                        if($(this).hasClass("hidemore")){
                          $(this).addClass("showmore")
                          document.getElementById("more${namelenght}").innerText = "See Less..."
                          $(this).removeClass("hidemore")
                        }else if($(this).hasClass("showmore")){
                          $(this).addClass("hidemore")
                          document.getElementById("more${namelenght}").innerText = "See More..."
                          $(this).removeClass("showmore")
                        }else{
                      
                        }
                      })
                      })
                      `
      const boxes = document.getElementById("boxs")
      boxes.appendChild(jumbotron)
      boxes.appendChild(script)
    })
    console.log(releases)
    console.log(name1)

  })

  console.log()

}
load()

document.getElementById("more").addEventListener("click", function (e) {
  $("#komikhot > div").each(function () {
    if ($(this).hasClass("hidemore")) {
      $(this).addClass("showmore")
      document.getElementById("more").innerText = "See Less..."
      $(this).removeClass("hidemore")
    } else if ($(this).hasClass("showmore")) {
      $(this).addClass("hidemore")
      document.getElementById("more").innerText = "See More..."
      $(this).removeClass("showmore")
    } else {

    }
  })
})




async function openkomik(url) {
  console.log(url)
  localStorage.setItem("url", url)
  window.location.href = "./komik/index.html"
}

async function openchapter(url) {
  console.log(url)
  localStorage.setItem("url", url)
  window.location.href = "./chapter/index.html"
}


const electron = require("electron")
let ipc = electron.ipcRenderer
ipc.send("kcmenu")