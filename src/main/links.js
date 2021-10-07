let links = localStorage.getItem("links");

if (!links) {
    localStorage.setItem("links", "[]")
}

let link = JSON.parse(links)

let linkel = document.getElementById("link")
if (links) {
    let index = 0
    link.forEach(link => {
        const controller = document.createElement("div")
        controller.innerHTML = `
        <textarea cols="50" rows="5" id="area${index}">${link}</textarea>
        <div class="col-md-4">
        <button onclick="del('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Delete</button>
        <button onclick="dupe('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Duplicate</button>
        <br>
        <br>
        <button onclick="array_move(link,${index},${index-1})" style="font-size:20px;" class="btn btn-primary"
            type="button">Move Up <i class="fa fa-arrow-up"></i></button>
        <button onclick="array_move(link,${index},${index+1})" style="font-size:20px;" class="btn btn-primary"
            type="button">Move Down <i class="fa fa-arrow-down"></i></button>
        </div>
        `
        const conscr = document.createElement("script")
        conscr.innerHTML = `
        document.getElementById("area${index}").addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                if (document.getElementById("area${index}").value !== "") {
                    change(document.getElementById("area${index}").value,${index})
                }
            } else {
                    change(document.getElementById("area${index}").value,${index})
            }
        })`
        controller.classList.add("jumbotron")
        linkel.appendChild(controller)
        linkel.appendChild(conscr)
        index++
    })
}
let toparea = document.getElementById("toplist")
toparea.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        if (toparea.value !== "") {
            topaddlist()
        }
    } else {
        // console.log(e)
    }
})

function topaddlist() {
    if (!links) {
        localStorage.setItem("links", "[]")
    }
    let topval = toparea.value

    link.push(topval)

    localStorage.setItem("links", JSON.stringify(link))
    window.location.reload()
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length && old_index == new_index) {
        localStorage.setItem("links", JSON.stringify(arr))
        window.location.href = ""
        return
    } else if (new_index <= 0) {
        localStorage.setItem("links", JSON.stringify(arr))
        window.location.href = ""
        return
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    localStorage.setItem("links", JSON.stringify(arr))
    window.location.reload()
};

async function del(i) {
    link.splice(i, 1);
    localStorage.setItem("links", JSON.stringify(link))
    window.location.href = ""
  }
  
  async function dupe(i) {
    const tocopy = link[i]
    const concat = link.concat(tocopy)  
    localStorage.setItem("links", JSON.stringify(concat))
    window.location.href = ""
  }
function change(val,i){
    link[i] = val
    localStorage.setItem("links", JSON.stringify(link))
    console.log(val,i)
}