const url = localStorage.getItem("url")

async function load(){
    const cheerio = require("cheerio");
    const axios = require("axios")
    let res = await axios.get(url)
    let $ = cheerio.load(res.data)

    const title = $("#venkonten > div.venser > div.download > div > h4").text()
    console.log(title)

    document.getElementById("title").innerText= $("head > title").text()

    const topelement = document.createElement("h3")
    topelement.innerHTML = `${title}`

    const dl = document.getElementById("dl")
    dl.appendChild(topelement)

    let animeinfo = $.html("#venkonten > div.venser > div.animeinfo")

    document.getElementById("info").innerHTML = animeinfo.replace('<div class="animeinfo">',"").replace("</div>","").replaceAll("href","value")
    let dlurl = []
    
    $("#venkonten > div.venser > div.download > div").find("ul").each(function(){
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
            a.innerHTML = `<a onclick="dln('${link}')">${plat}`
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
}
load()

const electron = require("electron") 

const ipc = electron.ipcRenderer

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