import { validateIP, addTileLayer, getAddress, addOffset } from "./helpers";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../images/icon-location.svg";

//global
const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");
btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

//Work with Maps
const mapArea = document.querySelector(".map");
var map = L.map(mapArea).setView([37.422, -122.084], 13);
addTileLayer(map);
var greenIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40], // size of the icon
});
// let marker = L.marker([37.422, -122.084], { icon: greenIcon }).addTo(map);
// marker.bindPopup("<b>Google LLC</b><br>37.42, -122.08");

//functions
function handleKey(e) {
  if (e.code === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const {
    ip,
    location: { city, region, country, timezone, lat = "", lng = "" },
    isp,
  } = mapData;
  console.log(mapData);
  ipInfo.innerText = ip;
  locationInfo.innerText = `${city}, ${region}, ${country}`;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = isp;

  map.setView([lat, lng]);
  let marker = L.marker([lat, lng], { icon: greenIcon }).addTo(map);
  marker.bindPopup(`<b>${city}</b><br> ${lat.toFixed(2)}, ${lng.toFixed(2)}`);

  if (window.matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

async function getData() {
  const ip = ipInput.value;
  if (validateIP(ip)) {
    let data = await getAddress(ip);
    setInfo(data);
  }
  //   ipInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("8.8.8.8").then(setInfo);
});
