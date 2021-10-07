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

let baseUrl = old.otakudesu;

async function Home(){
    const cheerio = require("cheerio");
const axios = require("axios")

let res = await axios.get(baseUrl)
let $ = cheerio.load(res.data)
let on_going = []
const element = $(".venz");
let episode, uploaded_on, day_updated, thumb, title, link, id;
element
  .children()
  .eq(0)
  .find("ul > li")
  .each(function () {
    $(this)
      .find(".thumb > a")
      .filter(function () {
        title = $(this).find(".thumbz > h2").text();
        thumb = $(this).find(".thumbz > img").attr("src");
        link = $(this).attr("href");
        id = link.replace(`${baseUrl}anime/`, "");
      });
    uploaded_on = $(this).find(".newnime").text();
    episode = $(this).find(".epz").text().replace(" ", "");
    day_updated = $(this).find(".epztipe").text().replace(" ", "");
    on_going.push({
      title,
      id,
      thumb,
      episode,
      uploaded_on,
      day_updated,
      link,
    });
  });
on_going.forEach(ong => {
console.log(ong.title)  
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
imgcol1.src = ong.thumb;
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
tcolmd12row1cont.innerHTML = `<div href="${ong.link}">${ong.title}</div> <br>`
tcolmd12row1cont.onclick = ong.link
colmd12row1cont.appendChild(tcolmd12row1cont)

const row2cont = document.createElement("div")
row2cont.classList.add("row")
cont.appendChild(row2cont)

const colmd12row2cont =  document.createElement("div")
colmd12row2cont.classList.add("col-md-12")
row2cont.appendChild(colmd12row2cont)

const tcolmd12row2cont =  document.createElement("div")
tcolmd12row2cont.innerText = ong.episode 
colmd12row2cont.appendChild(tcolmd12row2cont)

const row3cont = document.createElement("div")
row3cont.classList.add("row")
cont.appendChild(row3cont)

const colmd12row3cont =  document.createElement("div")
colmd12row3cont.classList.add("col-md-12")
row2cont.appendChild(colmd12row3cont)

const tcolmd12row3cont =  document.createElement("div")
tcolmd12row3cont.innerHTML = ` <br> <div> ${ong.day_updated} ${ong.uploaded_on} </div> <br>`
colmd12row3cont.appendChild(tcolmd12row3cont)

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
bcolmd12row4cont1.onclick = function(){openanime(ong.id)}
colmd12row4cont1.appendChild(bcolmd12row4cont1)

const ongoing = document.getElementById("ongoing")
ongoing.appendChild(card)
});
{/* <div class="card shadow border-left-primary py-2">
    <div class="card-body">
        <div class="row">
            <div class="col-md-6"><img /></div>
            <div class="col-md-6">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Heading</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Heading</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Heading</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}
console.log(on_going)
// console.log(res.data)

}
Home()
comp()
async function comp(){
    const cheerio = require("cheerio");
    const axios = require("axios")
    
    let res = await axios.get(baseUrl)
    let $ = cheerio.load(res.data)
    let complete = []
const element = $(".venz");

    let episode, uploaded_on, score, thumb, title, link, id;
    element
      .children()
      .eq(1)
      .find("ul > li")
      .each(function () {
        $(this)
          .find(".thumb > a")
          .filter(function () {
            title = $(this).find(".thumbz > h2").text();
            thumb = $(this).find(".thumbz > img").attr("src");
            link = $(this).attr("href");
            id = link.replace(`${baseUrl}anime/`, "");
          });
        uploaded_on = $(this).find(".newnime").text();
        episode = $(this).find(".epz").text().replace(" ", "");
        score = parseFloat($(this).find(".epztipe").text().replace(" ", ""));
        complete.push({
          title,
          id,
          thumb,
          episode,
          uploaded_on,
          score,
          link,
        });
      });


        complete.forEach(ong => {
        console.log(ong.title)  
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
        imgcol1.src = ong.thumb;
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
        tcolmd12row1cont.innerHTML = `<div href="${ong.link}">${ong.title}</div> <br>`
        tcolmd12row1cont.onclick = ong.link
        colmd12row1cont.appendChild(tcolmd12row1cont)
        
        const row2cont = document.createElement("div")
        row2cont.classList.add("row")
        cont.appendChild(row2cont)
        
        const colmd12row2cont =  document.createElement("div")
        colmd12row2cont.classList.add("col-md-12")
        row2cont.appendChild(colmd12row2cont)
        
        const tcolmd12row2cont =  document.createElement("div")
        tcolmd12row2cont.innerText = ong.episode 
        colmd12row2cont.appendChild(tcolmd12row2cont)
        
        const row3cont = document.createElement("div")
        row3cont.classList.add("row")
        cont.appendChild(row3cont)
        
        const colmd12row3cont =  document.createElement("div")
        colmd12row3cont.classList.add("col-md-12")
        row2cont.appendChild(colmd12row3cont)
        
        const tcolmd12row3cont =  document.createElement("div")
        tcolmd12row3cont.innerHTML = ` <br> <div> <i class="fa fa-star"></i> ${ong.score} <br> <br> ${ong.uploaded_on} </div> <br>`
        colmd12row3cont.appendChild(tcolmd12row3cont)
        
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
        bcolmd12row4cont1.onclick = function(){openanime(ong.id)}
        colmd12row4cont1.appendChild(bcolmd12row4cont1)
        
        const comp = document.getElementById("comp")
        comp.appendChild(card)
        });
      
}
function openanime(url){
    localStorage.setItem("url",url)
    console.log(url)
window.location.href="./eps/index.html"

}

const electron = require("electron")
const ipc = electron.ipcRenderer

ipc.send("odmenu")

