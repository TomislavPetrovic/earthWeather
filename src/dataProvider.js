export async function getWeatherData(latitude, longitude) {
    try {
        const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        const data = await resp.json()
        return data;
    } catch (error) {
        console.log("Error log: ",error)
    }
}


export async function getCityCoordinates(cityName) {
    try {
        const resp = await fetch(`https://geocode.maps.co/search?q=${cityName}`)
        const data = await resp.json()
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        return {latitude, longitude};
    } catch (error) {
        console.log("Error log: ",error)
    }
}


export async function getCityByCoordinates(latitude, longitude) {
    try {
        const resp = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        const data = await resp.json()
        return data.city;
    } catch (error) {
        console.log("Error log: ",error)
    }
}
