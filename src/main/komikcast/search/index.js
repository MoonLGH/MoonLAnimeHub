const keyword = document.getElementById("keyword")

//enter listener
keyword.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
searchkeyword()
      }
})

const urlbase = localStorage.getItem("BaseURL")
if(urlbase == null){
  localStorage.setItem("BaseURL", "{}")
}

let old = JSON.parse(localStorage.getItem("BaseURL"))

if(old.komikcast == undefined){
  old["komikcast"] = ""
}

let baseurl = old.komikcast
const cheerio = require("cheerio")
const axios = require("axios")
async function searchkeyword(){
      document.getElementById("searched").innerText = "Loading..."

    if(keyword.value == ""){
       const add = document.getElementById("add")
       add.innerText = "Tambahkan Keyword"
       setTimeout(() => {
           add.innerText = ""
       },3000);
    }else{
        const fullUrl = `${baseurl}/?s=${keyword.value}`;
        const res = await axios.get(fullUrl)
        console.log(fullUrl)
        let name = []
        const $ = cheerio.load(res.data);

      let searched = $("#main > div > div.releases > h1 > span").text()
      document.getElementById("searched").innerText = searched

     $("#main > div > div.list-update_items > div.list-update_items-wrapper > div.list-update_item").each(function(){
        title = $(this).find("a").attr("title")
        titlelink = $(this).find("a").attr("href")
        type = $(this).find("a > div.list-update_item-image > span.type").text().replace("\n","")
        img = $(this).find("a > div.list-update_item-image > img").attr("src")
 
        $(this).find("a > div.list-update_item-info > div.other > div.chapter").each(function(){
           if($(this).attr("href").includes("chapter")){
           chapter = $(this).text()
           chapterlink = $(this).attr("href")
           }
          })
         rating = $(this).find("a > div.list-update_item-info > div.other > div.rate > div.rating > div.numscore").text()
       name.push({title,titlelink,type,img,chapter,chapterlink,rating})
     })
console.log(name)


let namelenght = 0
if(document.getElementById("komikhot").innerText !== ""){
  document.getElementById("komikhot").innerText = ""
  if(document.getElementById("script")){
    console.log("ye")
    document.getElementById("script").remove()
  }else{
    console.log("meh")
  }
  if(document.getElementById("more")){
    console.log("ye")
    document.getElementById("more").remove()
  }else{
    console.log("meh")
  }

}
let totallenght = name.length
const script = document.createElement("script")

if(totallenght > 10){
const button = document.createElement("button")
const releases = document.getElementById("releases")
    button.classList.add("btn")
    button.classList.add("btn-primary")
    button.id = "more"
    button.style.display = "inline"
    button.innerText = "See More..."
    button.style.fontSize = "12.5px"
    releases.appendChild(button)

    script.id = "script"
    script.innerHTML = `document.getElementById("more").addEventListener("click",function (e){
      $("#komikhot > div").each(function(){
        if($(this).hasClass("hidemore")){
          $(this).addClass("showmore")
          document.getElementById("more").innerText = "See Less..."
          $(this).removeClass("hidemore")
        }else if($(this).hasClass("showmore")){
          $(this).addClass("hidemore")
          document.getElementById("more").innerText = "See More..."
          $(this).removeClass("showmore")
        }else{
      
        }
      })
      })
      `
    }
      releases.appendChild(script)
      if(totallenght == 50){
        const h1 = document.createElement("h1")
        h1.classList.add("text-center")
        h1.innerHTML = "There is more that 1 page. <br> If what your searching is not here you can search the full title"
        komikhot.appendChild(h1)
      }
name.forEach(name=>{
  namelenght += 1

  if(totallenght > 10){


    if(namelenght > 10){
      const div = document.createElement("div")
      div.classList.add("bs")
      div.classList.add("hidemore")
      
      const divbsx = document.createElement("div")
      divbsx.classList.add("bsx")
      div.appendChild(divbsx)
      
      const absx = document.createElement("div")
      absx.setAttribute("href",name.titlelink)
      absx.setAttribute("title", name.title)
      divbsx.appendChild(absx)
    
      const limit = document.createElement("div")
      limit.classList.add("limit")
      absx.appendChild(limit)
      
      const ply = document.createElement("div")
      ply.classList.add("ply")
      ply.onclick = function(){openkomik(name.titlelink)}
      limit.appendChild(ply)
    
      const spantype = document.createElement("span")
      spantype.setAttribute("class",`type ${name.type}`)
      spantype.innerText = name.type
      limit.appendChild(spantype)
    
      const img = document.createElement("img")
      img.src = name.img
      limit.appendChild(img)
    
      const bigor = document.createElement("div")
      bigor.classList.add("bigor")
      divbsx.appendChild(bigor)
    
      const abigor = document.createElement("a")
      abigor.setAttribute("title",name.title)
      bigor.appendChild(abigor)
    
    const ttitle = document.createElement("div")
    ttitle.classList.add("tt")
    ttitle.innerText = name.title
    ttitle.onclick = function (){openkomik(name.titlelink)}
    abigor.appendChild(ttitle)
    
    const bigoradds = document.createElement("div")
    bigoradds.classList.add("adds")
    bigor.appendChild(bigoradds)
    
    const addsa = document.createElement("a")
    addsa.setAttribute("title",name.title)
    bigoradds.appendChild(addsa)
    
    const epsx = document.createElement("div")
    epsx.classList.add("epsx")
    bigoradds.appendChild(epsx)
    
    const epsxa1 = document.createElement("a")
    epsxa1.setAttribute("title",name.title)
    epsx.appendChild(epsxa1)
    
    const epsxa2 = document.createElement("div")
    epsxa2.setAttribute("title",name.chapter)
    epsxa2.classList.add("epsxa")
    epsxa2.onclick = function(){openchapter(name.chapterlink)}
    epsxa2.innerText = name.chapter
    epsx.appendChild(epsxa2)
    
    const rating = document.createElement("div")
    rating.classList.add("epsxa")
    rating.style.fontWeight = "500"
    rating.style.fontSize = "15px"
    rating.innerHTML= `<i class="fa fa-star"></i> Ratings : ${name.rating}`
    bigoradds.appendChild(rating)
  komikhot.appendChild(div)
  
    }else if(namelenght <= 10){
    const div = document.createElement("div")
    div.classList.add("bs")
    
    const divbsx = document.createElement("div")
    divbsx.classList.add("bsx")
    div.appendChild(divbsx)
    
    const absx = document.createElement("div")
    absx.setAttribute("href",name.titlelink)
    absx.setAttribute("title", name.title)
    divbsx.appendChild(absx)
  
    const limit = document.createElement("div")
    limit.classList.add("limit")
    absx.appendChild(limit)
    
    const ply = document.createElement("div")
    ply.classList.add("ply")
    ply.onclick = function(){openkomik(name.titlelink)}
    limit.appendChild(ply)
  
    const spantype = document.createElement("span")
    spantype.setAttribute("class",`type ${name.type}`)
    spantype.innerText = name.type
    limit.appendChild(spantype)
  
    const img = document.createElement("img")
    img.src = name.img
    limit.appendChild(img)
  
    const bigor = document.createElement("div")
    bigor.classList.add("bigor")
    divbsx.appendChild(bigor)
  
    const abigor = document.createElement("a")
    abigor.setAttribute("title",name.title)
    bigor.appendChild(abigor)
  
  const ttitle = document.createElement("div")
  ttitle.classList.add("tt")
  ttitle.innerText = name.title
  ttitle.onclick = function (){openkomik(name.titlelink)}
  abigor.appendChild(ttitle)
  
  const bigoradds = document.createElement("div")
  bigoradds.classList.add("adds")
  bigor.appendChild(bigoradds)
  
  const addsa = document.createElement("a")
  addsa.setAttribute("title",name.title)
  bigoradds.appendChild(addsa)
  
  const epsx = document.createElement("div")
  epsx.classList.add("epsx")
  bigoradds.appendChild(epsx)
  
  const epsxa1 = document.createElement("a")
  epsxa1.setAttribute("title",name.title)
  epsx.appendChild(epsxa1)
  
  const epsxa2 = document.createElement("div")
  epsxa2.setAttribute("title",name.chapter)
  epsxa2.classList.add("epsxa")
  epsxa2.onclick = function(){openchapter(name.chapterlink)}
  epsxa2.innerText = name.chapter
  epsx.appendChild(epsxa2)
  
  const rating = document.createElement("div")
  rating.classList.add("epsxa")
  rating.style.fontWeight = "500"
  rating.style.fontSize = "15px"
  rating.innerHTML= `<i class="fa fa-star"></i> Ratings : ${name.rating}`
  bigoradds.appendChild(rating)
  komikhot.appendChild(div)
  
    }
  }else{
  if(namelenght > 10){
    const div = document.createElement("div")
    div.classList.add("bs")
    div.classList.add("hidemore")
    
    const divbsx = document.createElement("div")
    divbsx.classList.add("bsx")
    div.appendChild(divbsx)
    
    const absx = document.createElement("div")
    absx.setAttribute("href",name.titlelink)
    absx.setAttribute("title", name.title)
    divbsx.appendChild(absx)
  
    const limit = document.createElement("div")
    limit.classList.add("limit")
    absx.appendChild(limit)
    
    const ply = document.createElement("div")
    ply.classList.add("ply")
    ply.onclick = function(){openkomik(name.titlelink)}
    limit.appendChild(ply)
  
    const spantype = document.createElement("span")
    spantype.setAttribute("class",`type ${name.type}`)
    spantype.innerText = name.type
    limit.appendChild(spantype)
  
    const img = document.createElement("img")
    img.src = name.img
    limit.appendChild(img)
  
    const bigor = document.createElement("div")
    bigor.classList.add("bigor")
    divbsx.appendChild(bigor)
  
    const abigor = document.createElement("a")
    abigor.setAttribute("title",name.title)
    bigor.appendChild(abigor)
  
  const ttitle = document.createElement("div")
  ttitle.classList.add("tt")
  ttitle.innerText = name.title
  ttitle.onclick = function (){openkomik(name.titlelink)}
  abigor.appendChild(ttitle)
  
  const bigoradds = document.createElement("div")
  bigoradds.classList.add("adds")
  bigor.appendChild(bigoradds)
  
  const addsa = document.createElement("a")
  addsa.setAttribute("title",name.title)
  bigoradds.appendChild(addsa)
  
  const epsx = document.createElement("div")
  epsx.classList.add("epsx")
  bigoradds.appendChild(epsx)
  
  const epsxa1 = document.createElement("a")
  epsxa1.setAttribute("title",name.title)
  epsx.appendChild(epsxa1)
  
  const epsxa2 = document.createElement("div")
  epsxa2.setAttribute("title",name.chapter)
  epsxa2.classList.add("epsxa")
  epsxa2.onclick = function(){openchapter(name.chapterlink)}
  epsxa2.innerText = name.chapter
  epsx.appendChild(epsxa2)
  
  const rating = document.createElement("div")
  rating.classList.add("epsxa")
  rating.style.fontWeight = "500"
  rating.style.fontSize = "15px"
  rating.innerHTML= `<i class="fa fa-star"></i> Ratings : ${name.rating}`
  bigoradds.appendChild(rating)
komikhot.appendChild(div)

  }else if(namelenght <= 10){
  const div = document.createElement("div")
  div.classList.add("bs")
  
  const divbsx = document.createElement("div")
  divbsx.classList.add("bsx")
  div.appendChild(divbsx)
  
  const absx = document.createElement("div")
  absx.setAttribute("href",name.titlelink)
  absx.setAttribute("title", name.title)
  divbsx.appendChild(absx)

  const limit = document.createElement("div")
  limit.classList.add("limit")
  absx.appendChild(limit)
  
  const ply = document.createElement("div")
  ply.classList.add("ply")
  ply.onclick = function(){openkomik(name.titlelink)}
  limit.appendChild(ply)

  const spantype = document.createElement("span")
  spantype.setAttribute("class",`type ${name.type}`)
  spantype.innerText = name.type
  limit.appendChild(spantype)

  const img = document.createElement("img")
  img.src = name.img
  limit.appendChild(img)

  const bigor = document.createElement("div")
  bigor.classList.add("bigor")
  divbsx.appendChild(bigor)

  const abigor = document.createElement("a")
  abigor.setAttribute("title",name.title)
  bigor.appendChild(abigor)

const ttitle = document.createElement("div")
ttitle.classList.add("tt")
ttitle.innerText = name.title
ttitle.onclick = function (){openkomik(name.titlelink)}
abigor.appendChild(ttitle)

const bigoradds = document.createElement("div")
bigoradds.classList.add("adds")
bigor.appendChild(bigoradds)

const addsa = document.createElement("a")
addsa.setAttribute("title",name.title)
bigoradds.appendChild(addsa)

const epsx = document.createElement("div")
epsx.classList.add("epsx")
bigoradds.appendChild(epsx)

const epsxa1 = document.createElement("a")
epsxa1.setAttribute("title",name.title)
epsx.appendChild(epsxa1)

const epsxa2 = document.createElement("div")
epsxa2.setAttribute("title",name.chapter)
epsxa2.classList.add("epsxa")
epsxa2.onclick = function(){openchapter(name.chapterlink)}
epsxa2.innerText = name.chapter
epsx.appendChild(epsxa2)

const rating = document.createElement("div")
rating.classList.add("epsxa")
rating.style.fontWeight = "500"
rating.style.fontSize = "15px"
rating.innerHTML= `<i class="fa fa-star"></i> Ratings : ${name.rating}`
bigoradds.appendChild(rating)
komikhot.appendChild(div)

  }
}
})
      
    }
}

const search = document.getElementById("search")
search.onclick = function (){searchkeyword()}

async function openkomik(url){
  console.log(url)
  localStorage.setItem("url",url)
  window.location.href = "../komik/index.html"
}

async function openchapter(url){
  console.log(url)
  localStorage.setItem("url",url)
  window.location.href = "../chapter/index.html"
}
