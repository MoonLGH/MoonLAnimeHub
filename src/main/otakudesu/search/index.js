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

if(old.otakudesu == undefined){
  old["otakudesu"] = ""
}

let baseUrl = old.otakudesu;

const cheerio = require("cheerio")
const axios = require("axios")
async function searchkeyword(){
    if(keyword.value == ""){
       const add = document.getElementById("add")
       add.innerText = "Tambahkan Keyword"
       setTimeout(() => {
           add.innerText = ""
       },3000);
    }else{
      const animediv = document.getElementById("anime")
      if(animediv.innerText !== ""){
        animediv.innerText = ""
      }
        const keywords = keyword.value.replace(" ","+")
        const fullUrl = `${baseUrl}/?s=${keywords}&post_type=anime`;
        const res = await axios.get(fullUrl)
        console.log(fullUrl)
        let anime = []
        const $ = cheerio.load(res.data);
        const element = $(".page");
        element.find("ul > li").each(function () {
          const results = {
            img: $(this).find("img").attr("src"),
            title: $(this).find("h2").text(),
            link: $(this).find("h2 > a").attr("href"),
            id: $(this).find("h2 > a").attr("href").replace(`${baseUrl}/anime/`, ""),
            status: $(this).find(".set").eq(1).text(),
            score: $(this).find(".set").eq(2).text(),
            genre : $(this).find(".set").eq(0).text(),
          };
          anime.push(results);
        })  
        console.log(anime)
        if(anime.length === 0){
          console.log("no anime found")
          document.getElementById("add").innerText = "No Anime Found !"


          setTimeout(() => {
          document.getElementById("add").innerText = ""
        }, 3000);
        }
        anime.forEach(anime => {
console.log(anime.title)  
// console.log(ong.title)    

//card
const card = document.createElement("div")
card.classList.add("card")
card.classList.add("shadow")
card.classList.add("border-left-primary")
card.classList.add("py-2")
card.classList.add("col-md-4")
card.style.textAlign = "left"

// card.classList.add("flexelement")

card.style.width = "25%"

const cardbody = document.createElement("div")
cardbody.classList.add("card-body")
card.appendChild(cardbody)

const row = document.createElement("div")
row.classList.add("row")
cardbody.appendChild(row)
	
const col1 = document.createElement("div")
col1.classList.add("col-md-6")
row.appendChild(col1)

const imgcol1 = document.createElement("img")
imgcol1.src = anime.img;
imgcol1.style.width = "120%"
imgcol1.style.borderRadius = "25px"
col1.appendChild(imgcol1)

const col2 = document.createElement("div")
col2.classList.add("col-md-6")
row.appendChild(col2)

const cont = document.createElement("div")
cont.classList.add("container")
col2.appendChild(cont)

const row1cont = document.createElement("div")
row1cont.classList.add("row")
cont.appendChild(row1cont)

const colmd12row1cont =  document.createElement("div")
colmd12row1cont.classList.add("col-md-12")
row1cont.appendChild(colmd12row1cont)

const tcolmd12row1cont =  document.createElement("div")
tcolmd12row1cont.innerHTML = `<div href="${anime.link}">${anime.title}</div> <br>`
tcolmd12row1cont.onclick = anime.link
colmd12row1cont.appendChild(tcolmd12row1cont)

const row2cont = document.createElement("div")
row2cont.classList.add("row")
cont.appendChild(row2cont)

const colmd12row2cont =  document.createElement("div")
colmd12row2cont.classList.add("col-md-12")
row2cont.appendChild(colmd12row2cont)

const tcolmd12row2cont =  document.createElement("div")
tcolmd12row2cont.innerText = anime.genre
colmd12row2cont.appendChild(tcolmd12row2cont)

const row3cont = document.createElement("div")
row3cont.classList.add("row")
cont.appendChild(row3cont)

const colmd12row3cont =  document.createElement("div")
colmd12row3cont.classList.add("col-md-12")
row2cont.appendChild(colmd12row3cont)

const tcolmd12row3cont =  document.createElement("div")
tcolmd12row3cont.innerHTML = ` <br> <div> ${anime.status} </div>`
colmd12row3cont.appendChild(tcolmd12row3cont)

const tcolmd12row4cont =  document.createElement("div")
tcolmd12row4cont.innerHTML = ` <br> <div> ${anime.score} </div> <br>`
colmd12row3cont.appendChild(tcolmd12row4cont)

const row4cont = document.createElement("div")
row4cont.classList.add("row")
cont.appendChild(row4cont)

const colmd12row4cont1 =  document.createElement("div")
colmd12row4cont1.classList.add("col-md-12")
row4cont.appendChild(colmd12row4cont1)

const bcolmd12row4cont1 =  document.createElement("button")
bcolmd12row4cont1.classList.add("text-center")
bcolmd12row4cont1.classList.add("btn")
bcolmd12row4cont1.classList.add("btn-primary")
bcolmd12row4cont1.style.width = "125%"
bcolmd12row4cont1.innerHTML = `Open Anime`
bcolmd12row4cont1.onclick = function(){openanime(anime.link)}
colmd12row4cont1.appendChild(bcolmd12row4cont1)



  animediv.appendChild(card)

});
    }
}

const search = document.getElementById("search")
search.onclick = function (){searchkeyword()}

function openanime(url){
  localStorage.setItem("url",url)
  console.log(url)
window.location.href="../eps/index.html"

}