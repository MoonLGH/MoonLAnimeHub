$("#venkonten > div.venser > div.venutama > div.download").find("ul").each(function(){
    const ul = document.createElement("ul")
    dl.appendChild(ul)

    $(this).find("li").each(function(){
    const li = document.createElement("li")
    ul.appendChild(li)
    //resolution
    res = $(this).find("strong").text()
    console.log(res)

    const row1= document.createElement("div")
    row1.classList.add("row")
    li.appendChild(row1)

    const colrow1 = document.createElement("div")
    colrow1.classList.add("col-md-12")
    colrow1.style.borderRadius = "25px"
    row1.appendChild(colrow1)

    const strongcolrow1 = document.createElement("strong")
    strongcolrow1.innerHTML = `${res}`
    colrow1.appendChild(strongcolrow1)

    //        <div class="row">
                    // <div class="col-md-6" style="text-align: left;">Div1</div>
                    // <div class="col-md-6" style="text-align: right;">Div2</div>
    //         </div>
    const row2= document.createElement("div")
    row2.classList.add("row")
    li.appendChild(row2)

    const colmd61row2 = document.createElement("div")
    colmd61row2.classList.add("col-md-6")
    // colmd61row2.style.textAlign = "center"
    colmd61row2.style.marginLeft = "10%"
    row2.appendChild(colmd61row2)

    $(this).find("a").each(function(){


        plat = $(this).text()
        link = $(this).attr("href")
        dlurl.push({plat,
        link,})

        const a = document.createElement("a")
        a.innerHTML = `   ${plat}   `
        a.href = link
        a.style.lineHeight = "25px"
        a.classList.add("dl")
        colmd61row2.appendChild(a)
    })
    size = $(this).find("i").text()
    console.log(size)

    const colmd62row2 = document.createElement("div")
    colmd62row2.classList.add("col-md-6")
    // colmd62row2.style.textAlign = "center"
    colmd62row2.style.right = "10%"

    row2.appendChild(colmd62row2)

    const sizea = document.createElement("i")
    sizea.innerText = size
    // sizea.style.marginRight = "10%"

    colmd62row2.appendChild(sizea)

    const space = document.createElement("br")
    li.appendChild(space)
})
const ulspace = document.createElement("br")
ul.append(ulspace)
ul.append(ulspace)
ul.append(ulspace)
})