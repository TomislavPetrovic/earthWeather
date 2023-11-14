import * as dataProvider from "./dataProvider.js";
import * as domHandler from "./domHandler.js";
import * as threeScene from "./threeScene.js";

export default function app() {
    threeScene.createScene(domHandler.getSceneElement());
    domHandler.setButtonByNameListener(addNewCityByName);
    domHandler.setButtonByCoordinatesListener(addNewCityByCoordinates);
}

async function addNewCityByName() {
    //threeScene.addImageMarker(45, -14, 'images/pin.png', 0.05, `London20C`);
    const cityName = domHandler.getCityTextName();
    if (cityName) {
        const cityCoordinates = await dataProvider.getCityCoordinates(cityName);
        const cityWeather = await dataProvider.getWeatherData(
            cityCoordinates.latitude,
            cityCoordinates.longitude
        );

        domHandler.addToCityListDOM(cityName, cityCoordinates.latitude, cityCoordinates.longitude, cityWeather.current_weather.temperature, cityWeather.current_weather.windspeed);

        threeScene.addImageMarker(cityCoordinates.latitude, cityCoordinates.longitude, 'images/pin.png', 0.05, `${cityName}
        ${cityWeather.current_weather.temperature}`);
    }
}

async function addNewCityByCoordinates() {
    const cityCoordinates = domHandler.getCityTextCoordinates();
    const latitude = cityCoordinates.latitude;
    const longitude = cityCoordinates.longitude;
    if (latitude && longitude) {
        const cityName = await dataProvider.getCityByCoordinates(
            latitude,
            longitude
        );
        const cityWeather = await dataProvider.getWeatherData(
            latitude,
            longitude
        );

        domHandler.addToCityListDOM(cityName, latitude, longitude, cityWeather.current_weather.temperature, cityWeather.current_weather.windspeed);

        threeScene.addImageMarker(latitude, longitude, 'images/pin.png', 0.05, `${cityName}
        ${cityWeather.current_weather.temperature}`);
    }
}
