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

