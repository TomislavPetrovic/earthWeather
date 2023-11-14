const sceneElement = document.getElementById("scene");
const cityListElement = document.getElementById("list");
const cityNameElement = document.getElementById("cityNameText");
const cityAddByNameButtonElement = document.getElementById("addByNameButton");
const cityLatitudeElement = document.getElementById("latitude");
const cityLongitudeElement = document.getElementById("longitude");
const cityAddByCoordinatesButtonElement = document.getElementById("addByCoordinatesButton");

export function addToCityListDOM(cityName, latitude, longitude, temperature, windSpeed){
    const dataRow = document.createElement("tr");
    dataRow.innerHTML = `<td>${cityName}</td>
    <td>${latitude}</td>
    <td>${longitude}</td>
    <td>${temperature}</td>
    <td>${windSpeed}</td>`;
    cityListElement.appendChild(dataRow);
    
}

export function getSceneElement(){
    return sceneElement;
}

export function setButtonByNameListener(callback){
    cityAddByNameButtonElement.addEventListener("click", callback);
}

export function setButtonByCoordinatesListener(callback){
    cityAddByCoordinatesButtonElement.addEventListener("click", callback);
}

export function getCityTextName(){
    return cityNameElement.value;
}

export function getCityTextCoordinates(){
    const latitude = parseFloat(cityLatitudeElement.value);
    const longitude = parseFloat(cityLongitudeElement.value);
    return {latitude, longitude};
}