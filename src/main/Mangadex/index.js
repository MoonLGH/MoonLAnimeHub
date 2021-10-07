const homeselect = document.getElementById("homelook")
const searchselect = document.getElementById("searchselect")
let lsmd = localStorage.getItem("mdhome")
let objlsmd = JSON.parse(lsmd)

let select = {
    "homeselect": 0,
    "search": 0
}
if (!lsmd) {
    localStorage.setItem("mdhome", JSON.stringify(select))
}

select["homeselect"] = objlsmd["homeselect"]
select["search"] = objlsmd["search"]


function change(objname, value) {
    console.log(objname, value)
    objlsmd[objname] = value
    localStorage.setItem("mdhome", JSON.stringify(objlsmd))
}

homeselect.selectedIndex = select["homeselect"]
searchselect.selectedIndex = select["search"]

const axios = require("axios")



// load("a")
const mdurl = {
    mangadex: {
        baseurl: "https://api.mangadex.org/",

        manga: "https://api.mangadex.org/manga",

        GetChapterByID: "https://api.mangadex.org/chapter/",
        //https://api.mangadex.org/chapter/{id}

        GetAuthorByID: "https://api.mangadex.org/author/",
        // https://api.mangadex.org/author/{id}

        GetMangaByID: "https://api.mangadex.org/manga/",
        // https://api.mangadex.org/manga/{id}

        ping: "https://api.mangadex.org/ping",

        GetCoverByID: "https://api.mangadex.org/cover/",
        // https://api.mangadex.org/cover/{coverid}

        cover: "https://uploads.mangadex.org/covers/",

        lastestchapter: "https://api.mangadex.org/chapter?limit=30&offset=0&order[publishAt]=desc"

    }
}
async function load(home, urls) {
    document.getElementById("lc").innerHTML = "USE HAKUNEKO INSTEAD, IDK HOW TO MAKE THIS"
    // if (home === "Mangas") {
    //     let lc = await lastestchapter(urls)
    //     let lcdiv = document.createElement("div")
    //     let rows
    //     for (let i = 0; i < lc.results.length; i++) {
    //         const manga = lc.results[i];
    //         console.log(manga)
    //         rows += `
    //         <div class="utao">
    //               <div class="uta">
    //                   <div class="imgu"> <a rel="208093" class="series" href="https://komikcast.com/komik/aharen-san-wa-hakarenai/" title="${manga.data.attributes.title}">
  
    //                   <img width="210" height="300" src="https://komikcast.com/wp-content/uploads/2020/10/21374v7-e1602440639638.jpg" class="attachment-thumb size-thumb wp-post-image" alt="" loading="lazy"> </a></div>
    //                  <div class="luf">
    //                     <a class="series" href="https://komikcast.com/komik/aharen-san-wa-hakarenai/" title="Aharen-san wa Hakarenai">
    //                        <h3>${manga.data.attributes.title}</h3>
    //                     </a>
    //                        <ul class="Manga">

    //                        <li><a href="https://komikcast.com/chapter/aharen-san-wa-hakarenai-chapter-78-bahasa-indonesia/">${manga.data.attributes.chapter}</a><span><i>${new Date(Date.now() - Date.parse(manga.data.attributes.createdAt)).getMinutes() +" Minutes Ago"}</i></span></li>                 </ul>
    //                      </div>
    //               </div>
    //            </div>
    //         `
    //     }

    //     lcdiv.innerHTML = `<div class="jumbotron">
    //     <div class="container swing animated mb-4">
    //       <div class="bixbox">
    //         <div class="releases">
    //           <h3><span>Lastest Anime</span></h3>
    //         </div>
    //         <div class="listupd project">
    //         ${rows}
    //         </div>
    //       </div>
    //     </div>
    //   </div>`

    //   document.getElementById("lc").appendChild(lcdiv)
    // }
}

async function lastestchapter(url) {
    const lastestchapter = await axios.get(url.mangadex.lastestchapter).then(res => res.data)
    console.log(lastestchapter)
    return lastestchapter
}


load(homeselect.options[select["homeselect"]].value, mdurl)