let bmks = localStorage.getItem("Newbmk")
// let bmks = localStorage.getItem("bmk")
let jsonbmk = JSON.parse(bmks)
console.log(jsonbmk)

async function loadall() {
  let index = 0
  document.getElementById("book").innerHTML = ``

  if (jsonbmk.length === 0) {
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }

  jsonbmk.forEach(bmk => {
    const div = document.createElement("div")
    div.classList.add("jumbotron")
    div.classList.add("shake")
    div.classList.add("mb-4")
    div.classList.add("animated")
    div.innerHTML = `
    <div class="card-body">
        <div class="clickable" onclick="openkomik('${bmk.url}')">
            <img class="icon" src="../assets/img/kc.png" style="height: 100px;width: 100px;">
            <h4 class="card-title">${bmk.title}</h4>
            <h3 class="text-muted card-subtitle mb-2"><b>${bmk.url}</b></h3>
        </div>
    </div>
`
// ="this.selectedIndex = jsonbmk[${index}].option" 
let status = document.createElement("div")
status.classList.add("row")
status.innerHTML = `
<div class="col-md-4">
    <h3>Status</h3>
    <select id="${index}_idoption"
        onchange="jsonbmk[${index}].option = this.options[this.selectedIndex].value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        <option>Not Selected</option>
        <option value="1">Reading</option>
        <option value="2">Dropped</option>
        <option value="3">Completed</option>
        <option value="4">Plan To Watch</option>
        <option value="5">Ongoing,Reading</option>
        <option value="6">Ongoing,Dropped</option>
        <option value="7">Complete,Reading</option>
        <option value="8">Complete,Dropped</option>
        <option value="9">Plan To Watch,Ongoing</option>
        <option value="10">Plan To Watch,Complete</option>
    </select>
    <br>
    <br>
    <h3>
        Progress
        <input type="number" value="${bmk.progread}" placeholder="Reading" style="width:125px"
            onchange="jsonbmk[${index}].progread = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        /
        <input type="number" value="${bmk.of}" placeholder="Of" style="width:125px"
            onchange="jsonbmk[${index}].of = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
    </h3>
    <h1>
        <input id="favoriteid${index}" onchange="jsonbmk[${index}].fav = this.checked; localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))" type="checkbox" style="width:25px;height:25px;"> <i class="fa fa-star"></i> Favorite </input>
    </h1>
</div>
<div class="col-md-4">
    <br>
    <button onclick="openkomik('${bmk.url}')" style="font-size:45px; border-radius:10px; width:175px"
        class="btn btn-primary" type="button">Open</button>
</div>
<div class="col-md-4">
    <button onclick="del('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Delete</button>
    <button onclick="dupe('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Duplicate</button>
    <br>
    <br>
    <button onclick="array_move(jsonbmk,${index},${index-1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Up <i class="fa fa-arrow-up"></i></button>
    <button onclick="array_move(jsonbmk,${index},${index+1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Down <i class="fa fa-arrow-down"></i></button>
</div>
</div>`
let script = document.createElement("script")
script.innerHTML = `
document.getElementById("${index}_idoption").options.selectedIndex = ${bmk.option};
document.getElementById("favoriteid${index}").checked = ${bmk.fav};

`
div.appendChild(status)
div.appendChild(script)
    index++
    document.getElementById("book").appendChild(div)

  });

  document.getElementById("cat").innerText = "Category : All"
}

async function loadfav() {
  let index = 0
  document.getElementById("book").innerHTML = ``

  if (jsonbmk.length === 0) {
    console.log("0")
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }

  jsonbmk.forEach(bmk => {
    if(bmk.fav !== true){
        index++
      return
    }
    const div = document.createElement("div")
    div.classList.add("jumbotron")
    div.classList.add("shake")
    div.classList.add("mb-4")
    div.classList.add("animated")
    div.innerHTML = `
    <div class="card-body">
        <div class="clickable" onclick="openkomik('${bmk.url}')">
            <img class="icon" src="../assets/img/kc.png" style="height: 100px;width: 100px;">
            <h4 class="card-title">${bmk.title}</h4>
            <h3 class="text-muted card-subtitle mb-2"><b>${bmk.url}</b></h3>
        </div>
    </div>
`
// ="this.selectedIndex = jsonbmk[${index}].option" 
let status = document.createElement("div")
status.classList.add("row")
status.innerHTML = `
<div class="col-md-4">
    <h3>Status</h3>
    <select id="${index}_idoption"
        onchange="jsonbmk[${index}].option = this.options[this.selectedIndex].value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        <option>Not Selected</option>
        <option value="1">Reading</option>
        <option value="2">Dropped</option>
        <option value="3">Completed</option>
        <option value="4">Plan To Watch</option>
        <option value="5">Ongoing,Reading</option>
        <option value="6">Ongoing,Dropped</option>
        <option value="7">Complete,Reading</option>
        <option value="8">Complete,Dropped</option>
        <option value="9">Plan To Watch,Ongoing</option>
        <option value="10">Plan To Watch,Complete</option>
    </select>
    <br>
    <br>
    <h3>
        Progress
        <input type="number" value="${bmk.progread}" placeholder="Reading" style="width:125px"
            onchange="jsonbmk[${index}].progread = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        /
        <input type="number" value="${bmk.of}" placeholder="Of" style="width:125px"
            onchange="jsonbmk[${index}].of = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
    </h3>
    <h1>
        <input id="favoriteid${index}" onchange="jsonbmk[${index}].fav = this.checked; localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))" type="checkbox" style="width:25px;height:25px;"> <i class="fa fa-star"></i> Favorite </input>
    </h1>
</div>
<div class="col-md-4">
    <br>
    <button onclick="openkomik('${bmk.url}')" style="font-size:45px; border-radius:10px; width:175px"
        class="btn btn-primary" type="button">Open</button>
</div>
<div class="col-md-4">
    <button onclick="del('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Delete</button>
    <button onclick="dupe('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Duplicate</button>
    <br>
    <br>
    <button onclick="array_move(jsonbmk,${index},${index-1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Up <i class="fa fa-arrow-up"></i></button>
    <button onclick="array_move(jsonbmk,${index},${index+1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Down <i class="fa fa-arrow-down"></i></button>
</div>
</div>`
let script = document.createElement("script")
script.innerHTML = `
document.getElementById("${index}_idoption").options.selectedIndex = ${bmk.option};
document.getElementById("favoriteid${index}").checked = ${bmk.fav};

`
div.appendChild(status)
div.appendChild(script)
    index++
    document.getElementById("book").appendChild(div)

  });

  if(document.getElementById("book").innerText == ``){
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }
  document.getElementById("cat").innerText = "Category : Favorite"
}

async function loadog() {
  let index = 0
  document.getElementById("book").innerHTML = ``

  if (jsonbmk.length === 0) {
    console.log("0")
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }

  jsonbmk.forEach(bmk => {
    if(bmk.option == 1 || bmk.option == 5 || bmk.option == 7){
    const div = document.createElement("div")
    div.classList.add("jumbotron")
    div.classList.add("shake")
    div.classList.add("mb-4")
    div.classList.add("animated")
    div.innerHTML = `
    <div class="card-body">
        <div class="clickable" onclick="openkomik('${bmk.url}')">
            <img class="icon" src="../assets/img/kc.png" style="height: 100px;width: 100px;">
            <h4 class="card-title">${bmk.title}</h4>
            <h3 class="text-muted card-subtitle mb-2"><b>${bmk.url}</b></h3>
        </div>
    </div>
`
// ="this.selectedIndex = jsonbmk[${index}].option" 
let status = document.createElement("div")
status.classList.add("row")
status.innerHTML = `
<div class="col-md-4">
    <h3>Status</h3>
    <select id="${index}_idoption"
        onchange="jsonbmk[${index}].option = this.options[this.selectedIndex].value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        <option>Not Selected</option>
        <option value="1">Reading</option>
        <option value="2">Dropped</option>
        <option value="3">Completed</option>
        <option value="4">Plan To Watch</option>
        <option value="5">Ongoing,Reading</option>
        <option value="6">Ongoing,Dropped</option>
        <option value="7">Complete,Reading</option>
        <option value="8">Complete,Dropped</option>
        <option value="9">Plan To Watch,Ongoing</option>
        <option value="10">Plan To Watch,Complete</option>
    </select>
    <br>
    <br>
    <h3>
        Progress
        <input type="number" value="${bmk.progread}" placeholder="Reading" style="width:125px"
            onchange="jsonbmk[${index}].progread = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        /
        <input type="number" value="${bmk.of}" placeholder="Of" style="width:125px"
            onchange="jsonbmk[${index}].of = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
    </h3>
    <h1>
        <input id="favoriteid${index}" onchange="jsonbmk[${index}].fav = this.checked; localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))" type="checkbox" style="width:25px;height:25px;"> <i class="fa fa-star"></i> Favorite </input>
    </h1>
</div>
<div class="col-md-4">
    <br>
    <button onclick="openkomik('${bmk.url}')" style="font-size:45px; border-radius:10px; width:175px"
        class="btn btn-primary" type="button">Open</button>
</div>
<div class="col-md-4">
    <button onclick="del('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Delete</button>
    <button onclick="dupe('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Duplicate</button>
    <br>
    <br>
    <button onclick="array_move(jsonbmk,${index},${index-1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Up <i class="fa fa-arrow-up"></i></button>
    <button onclick="array_move(jsonbmk,${index},${index+1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Down <i class="fa fa-arrow-down"></i></button>
</div>
</div>`
let script = document.createElement("script")
script.innerHTML = `
document.getElementById("${index}_idoption").options.selectedIndex = ${bmk.option};
document.getElementById("favoriteid${index}").checked = ${bmk.fav};

`
div.appendChild(status)
div.appendChild(script)
    index++
    document.getElementById("book").appendChild(div)

  }else{
    index++
  }
});

  if(document.getElementById("book").innerText == ``){
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }
  document.getElementById("cat").innerText = "Category : On Going"
}
async function loadd() {
  let index = 0
  document.getElementById("book").innerHTML = ``

  if (jsonbmk.length === 0) {
    console.log("0")
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }

  jsonbmk.forEach(bmk => {
    if(bmk.option == 2 || bmk.option == 6 || bmk.option == 8){
    const div = document.createElement("div")
    div.classList.add("jumbotron")
    div.classList.add("shake")
    div.classList.add("mb-4")
    div.classList.add("animated")
    div.innerHTML = `
    <div class="card-body">
        <div class="clickable" onclick="openkomik('${bmk.url}')">
            <img class="icon" src="../assets/img/kc.png" style="height: 100px;width: 100px;">
            <h4 class="card-title">${bmk.title}</h4>
            <h3 class="text-muted card-subtitle mb-2"><b>${bmk.url}</b></h3>
        </div>
    </div>
`
// ="this.selectedIndex = jsonbmk[${index}].option" 
let status = document.createElement("div")
status.classList.add("row")
status.innerHTML = `
<div class="col-md-4">
    <h3>Status</h3>
    <select id="${index}_idoption"
        onchange="jsonbmk[${index}].option = this.options[this.selectedIndex].value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        <option>Not Selected</option>
        <option value="1">Reading</option>
        <option value="2">Dropped</option>
        <option value="3">Completed</option>
        <option value="4">Plan To Watch</option>
        <option value="5">Ongoing,Reading</option>
        <option value="6">Ongoing,Dropped</option>
        <option value="7">Complete,Reading</option>
        <option value="8">Complete,Dropped</option>
        <option value="9">Plan To Watch,Ongoing</option>
        <option value="10">Plan To Watch,Complete</option>
    </select>
    <br>
    <br>
    <h3>
        Progress
        <input type="number" value="${bmk.progread}" placeholder="Reading" style="width:125px"
            onchange="jsonbmk[${index}].progread = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        /
        <input type="number" value="${bmk.of}" placeholder="Of" style="width:125px"
            onchange="jsonbmk[${index}].of = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
    </h3>
    <h1>
        <input id="favoriteid${index}" onchange="jsonbmk[${index}].fav = this.checked; localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))" type="checkbox" style="width:25px;height:25px;"> <i class="fa fa-star"></i> Favorite </input>
    </h1>
</div>
<div class="col-md-4">
    <br>
    <button onclick="openkomik('${bmk.url}')" style="font-size:45px; border-radius:10px; width:175px"
        class="btn btn-primary" type="button">Open</button>
</div>
<div class="col-md-4">
    <button onclick="del('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Delete</button>
    <button onclick="dupe('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Duplicate</button>
    <br>
    <br>
    <button onclick="array_move(jsonbmk,${index},${index-1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Up <i class="fa fa-arrow-up"></i></button>
    <button onclick="array_move(jsonbmk,${index},${index+1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Down <i class="fa fa-arrow-down"></i></button>
</div>
</div>`
let script = document.createElement("script")
script.innerHTML = `
document.getElementById("${index}_idoption").options.selectedIndex = ${bmk.option};
document.getElementById("favoriteid${index}").checked = ${bmk.fav};

`
div.appendChild(status)
div.appendChild(script)
    index++
    document.getElementById("book").appendChild(div)

  }else{
    index++
  }
});

  if(document.getElementById("book").innerText == ``){
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }
  document.getElementById("cat").innerText = "Category : Dropped"
}
async function loadptw() {
  let index = 0
  document.getElementById("book").innerHTML = ``

  if (jsonbmk.length === 0) {
    console.log("0")
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }

  jsonbmk.forEach(bmk => {
    if(bmk.option == 4 || bmk.option == 9 || bmk.option == 10){
    const div = document.createElement("div")
    div.classList.add("jumbotron")
    div.classList.add("shake")
    div.classList.add("mb-4")
    div.classList.add("animated") 
    div.innerHTML = `
    <div class="card-body">
        <div class="clickable" onclick="openkomik('${bmk.url}')">
            <img class="icon" src="../assets/img/kc.png" style="height: 100px;width: 100px;">
            <h4 class="card-title">${bmk.title}</h4>
            <h3 class="text-muted card-subtitle mb-2"><b>${bmk.url}</b></h3>
        </div>
    </div>
`
// ="this.selectedIndex = jsonbmk[${index}].option" 
let status = document.createElement("div")
status.classList.add("row")
status.innerHTML = `
<div class="col-md-4">
    <h3>Status</h3>
    <select id="${index}_idoption"
        onchange="jsonbmk[${index}].option = this.options[this.selectedIndex].value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        <option>Not Selected</option>
        <option value="1">Reading</option>
        <option value="2">Dropped</option>
        <option value="3">Completed</option>
        <option value="4">Plan To Watch</option>
        <option value="5">Ongoing,Reading</option>
        <option value="6">Ongoing,Dropped</option>
        <option value="7">Complete,Reading</option>
        <option value="8">Complete,Dropped</option>
        <option value="9">Plan To Watch,Ongoing</option>
        <option value="10">Plan To Watch,Complete</option>
    </select>
    <br>
    <br>
    <h3>
        Progress
        <input type="number" value="${bmk.progread}" placeholder="Reading" style="width:125px"
            onchange="jsonbmk[${index}].progread = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
        /
        <input type="number" value="${bmk.of}" placeholder="Of" style="width:125px"
            onchange="jsonbmk[${index}].of = this.value; console.log(jsonbmk[${index}]); localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))">
    </h3>
    <h1>
        <input id="favoriteid${index}" onchange="jsonbmk[${index}].fav = this.checked; localStorage.setItem('Newbmk',JSON.stringify(jsonbmk))" type="checkbox" style="width:25px;height:25px;"> <i class="fa fa-star"></i> Favorite </input>
    </h1>
</div>
<div class="col-md-4">
    <br>
    <button onclick="openkomik('${bmk.url}')" style="font-size:45px; border-radius:10px; width:175px"
        class="btn btn-primary" type="button">Open</button>
</div>
<div class="col-md-4">
    <button onclick="del('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Delete</button>
    <button onclick="dupe('${index}')" style="font-size:20px;" class="btn btn-primary" type="button">Duplicate</button>
    <br>
    <br>
    <button onclick="array_move(jsonbmk,${index},${index-1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Up <i class="fa fa-arrow-up"></i></button>
    <button onclick="array_move(jsonbmk,${index},${index+1})" style="font-size:20px;" class="btn btn-primary"
        type="button">Move Down <i class="fa fa-arrow-down"></i></button>
</div>
</div>`
let script = document.createElement("script")
script.innerHTML = `
document.getElementById("${index}_idoption").options.selectedIndex = ${bmk.option};
document.getElementById("favoriteid${index}").checked = ${bmk.fav};

`
div.appendChild(status)
div.appendChild(script)
    index++
    document.getElementById("book").appendChild(div)

  }else{
    index++
  }
});

  if(document.getElementById("book").innerText == ``){
    let h1 = document.createElement("h1")
    h1.innerText = "You Have No BookMark"
    h1.style.marginTop = "25%"
    document.getElementById("book").appendChild(h1)
  }
  document.getElementById("cat").innerText = "Category : Planned To Watch"
}
loadall()
async function openkomik(url) {
  console.log(url)
  localStorage.setItem("url", url)
  window.location.href = "../komik/index.html"
}

async function del(i) {
  jsonbmk.splice(i, 1);
  console.log(jsonbmk)
  localStorage.setItem("Newbmk", JSON.stringify(jsonbmk))
  window.location.href = ""
}

async function dupe(i) {
  const tocopy = jsonbmk[i]
  console.log(jsonbmk)
  // const copied = 
  const concat = jsonbmk.concat(tocopy)  
  localStorage.setItem("Newbmk", JSON.stringify(concat))
  window.location.href = ""
}

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length && old_index == new_index) {
    localStorage.setItem("Newbmk",JSON.stringify(arr))
    window.location.href = ""
    return
  }else if (new_index <= 0){
    localStorage.setItem("Newbmk",JSON.stringify(arr))
  window.location.href = ""
return
}
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  localStorage.setItem("Newbmk", JSON.stringify(arr))
  window.location.href = ""
};

const bokmark = document.getElementById("Bokmark")
let bmkname = "UnNamed BookMark"

// close 
document.querySelector("#Bokmark > div.modal-dialog > div.modal-content > div.modal-header > button.close")
  .addEventListener('click', function (e) {
    bokmark.style.display = "none"
  })

//yes
document.querySelector("#Bokmark > div.modal-dialog > div.modal-content > div.modal-footer > button#yes").addEventListener('click', function (e) {
    bokmark.style.display = "none"

    const bmk = localStorage.getItem("Newbmk")
    const url = JSON.parse(localStorage.getItem("BaseURL")).komikcast+"/komik/"+document.getElementById("https").value
    if (bmk == null) {
      localStorage.setItem("Newbmk", "[]")
    }

    let old = JSON.parse(localStorage.getItem("Newbmk"))
    if (url == "") {
      title = document.getElementById("name").value || bmkname
      url = "INVALID URL"
      old.push({
        url,
        title
      })
    } else {
        title = document.getElementById("name").value || bmkname
      old.push({
        url,
        title
      })
    }
    localStorage.setItem("Newbmk", JSON.stringify(old))
    bmkname = ""

    const h1 = document.createElement("h1")
    h1.innerText = "Bookmark Saved"
    h1.classList.add("text-center")
    document.getElementById("saved").appendChild(h1)

    setTimeout(() => {
      h1.remove()
    }, 3000);
  })

function Add() {
  bokmark.style.display = "block"
  document.getElementById("bmklink").innerText = JSON.parse(localStorage.getItem("BaseURL")).komikcast +"/komik/"
  let bmkname = document.getElementById("name")
  bmkname.value = ""
  let link = document.getElementById("https")
  link.value = ""
  bmkname.setAttribute("placeholder","Unnamed Bookmark")
}

document.getElementById("https").addEventListener("keypress",(e)=>{
  if(e.key == "/"){
    e.preventDefault()
  }else {

  }
})