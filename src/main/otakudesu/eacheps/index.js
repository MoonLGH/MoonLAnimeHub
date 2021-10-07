const url = localStorage.getItem("url")
const { ipcRenderer } = require("electron");
const electron = require("electron") 

const ipc = electron.ipcRenderer
async function loadplayer(){
    const cheerio = require("cheerio");
    const axios = require("axios")
    let res = await axios.get(url)
    let $ = cheerio.load(res.data)
    let title = $("head > title").text()
    document.querySelector("title").innerText = title
    console.log(title)
    document.getElementById("title").innerHTML = `${title}`
    const desuurl = $("#pembed > div > iframe").attr("src")

    console.log(desuurl)
    // const vid = $.html("")
    const video = await axios.get(desuurl)
    // vid
    let $vid = cheerio.load(video.data)


    let urlvid = $vid.html("body > script:nth-child(2)").replace("jwplayer('arsipin')","'Jwplayer'")
    .replace("playerInstance.setup","loadvideoplayer")
    .replace('<script type="text/javascript">',"").replace("</script>","").toString()
    // console.log(urlvid)
    const script = document.createElement("script")
    script.innerHTML = urlvid
    const player = document.getElementById("head")
    player.appendChild(script)
// return urlvid
    const prevnext = []
    $("#venkonten > div.venser > div.venutama > div.prevnext > div.flir> a").each(function(){
        things = $(this).text()
        link = $(this).attr("href")

        console.log(things,link)
        
        prevnext.push({things,link})
    })

    console.log(prevnext)
    prevnext.forEach(things =>{
        const a = document.createElement("a")
        a.innerText = things.things
        a.onclick = function(){go(things.link)}
        a.classList.add("flir") 
        a.style.color = "#fff"
        a.style.backgroundColor = "#171616"
        const vidplayer = document.getElementById("videoplay")
        vidplayer.appendChild(a)
    })
}
loadplayer()
async function load(){
    const cheerio = require("cheerio");
    const axios = require("axios")
    let res = await axios.get(url)
    let $ = cheerio.load(res.data)

    const title = $("#venkonten > div.venser > div.venutama > div.download >h4").text()
    console.log(title)
    ipc.send("odanimeeps",{title})

    const topelement = document.createElement("h3")
    topelement.innerHTML = `${title}`


//     <ul>
//     <li>
//         <div class="row">
//             <div class="col-md-12" style="background-color: #111; height: 50px; font-size: 40px;">
//                 <strong>Judul</strong>
//             </div>
//         </div>
//         <div class="row">
//                 <div class="col-md-6" style="text-align: left;">Div1</div>
//                 <div class="col-md-6" style="text-align: right;">Div2</div>
//         </div>
//     </li>
// </ul>

    const dl = document.getElementById("dl")
    dl.appendChild(topelement)

    let dlurl = []
    
    $("#venkonten > div.venser > div.venutama > div.download").find("ul").each(function(){
        const ul = document.createElement("ul")
        dl.appendChild(ul)

        $(this).find("li").each(function(){
        const li = document.createElement("li")
        ul.appendChild(li)
        //resolution
        res = $(this).find("strong").text()
        console.log(res)


        const strong = document.createElement("strong")
        strong.innerHTML = `${res}`
        li.appendChild(strong)

        $(this).find("a").each(function(){


            plat = $(this).text()
            link = $(this).attr("href")
            dlurl.push({plat,
            link,})

            const a = document.createElement("a")
            a.innerHTML = `<a onclick="dln('${link}')">   ${plat}   `
            // a.href = link
            // a.onclick = function(){dln(link)}
            a.style.lineHeight = "25px"
            a.classList.add("dl")
            li.appendChild(a)
        })
        size = $(this).find("i").text()
        console.log(size)

        const sizea = document.createElement("i")
        sizea.innerText = size
        // sizea.style.marginRight = "10%"

        li.appendChild(sizea)
    
        const space = document.createElement("br")
        li.appendChild(space)
    })
    const ulspace = document.createElement("br")
    ul.append(ulspace)
    ul.append(ulspace)
    ul.append(ulspace)
    })
    // console.log(dlurl)
}

load()

function go(url){
    console.log(url)

    if(url.includes("/anime/")){
        localStorage.setItem("url",url)
        window.location.href="../eps/index.html"
    }else{
        localStorage.setItem("url",url)
        window.location.href="./index.html"
    }
}




async function dln(url){
    // zippymodule
// close 
 console.log(url)       
// url.select()

ipc.send("send",{url})
const copied = document.createElement("h3")
copied.innerText = url + "\n Copied To The Clipboard"
copied.value = url
copied.classList.add("text-center")

const copi = document.getElementById("copi")
copi.appendChild(copied)


setTimeout(() => {
    copied.remove()
}, 3000);

//temptext

var tempText = document.createElement('textarea');
tempText.value = url;
document.body.appendChild(tempText);
tempText.select();
document.execCommand('copy');
document.body.removeChild(tempText);
    }