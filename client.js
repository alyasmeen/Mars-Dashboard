
let store = Immutable.Map({
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
});

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (attribute, newState) => {
    store = store.set(attribute, newState)
    console.log(store.get("apod"))
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App()
}

const buttons= ()=> {
  return store.get("rovers").map((rover)=> `<button onclick=getRover('${rover}')>${rover}</button>`).join("");
}


// create content
const App = () => {

    return `
        <header></header>
        <main>
            ${Greeting(store.get("user").name)}
            ${display()}
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

const displayRoverInfo= ()=> {
  return `
    <ul>
      <li><span>Rover name: </span>${store.get("apod").latest_photos[0].rover.name}
      <li><span>Launch date: </span>${store.get("apod").latest_photos[0].rover.launch_date}
      <li><span>Landing date: </span>${store.get("apod").latest_photos[0].rover.landing_date}
  	  <li><span>Status: </span>${store.get("apod").latest_photos[0].rover.status}
  	  <li><span>Date the most recent photo were taken: </span>${store.get("apod").latest_photos[0].earth_date}
  	  <li><span>Most recent photo: </span></li>
    </ul>
  `
}

const latestPhotos= ()=> store.get("apod").latest_photos.map((rover)=>{return `<img src="${rover.img_src}"/>`}).join("")

const display= ()=> {
  if (store.get("apod")){return `${buttons()}${displayRoverInfo()}${latestPhotos()}`}
  else {return "Loading"}
}

const getRover = (roverName) => {
  fetch(`http://localhost:3000/rovers/${roverName}`)
        .then((res) => {res.json()})
        .then(apod => {updateStore("apod", apod)});
}
getRover("opportunity")