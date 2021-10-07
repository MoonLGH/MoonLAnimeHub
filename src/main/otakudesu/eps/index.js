const { ipcRenderer } = require("electron");

const url = localStorage.getItem("url")

async function load(){
    const cheerio = require("cheerio");
    const axios = require("axios")
    let res = await axios.get(url)
    let $ = cheerio.load(res.data)
    let title = $("head > title").text()
    console.log(title)
    document.getElementById("title").innerHTML = `${title}`

let eps = []
const tabelt = $("#venkonten > div.venser > div:nth-child(8) > div > span").text()
console.log(tabelt)
document.getElementById("titlet").innerHTML= `${tabelt}`

$("#venkonten > div.venser > div:nth-child(8) ").find("ul > li").each(function(){
    epst = $(this).find("span > a").text()
    // console.log(epst)
    epsl = $(this).find("span > a").attr("href")
    // console.log(epsl)
    epsr = $(this).find("span.zeebr").text()
    // console.log(epsr)
    eps.push({
        epst,
        epsl,
        epsr,
    })


})
const info = document.createElement("div")

const row = document.createElement("div")
row.classList.add("row")
info.appendChild(row)

const col1 = document.createElement("div")
col1.classList.add("col-md-5")
col1.style.textAlign = "right"
row.appendChild(col1)

const gap = document.createElement("div")
gap.classList.add("col-md-1")
row.appendChild(gap)

const col2 = document.createElement("div")
col2.classList.add("col-md-5")
col2.style.textAlign = "left"
row.appendChild(col2)

let thumb = $("#venkonten > div.venser > div.fotoanime").find("img").attr("src")
const thumbe = document.createElement("img")
thumbe.src = `${thumb}`
thumbe.style.borderRadius = "20px"
col1.appendChild(thumbe)

titlebatch = $("#venkonten > div.venser > div:nth-child(6) > div > span").text()

console.log(titlebatch)
document.getElementById("batcht").innerHTML= `${titlebatch}`
ipc = ipcRenderer
titles = titlebatch.replace("Batch","")
titlebatch = titles
ipc.send("odanime",{titlebatch})

$("#venkonten > div.venser > div:nth-child(6)").find("ul > li").each(function(){
batchitem = $(this).find("span > a").text()
batchlink = $(this).find("span > a").attr("href")

batchtgl = $(this).find("span.zeebr").text()

const tr = document.createElement("tr")

const td1 = document.createElement("td")
td1.innerHTML = `<div class="link">${batchitem}</div>`
td1.style.textAlign = "left"
td1.onclick = function(){batch(batchlink)}
tr.appendChild(td1)

const td2 = document.createElement("td")
td2.innerText = `${batchtgl}`
td2.style.textAlign = "right"
tr.appendChild(td2)

    const bodyt = document.getElementById("batchtab")
    bodyt.appendChild(tr)


})
$("#venkonten > div.venser > div.fotoanime > div.infozin").find("div.infozingle").each(function(){

    const judula = document.createElement("div")
    judul = $(this).find("p:nth-child(1) > span").text()
    judula.innerHTML = `${judul}`
    console.log(judul)
    col2.appendChild(judula)

    const juduljapa = document.createElement("div")
    juduljap = $(this).find("p:nth-child(2) > span").text()
    juduljapa.innerHTML = `${juduljap}`
    console.log(juduljap)
    col2.appendChild(juduljapa)

    const skora = document.createElement("div")
    skor = $(this).find("p:nth-child(3) > span").text()
    skora.innerHTML = `${skor}`
    console.log(skor)
    col2.appendChild(skora)

    const produsera = document.createElement("div")
    produser = $(this).find("p:nth-child(4) > span").text()
    produsera.innerHTML = `${produser}`
    console.log(produser)
    col2.appendChild(produsera)

    const tipea = document.createElement("div")
    tipe = $(this).find("p:nth-child(5) > span").text()
    tipea.innerHTML = `${tipe}`
    console.log(tipe)
    col2.appendChild(tipea)
    
    const statusa = document.createElement("div")
    status = $(this).find("p:nth-child(6) > span").text()
    statusa.innerHTML = `${status}`
    console.log(status)
    col2.appendChild(statusa)

    const totalepsa = document.createElement("div")
    totaleps = $(this).find("p:nth-child(7) > span").text()
    totalepsa.innerHTML = `${totaleps}`
    console.log(totaleps)
    col2.appendChild(totalepsa)

    const durasia = document.createElement("div")
    durasi = $(this).find("p:nth-child(8) > span").text()
    durasia.innerHTML = `${durasi}`
    console.log(durasi)
    col2.appendChild(durasia)

    const tglrilisa = document.createElement("div")
    tglrilis = $(this).find("p:nth-child(9) > span").text()
    tglrilisa.innerHTML = `${tglrilis}`
    console.log(tglrilis)
    col2.appendChild(tglrilisa)

    const studioa = document.createElement("div")
    studio = $(this).find("p:nth-child(10) > span").text()
    studioa.innerHTML = `${studio}`
    console.log(studio)
    col2.appendChild(studioa)

    const genrea = document.createElement("div")
    genre = $(this).find("p:nth-child(11) > span").text()
    genrea.innerHTML = `${genre}`
    console.log(genre)
    col2.appendChild(genrea)

    const infodiv = document.getElementById("info")
    infodiv.appendChild(info)
})
// console.log(eps)

eps.forEach(eps => {
    const tr = document.createElement("tr")

    const td1 = document.createElement("td")
    td1.innerHTML = `<div class="link" >${eps.epst}</div>`
    td1.style.textAlign = "left"
    td1.onclick = function(){epsd(eps.epsl)}
    tr.appendChild(td1)

    const td2 = document.createElement("td")
    td2.innerHTML = `${eps.epsr}`
    td2.style.textAlign = "right"
    tr.appendChild(td2)

    const bodyt = document.getElementById("tbody")
    bodyt.appendChild(tr)

});
}
load()
function epsd(url){
    console.log(url)
    localStorage.setItem("url",url)
    window.location.href = "../eacheps/index.html"
}

//batch
function batch(url){
    console.log(url)
    localStorage.setItem("url",url)
    window.location.href = "../batch/index.html"
}