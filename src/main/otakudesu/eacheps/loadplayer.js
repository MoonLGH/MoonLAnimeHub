function loadvideoplayer(title){
    let array = {title}
    console.log(array)
    console.log(array.title.sources[0].file)
    const vidurl = array.title.sources[0].file
    console.log("Loaded")

    const player = document.getElementById("player")
    player.src = vidurl
    player.poster = array.title.image
}

// const script = document.querySelector("head > script").onload