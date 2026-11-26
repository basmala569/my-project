 const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";
const NASA_NEW_APOD_URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";
const LAUNCHES_URL = "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10";
const PLANETS_URL = "https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,true&order=semimajorAxis,asc";
 
const PLANET_NAMES = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
 
const PLANET_COLORS = {
 mercury: "#a8a29e",
 venus: "#d9a66b",
 earth: "#3b82f6",
 mars: "#dc6545",
 jupiter: "#c58b62",
 saturn: "#d8c08c",
 uranus: "#7dd3d9",
 neptune: "#4169d8"
};
 
const fallbackPlanets = [
 { id:"mercury", name:"Mercury", distance:0.39, radius:2439.7, mass:"3.30 × 10²³ kg", density:5.43, orbit:87.97, rotation:1407.6, moons:0, gravity:3.7, discoverer:"Known since antiquity", discovery:"Ancient", type:"Terrestrial", volume:"60.8 billion km³", perihelion:46.0, aphelion:69.8, eccentricity:0.2056, inclination:7.00, tilt:0.03, temp:167, escape:4.25, diameter:4879, massEarth:0.055, facts:["Smallest planet in the Solar System","Has extreme temperature changes","Completes an orbit in only 88 Earth days"] },
 { id:"venus", name:"Venus", distance:0.72, radius:6051.8, mass:"4.87 × 10²⁴ kg", density:5.24, orbit:224.7, rotation:-5832.5, moons:0, gravity:8.87, discoverer:"Known since antiquity", discovery:"Ancient", type:"Terrestrial", volume:"928 billion km³", perihelion:107.5, aphelion:108.9, eccentricity:0.0068, inclination:3.39, tilt:177.4, temp:464, escape:10.36, diameter:12104, massEarth:0.815, facts:["Hottest planet in our Solar System","Rotates in the opposite direction to most planets","Has a very dense carbon dioxide atmosphere"] },
 { id:"earth", name:"Earth", distance:1, radius:6371, mass:"5.97 × 10²⁴ kg", density:5.51, orbit:365.25, rotation:23.93, moons:1, gravity:9.81, discoverer:"Known since antiquity", discovery:"Ancient", type:"Terrestrial", volume:"1.08 trillion km³", perihelion:147.1, aphelion:152.1, eccentricity:0.0167, inclination:0, tilt:23.44, temp:15, escape:11.2, diameter:12742, massEarth:1, facts:["Only known planet with liquid water on its surface","Atmosphere contains about 78% nitrogen","Magnetic field helps protect the planet from solar wind"] },
 { id:"mars", name:"Mars", distance:1.52, radius:3389.5, mass:"6.42 × 10²³ kg", density:3.93, orbit:687, rotation:24.62, moons:2, gravity:3.71, discoverer:"Known since antiquity", discovery:"Ancient", type:"Terrestrial", volume:"163 billion km³", perihelion:206.7, aphelion:249.2, eccentricity:0.0934, inclination:1.85, tilt:25.19, temp:-65, escape:5.03, diameter:6779, massEarth:0.107, facts:["Home to Olympus Mons, a giant volcano","Has two small moons named Phobos and Deimos","Evidence shows that liquid water existed on its surface in the past"] },
 { id:"jupiter", name:"Jupiter", distance:5.2, radius:69911, mass:"1.90 × 10²⁷ kg", density:1.33, orbit:4332.6, rotation:9.93, moons:95, gravity:24.79, discoverer:"Known since antiquity", discovery:"Ancient", type:"Gas Giant", volume:"1.43 × 10¹⁵ km³", perihelion:740.6, aphelion:816.4, eccentricity:0.0489, inclination:1.30, tilt:3.13, temp:-110, escape:59.5, diameter:139820, massEarth:317.8, facts:["Largest planet in the Solar System","The Great Red Spot is a giant storm","Has a faint ring system"] },
 { id:"saturn", name:"Saturn", distance:9.58, radius:58232, mass:"5.68 × 10²⁶ kg", density:0.69, orbit:10759, rotation:10.7, moons:146, gravity:10.44, discoverer:"Known since antiquity", discovery:"Ancient", type:"Gas Giant", volume:"827 trillion km³", perihelion:1357.6, aphelion:1506.5, eccentricity:0.0565, inclination:2.49, tilt:26.73, temp:-140, escape:35.5, diameter:116460, massEarth:95.2, facts:["Famous for its bright rings","Has a very low average density","Its moon Titan has lakes of liquid methane"] },
 { id:"uranus", name:"Uranus", distance:19.2, radius:25362, mass:"8.68 × 10²⁵ kg", density:1.27, orbit:30687, rotation:-17.2, moons:28, gravity:8.69, discoverer:"William Herschel", discovery:"1781", type:"Ice Giant", volume:"68.3 trillion km³", perihelion:2732.7, aphelion:3001.4, eccentricity:0.046, inclination:0.77, tilt:97.77, temp:-195, escape:21.3, diameter:50724, massEarth:14.5, facts:["Rotates on its side","Has a blue-green color from methane in its atmosphere","Experiences seasons that last many years"] },
 { id:"neptune", name:"Neptune", distance:30.05, radius:24622, mass:"1.02 × 10²⁶ kg", density:1.64, orbit:60190, rotation:16.1, moons:16, gravity:11.15, discoverer:"Johann Galle", discovery:"1846", type:"Ice Giant", volume:"62.5 trillion km³", perihelion:4471.1, aphelion:4558.9, eccentricity:0.009, inclination:1.77, tilt:28.32, temp:-200, escape:23.5, diameter:49244, massEarth:17.1, facts:["Most distant planet from the Sun","Has some of the fastest winds in the Solar System","Was first located through mathematical predictions"] }
];
 
let planets = [...fallbackPlanets];
let currentPlanet = "earth";
let currentApodImage = "";
let launchItems = [];
 
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
 
const setText = (id, value) => {
 const node = document.getElementById(id);
 if (node) node.textContent = value ?? "—";
};
 
const escapeHTML = (value = "") =>
 String(value).replace(/[&<>"']/g, char => ({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#39;"
 }[char]));
 
const formatNumber = value =>
 Number.isFinite(Number(value))
  ? Number(value).toLocaleString("en-US", {maximumFractionDigits: 2})
  : "—";
 
const safeDate = value => {
 const date = new Date(value);
 return Number.isNaN(date.getTime())
  ? "Date to be announced"
  : date.toLocaleDateString("en-US", {
     year:"numeric",
     month:"short",
     day:"numeric",
     timeZone:"UTC"
    });
};
 
const safeTime = value => {
 const date = new Date(value);
 return Number.isNaN(date.getTime())
  ? "TBD"
  : date.toLocaleTimeString("en-US", {
     hour:"2-digit",
     minute:"2-digit",
     timeZone:"UTC",
     hour12:false
    }) + " UTC";
};
 
async function fetchJSON(url) {
 const response = await fetch(url, {
  headers:{Accept:"application/json"}
 });
 
 if (!response.ok) {
  throw new Error(`Request failed (${response.status})`);
 }
 
 return response.json();
}
 
function showLoading(container, message = "Loading data...") {
 if (container) {
  container.innerHTML = `
   <div class="loading-state">
    <i class="fas fa-spinner fa-spin"></i>
    <p>${escapeHTML(message)}</p>
   </div>`;
 }
}
 
function showError(container, message) {
 if (container) {
  container.innerHTML = `
   <div class="error-state">
    <i class="fas fa-circle-exclamation"></i>
    <p>${escapeHTML(message)}</p>
   </div>`;
 }
}
 
function initNavigation() {
 const sidebar = $("#sidebar");
 const toggle = $("#sidebar-toggle");
 
 const overlay = document.createElement("div");
 overlay.className = "sidebar-overlay";
 document.body.appendChild(overlay);
 
 const closeSidebar = () => {
  sidebar?.classList.remove("sidebar-open");
  overlay.classList.remove("visible");
 };
 
 toggle?.addEventListener("click", () => {
  sidebar?.classList.toggle("sidebar-open");
  overlay.classList.toggle("visible");
 });
 
 overlay.addEventListener("click", closeSidebar);
 
 $$(".nav-link").forEach(link => {
  link.addEventListener("click", event => {
   event.preventDefault();
 
   const target = link.dataset.section;
 
   if (!target) return;
 
   $$(".app-section").forEach(section => {
    section.classList.toggle("hidden", section.id !== target);
   });
 
   $$(".nav-link").forEach(item => {
    item.classList.remove("bg-blue-500/10", "text-blue-400");
    item.classList.add("text-slate-300");
   });
 
   link.classList.add("bg-blue-500/10", "text-blue-400");
   link.classList.remove("text-slate-300");
 
   closeSidebar();
   window.scrollTo({top:0, behavior:"smooth"});
  });
 });
}
 function normalizeApod(raw) {
 const item = Array.isArray(raw) ? raw[0] : raw;
 
 if (!item) {
  throw new Error("No APOD data was returned.");
 }
 
 const title = item.title?.rendered || item.title || item.post_title || "Astronomy Picture of the Day";
 
 const explanation = item.explanation || item.description || item.content?.rendered || item.excerpt?.rendered || item.caption || "NASA's Astronomy Picture of the Day.";
 
 const image = item.url || item.image_url || item.image || item.hdurl || item.thumbnail_url || item.featured_image || item.guid?.rendered;
 
 const date = item.date?.slice?.(0,10) || item.apod_date || item.date || new Date().toISOString().slice(0,10);
 
 const mediaType = item.media_type || item.mediaType || (image ? "image" : "video");
 
 const copyright = item.copyright || item.image_credit || item.credit || "NASA";
 
 const cleanExplanation = String(explanation)
  .replace(/<[^>]*>/g, " ")
  .replace(/\s+/g," ")
  .trim();
 
 if (!image && !item.content?.rendered) {
  throw new Error("The APOD response did not include an image URL.");
 }
 
 return {
  title: typeof title === "string" ? title.replace(/<[^>]*>/g, "") : "Astronomy Picture of the Day",
  explanation: cleanExplanation,
  image,
  date,
  mediaType,
  copyright,
  hdurl:item.hdurl || image
 };
}
 
async function getApod(date) {
 try {
  const url = `${NASA_NEW_APOD_URL}?date=${encodeURIComponent(date)}`;
  return normalizeApod(await fetchJSON(url));
 } catch (newApiError) {
  const legacy = await fetchJSON(
   `${NASA_APOD_URL}?api_key=DEMO_KEY&date=${encodeURIComponent(date)}&thumbs=true`
  );
 
  return normalizeApod(legacy);
 }
}
 
async function loadApod(date = new Date().toISOString().slice(0,10)) {
 const image = $("#apod-image");
 const loading = $("#apod-loading");
 const container = $("#apod-image-container");
 const button = $("#load-date-btn");
 
 if (loading) loading.classList.remove("hidden");
 if (image) image.style.opacity = "0.35";
 if (button) button.disabled = true;
 
 try {
  const data = await getApod(date);
  const mediaURL = data.mediaType === "video" ? (data.image || "") : data.image;
 
  if (image && mediaURL) {
   image.src = mediaURL;
   image.alt = data.title;
   image.style.display = "block";
 
   image.onerror = () => {
    image.style.display = "none";
 
    if (container) {
     container.insertAdjacentHTML(
      "beforeend",
      `<div class="apod-image-fallback"><i class="fas fa-image text-6xl text-blue-300"></i></div>`
     );
    }
   };
 
   currentApodImage = data.hdurl || mediaURL;
  }
 
  setText("apod-title", data.title);
  setText("apod-explanation", data.explanation);
  setText("apod-copyright", data.copyright ? `© ${data.copyright}` : "NASA");
  setText("apod-date", `Astronomy Picture of the Day - ${safeDate(data.date)}`);
  setText("apod-date-detail", data.date);
  setText("apod-date-info", data.date);
  setText("apod-media-type", data.mediaType.charAt(0).toUpperCase() + data.mediaType.slice(1));
 
  const dateInput = $("#apod-date-input");
 
  if (dateInput) {
   dateInput.value = date;
   dateInput.max = new Date().toISOString().slice(0,10);
  }
 
  const dateLabel = $(".date-input-wrapper span");
 
  if (dateLabel) {
   dateLabel.textContent = safeDate(date);
  }
 
  if (data.mediaType === "video" && image) {
   image.alt = `${data.title} (video entry)`;
  }
 
 } catch (error) {
  console.error("APOD error:", error);
 
  setText("apod-title", "Unable to load space image");
 
  setText(
   "apod-explanation",
   "NASA's image service could not be reached right now. Check your internet connection and try again."
  );
 
  setText("apod-copyright", "NASA APOD");
 
 } finally {
  if (loading) loading.classList.add("hidden");
  if (image) image.style.opacity = "1";
  if (button) button.disabled = false;
 }
}
 function initApod() {
 const today = new Date().toISOString().slice(0,10);
 const dateInput = $("#apod-date-input");
 
 if (dateInput) {
  dateInput.max = today;
  dateInput.value = today;
 }
 
 $("#load-date-btn")?.addEventListener("click", () => {
  if (dateInput?.value) {
   loadApod(dateInput.value);
  }
 });
 
  const imageUrl = " https://tse1.mm.bing.net/th/id/OIP.h9ezp1d9AwKKpdS-JHYRqwHaEK?r=0&pid=Api&h=220&P=0";
 
function showCustomImage() {
 const image = $("#apod-image");
 
 if (image) {
  image.src = imageUrl;
  image.style.opacity = "1";
  image.classList.remove("hidden");
  currentApodImage = imageUrl;
 }
}
 
$("#today-apod-btn")?.addEventListener("click", showCustomImage);
 
showCustomImage();
 
 
 dateInput?.addEventListener("change", () => {
  if (dateInput.value) {
   loadApod(dateInput.value);
  }
 });
 
 const expandButton = $("#apod-image-container button");
 
 expandButton?.addEventListener("click", openImageLightbox);
 
 $("#apod-image")?.addEventListener("click", openImageLightbox);
 
 }
 
function openImageLightbox() {
 if (!currentApodImage) return;
 
 let lightbox = $("#image-lightbox");
 
 if (!lightbox) {
  lightbox = document.createElement("div");
  lightbox.id = "image-lightbox";
 
  lightbox.innerHTML = `
   <button type="button" aria-label="Close image">
    <i class="fas fa-times"></i>
   </button>
   <img alt="Astronomy image full resolution">
  `;
 
  document.body.appendChild(lightbox);
 
  lightbox.addEventListener("click", event => {
   if (
    event.target === lightbox ||
    event.target.closest("button")
   ) {
    lightbox.classList.remove("open");
   }
  });
 }
 
 $("img", lightbox).src = currentApodImage;
 lightbox.classList.add("open");
}
 
function getLaunchStatus(launch) {
 return launch.status?.abbrev || launch.status?.name || "TBD";
}
 
function getLaunchProvider(launch) {
 return launch.launch_service_provider?.name ||
  launch.launch_service_provider?.abbrev ||
  "Unknown provider";
}
 
function getLaunchRocket(launch) {
 return launch.rocket?.configuration?.full_name ||
  launch.rocket?.configuration?.name ||
  launch.name ||
  "Rocket";
}
 
function getLaunchLocation(launch) {
 return launch.pad?.name ||
  launch.pad?.location?.name ||
  "Location to be announced";
}
 
function getLaunchCountry(launch) {
 return launch.pad?.location?.country?.name || "—";
}
 
function launchImage(launch) {
 return launch.image?.image_url ||
  launch.image?.thumbnail_url ||
  launch.rocket?.configuration?.image_url ||
  "";
}
 function renderFeaturedLaunch(launch) {
 const name = launch.name || "Upcoming Launch";
 const status = getLaunchStatus(launch);
 const date = safeDate(launch.net || launch.window_start);
 const image = launchImage(launch);
 const provider = getLaunchProvider(launch);
 const rocket = getLaunchRocket(launch);
 const location = getLaunchLocation(launch);
 const country = getLaunchCountry(launch);
 const description = launch.mission?.description ||
  launch.mission?.name ||
  "No mission description available.";
 
 const container = $("#featured-launch");
 
 if (!container) return;
 
 container.innerHTML = `
  <div class="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
   <div class="grid md:grid-cols-2">
    <div class="h-64 md:h-full min-h-64 bg-slate-900 flex items-center justify-center">
     ${
      image
       ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(name)}" class="w-full h-full object-cover">`
       : `<div class="text-slate-500 text-center p-6">
           <i class="fas fa-rocket text-5xl mb-3"></i>
           <p>Launch image unavailable</p>
          </div>`
     }
    </div>
 
    <div class="p-6 md:p-8">
     <div class="flex items-center justify-between gap-3 mb-4">
      <span class="text-blue-400 text-sm font-semibold uppercase tracking-wider">
       Featured Launch
      </span>
      <span class="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs">
       ${escapeHTML(status)}
      </span>
     </div>
 
     <h3 class="text-2xl font-bold text-white mb-4">
      ${escapeHTML(name)}
     </h3>
 
     <div class="space-y-3 text-sm text-slate-300">
      <p>
       <i class="fas fa-calendar text-blue-400 w-6"></i>
       ${escapeHTML(date)}
      </p>
 
      <p>
       <i class="fas fa-building text-blue-400 w-6"></i>
       ${escapeHTML(provider)}
      </p>
 
      <p>
       <i class="fas fa-rocket text-blue-400 w-6"></i>
       ${escapeHTML(rocket)}
      </p>
 
      <p>
       <i class="fas fa-map-marker-alt text-blue-400 w-6"></i>
       ${escapeHTML(location)}
      </p>
 
      <p>
       <i class="fas fa-globe text-blue-400 w-6"></i>
       ${escapeHTML(country)}
      </p>
     </div>
 
     <p class="text-slate-400 text-sm mt-5 leading-relaxed">
      ${escapeHTML(description)}
     </p>
    </div>
   </div>
  </div>
 `;
}
 function renderLaunchCard(launch) {
 const name = launch.name || "Upcoming Launch";
 const status = getLaunchStatus(launch);
 const date = safeDate(launch.net || launch.window_start);
 const image = launchImage(launch);
 const provider = getLaunchProvider(launch);
 const rocket = getLaunchRocket(launch);
 const location = getLaunchLocation(launch);
 const country = getLaunchCountry(launch);
 
 return `
  <div class="launch-card bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all">
   <div class="h-48 bg-slate-900 flex items-center justify-center">
    ${
     image
      ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(name)}" class="w-full h-full object-cover">`
      : `<div class="text-slate-500 text-center">
          <i class="fas fa-rocket text-4xl mb-2"></i>
          <p>No image available</p>
         </div>`
    }
   </div>
 
   <div class="p-5">
    <div class="flex items-center justify-between gap-2 mb-3">
     <span class="text-xs text-blue-400 font-semibold">
      ${escapeHTML(status)}
     </span>
     <span class="text-xs text-slate-400">
      ${escapeHTML(date)}
     </span>
    </div>
 
    <h3 class="text-lg font-bold text-white mb-3">
     ${escapeHTML(name)}
    </h3>
 
    <div class="space-y-2 text-sm text-slate-400">
     <p>
      <i class="fas fa-building text-blue-400 w-5"></i>
      ${escapeHTML(provider)}
     </p>
 
     <p>
      <i class="fas fa-rocket text-blue-400 w-5"></i>
      ${escapeHTML(rocket)}
     </p>
 
     <p>
      <i class="fas fa-map-marker-alt text-blue-400 w-5"></i>
      ${escapeHTML(location)}
     </p>
 
     <p>
      <i class="fas fa-globe text-blue-400 w-5"></i>
      ${escapeHTML(country)}
     </p>
    </div>
   </div>
  </div>
 `;
}
 
async function loadLaunches() {
 const container = $("#launches-grid");
 
 if (!container) return;
 
 container.innerHTML = `
  <div class="col-span-full text-center py-10 text-slate-400">
   <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
   <p>Loading upcoming launches...</p>
  </div>
 `;
 
 try {
  const response = await fetch(LAUNCHES_URL);
 
  if (!response.ok) {
   throw new Error("Unable to load launches");
  }
 
  const data = await response.json();
  const launches = data.results || [];
 
  if (!launches.length) {
   container.innerHTML = `
    <p class="col-span-full text-center text-slate-400 py-10">
     No upcoming launches found.
    </p>
   `;
   return;
  }
 
  renderFeaturedLaunch(launches[0]);
 
  container.innerHTML = launches
   .slice(1)
   .map(renderLaunchCard)
   .join("");
 
 } catch (error) {
  container.innerHTML = `
   <p class="col-span-full text-center text-red-400 py-10">
    Unable to load launches. Please try again later.
   </p>
  `;
 
  console.error(error);
 }
}
 function formatMass(value) {
 if (value === null || value === undefined || value === "") {
  return "Unknown";
 }
 
 const number = Number(value);
 
 if (Number.isNaN(number)) {
  return String(value);
 }
 
 return number.toLocaleString() + " kg";
}
 
function normalizePlanet(planet) {
 return {
  name: planet.englishName || planet.name || "Unknown",
 
  mass: planet.mass?.massValue
   ? `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`
   : "Unknown",
 
  gravity: planet.gravity
   ? `${planet.gravity} m/s²`
   : "Unknown",
 
  radius: planet.meanRadius
   ? `${planet.meanRadius.toLocaleString()} km`
   : "Unknown",
 
  moons: planet.moons?.length ?? 0,
 
  image: planet.image || "",
 
  description: planet.description || "No description available."
 };
}
 
 function planetImageMarkup(name) {
    const images = {
        Mercury: " https://tse4.mm.bing.net/th/id/OIP.EmPcfRdSYfWzxa1RZhQmcwHaEo?r=0&pid=Api&h=220&P=0",
        Venus: "https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg",
        Earth: "https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg",
        Mars: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
        Jupiter: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
        Saturn: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
        Uranus: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
        Neptune: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg"
    };
 
    return images[name] || "";
}
 
 
function renderPlanetCard(planet) {
 const image = planetImageMarkup(planet.name);
 
 return `
  <div class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-5 hover:border-blue-500/50 transition-all">
 
   <div class="h-40 flex items-center justify-center mb-4">
    <img
     src="${image}"
     alt="${escapeHTML(planet.name)}"
     class="max-h-full max-w-full object-contain"
    >
   </div>
 
   <h3 class="text-xl font-bold text-center mb-3">
    ${escapeHTML(planet.name)}
   </h3>
 
   <div class="space-y-2 text-sm text-slate-400">
    <p>
     Gravity:
     <span class="text-white">
      ${escapeHTML(planet.gravity)}
     </span>
    </p>
 
    <p>
     Radius:
     <span class="text-white">
      ${escapeHTML(planet.radius)}
     </span>
    </p>
 
    <p>
 Moons:
<span class="text-white">
${Array.isArray(planet.moons) ? planet.moons.length : (Number(planet.moons) || 0)}
</span>
</p>
</div>
 
</div>
`;
}
 
 
  
async function loadPlanets() {
    const container = $("#planets-grid");
 
    if (!container) return;
 container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
container.style.gap = "20px";
container.style.alignItems = "start";
container.style.width = "100%";
 
 
    const fallback = [
        { name: "Mercury", englishName: "Mercury", meanRadius: 2439, gravity: 3.7, moons: [] },
        { name: "Venus", englishName: "Venus", meanRadius: 6051, gravity: 8.87, moons: [] },
        { name: "Earth", englishName: "Earth", meanRadius: 6371, gravity: 9.81, moons: [{}] },
        { name: "Mars", englishName: "Mars", meanRadius: 3389, gravity: 3.71, moons: [{}, {}] },
        { name: "Jupiter", englishName: "Jupiter", meanRadius: 69911, gravity: 24.79, moons: Array(95).fill({}) },
        { name: "Saturn", englishName: "Saturn", meanRadius: 58232, gravity: 10.44, moons: Array(146).fill({}) },
        { name: "Uranus", englishName: "Uranus", meanRadius: 25362, gravity: 8.69, moons: Array(28).fill({}) },
        { name: "Neptune", englishName: "Neptune", meanRadius: 24622, gravity: 11.15, moons: Array(16).fill({}) }
    ];
 
    try {
        const response = await fetch(PLANETS_URL);
 
        if (!response.ok) throw new Error("API error");
 
        const data = await response.json();
 
        const planets = (data.bodies || [])
            .filter(planet => planet.isPlanet)
            .sort((a, b) => {
                const order = [
                    "Mercury", "Venus", "Earth", "Mars",
                    "Jupiter", "Saturn", "Uranus", "Neptune"
                ];
 
                return order.indexOf(a.englishName) -
                    order.indexOf(b.englishName);
            })
            .map(normalizePlanet);
 container.classList.add("planets-grid");
 
        container.innerHTML = planets.length
            ? planets.map(renderPlanetCard).join("")
            : fallback.map(renderPlanetCard).join("");
 
    } catch (error) {
        console.error(error);
        container.innerHTML = fallback.map(renderPlanetCard).join("");
    }
}
 
 
function initApp() {
 initNavigation();
 initApod();
 loadLaunches();
 loadPlanets();
}
 
document.addEventListener("DOMContentLoaded", initApp);
  