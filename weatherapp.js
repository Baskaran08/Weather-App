
const weatherform=document.getElementById("weatherform")
const inputbox=document.getElementById("inputbox")
let card=document.getElementById("card")
const apikey="86060b93cd711d1e06f2f42c2a85d6a5"

weatherform.addEventListener("submit",async event=>{

    event.preventDefault()
    const inputvalue=inputbox.value
    if(inputvalue){
        try{
            let data=await getWeatherData(inputvalue)
            console.log(data)
            displayWeather(data)
        }
        
        catch(error){
            Displayerror("Can't fetch the Weather")
        }
    }
    else{
        Displayerror("Enter the city")
    }
})
 

async function getWeatherData(city) {
    const apiurl1=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response= await fetch(apiurl1)

    if(!response.ok){
        throw new error("could not fetch the data")
    }
    return await response.json()
}

function displayWeather(data){
    let {name: city,main:{temp,humidity},weather:[{description,id}]}=data

    let h1element=document.createElement("h1")
    let tempelement=document.createElement("p")
    let humidityelement=document.createElement("p")
    let descriptionelement=document.createElement("p")
    let emojielement=document.createElement("p")

    card.textContent=""
    card.style.display="flex"


    h1element.id="cityDisplay"
    h1element.textContent=city
    tempelement.id="temperatureDisplay"
    tempelement.textContent=`${((temp-273.15)*9/5+32).toFixed(1)}F`
    humidityelement.id="humidityDisplay"
    humidityelement.textContent=`Humidity:${humidity}%`
    descriptionelement.id="descriptionDisplay"
    descriptionelement.textContent=description
    emojielement.id="emojiDisplay"
    emojielement.textContent=getEmoji(id)

    card.appendChild(h1element)
    card.appendChild(tempelement)
    card.appendChild(humidityelement)
    card.appendChild(descriptionelement)
    card.appendChild(emojielement)

}

function getEmoji(weatherid){

    switch(true){
        case (weatherid>=200&&weatherid<300):
            return "⛈️"
            break
        case (weatherid>=300&&weatherid<400):
            return "🌦️"
             break
        case (weatherid>=500&&weatherid<600):
            return "🌧️"
            break
        case (weatherid>=600&&weatherid<700):
            return "❄️"
            break
        case (weatherid>700&&weatherid<800):
            return "🌫️"
            break
        case (weatherid===800):
            return "🌞"
            break    
        case (weatherid>800&&weatherid<810):
            return "☁️"
            break

    }
}

function Displayerror(message){
    let errortext=document.createElement("p")
    errortext.id="errorDisplay"
    errortext.textContent=message

    card.textContent=""
    card.style.display="flex"
    card.appendChild(errortext)

}