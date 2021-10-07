let mangas = []
console.log("yes")
const res = await axios.get(JSON.parse(localStorage.getItem("BaseURL")).mangadex +"/manga")
const json = await res.data

json.results.forEach(obj =>{
    if(obj.result !== "ok") return
    manganame = obj.data.attributes.title.en
    id = obj.data.id
    relationships = obj.relationships
    type = obj.data.type
    lastChapter = obj.data.attributes.lastChapter
    mangas.push({
        manganame,
        id,
        relationships,
        type,
        lastChapter
    })
})
console.log(mangas)
const coverobj = await getcover(url.mangadex.GetCoverByID+"?"+mangas.map(manga => `ids[]=${getcoverid(manga.relationships)}`).join("&"))
let mangacovers = []
coverobj.results.forEach(obj =>{
    const mangaid = getmangafromcoverobj(obj)
    mangacovers.push({"url":`https://uploads.mangadex.org/covers/${mangaid}/${obj.data.attributes.fileName}`,"mangaid":mangaid})
})
let newmangas = []
mangas.forEach(m =>{
    mangacovers.forEach(cover =>{
        if(m.id === cover.mangaid){
            newmangas.push({
                "manganame":m.manganame,
                "id":m.id,
                "cover":cover.url,
                "type":m.type,
                "lastChapter":m.lastChapter
            })
        }
    })
})
console.log(newmangas)


function getmangafromcoverobj(obj){
    let id = false
    obj.relationships.forEach(r=>{
        if(r.type === "manga"){
            id = r.id
        }
    })
    return id
}
async function getcover(url) {
    console.log(url)
    const res = await axios.get(url)

    const coverobj = await res.data

    return coverobj
}
function getcoverid(relation) {
    let id = false
    relation.forEach(r => {
        if (r.type === "cover_art") {
            id = r.id
        }
    });
    return id
}