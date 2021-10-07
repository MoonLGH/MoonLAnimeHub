const axios = require("axios");
const cheerio = require("cheerio");
const urlbase = localStorage.getItem("BaseURL")
if(urlbase == null){
  localStorage.setItem("BaseURL", "{}")
}

let old = JSON.parse(localStorage.getItem("BaseURL"))

if(old.otakudesu == undefined){
  old["otakudesu"] = ""
}

let baseUrl = old.otakudesu;
async function jadwal(){
    const response = await axios.get(`${baseUrl}/jadwal-rilis/`)
        const $ = cheerio.load(response.data);
        const element = $(".kgjdwl321");
        let animeList = [];
        let scheduleList = [];
        let day;
        let anime_name, link, id;
        element.find(".kglist321").each(function () {
          day = $(this).find("h2").text();
          animeList = [];
          $(this)
            .find("ul > li")
            .each(function () {
              anime_name = $(this).find("a").text();
              link = $(this).find("a").attr("href");
              id = link.replace(`${baseUrl}` + "anime/", "");
              animeList.push({ anime_name, id, link });
            });
          scheduleList.push({ day, animeList });
        });
        console.log(scheduleList)

        scheduleList.forEach(schej =>{
            // console.log(schej.day)
            const jumbotron = document.createElement("div")
            jumbotron.classList.add("jumbotron")

            const h2hari = document.createElement("h2")
            h2hari.innerText = schej.day
            jumbotron.appendChild(h2hari)

            const hrcredits = document.createElement("hr")
            hrcredits.classList.add("credits")
            jumbotron.appendChild(hrcredits)
            
        // <div class="table-responsive tab">
        //     <table class="table" >
        //     <thead >
        //         <tr>
        //             <th style="text-align: left;" id="titlet">Judul</th>
        //             <th style="text-align: right;">Tanggal Rilis</th>
        //         </tr>
        //     </thead>
        //     <tbody id="tbody">
        //     </tbody>
        // </table>
        // </div>

        const divtable = document.createElement("div")
        divtable.classList.add("table-responsive")
        divtable.classList.add("tab")
        // divtable.classList.add("text-center")
        divtable.style.width = "50%"


        jumbotron.appendChild(divtable)
            const table = document.createElement("table")
            table.classList.add("table")
            divtable.appendChild(table)

            const thead = document.createElement("thead")
            table.appendChild(thead)

            const trthead = document.createElement("tr")
            thead.appendChild(trthead)

            const thtrthead = document.createElement("th")
            thtrthead.innerText = schej.day
            trthead.appendChild(thtrthead)        

            const tbody = document.createElement("tbody")
            table.appendChild(tbody)

            schej.animeList.forEach(element =>{
                const tr = document.createElement("tr")
                tbody.appendChild(tr)
    
                const td = document.createElement("td")
                td.innerHTML = `<div class="link" >${element.anime_name}</div>`
                td.style.textAlign = "center"
                td.onclick = function(){openanime(element.link)}
                tr.appendChild(td)
    
            })


            const jadwaldiv = document.getElementById("jadawl")
            jadwaldiv.appendChild(jumbotron)
        })
}
jadwal()

function openanime(url){
    localStorage.setItem("url",url)
    console.log(url)
window.location.href="../eps/index.html"

}