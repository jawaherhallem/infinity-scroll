const imageContainer = document.getElementById('imager-container');
const loader = document.getElementById('loader')

let ready =false;
let imagesLoaded =0;
let totalImages = 0;
let photosArray =[];

// Unsplash API
const count = 5;
const apiKey = `PaJbY_zHk5NCocJt-31RIWp6IwVuPnU93uWuLuQf0bM`;
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}` ; 


function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
      count = 30
      apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }
  }

function setAttribute (element, attributs){
    for (const key in attributs){
        element.setAttribute(key , attributs[key]);
    }
}

// Create Elements For Links & Photos, 
function displayPhotos(){
    imagesLoaded = 0;
    totalImages =photosArray.length;
    // Run Function for each object in photosArray
        photosArray.forEach((photo) => {
            // Create <a> </a> to link Unsplash
            const item = document.createElement('a');
            item.setAttribute('href', photo.links.html);
            item.setAttribute('target', '_blank');
            // Create <img> for photo
            const img =document.createElement('img');
            img.setAttribute('src',photo.urls.regular);
            img.setAttribute('alt',photo.alt_description);
            img.setAttribute('title',photo.alt_description);

            // put <img> inside <a></a>, then put imageContainer Element
            img.addEventListener('load', imageLoaded)
            item.appendChild(img);
            imageContainer.appendChild(item);
        })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch (apiUrl);
        photosArray = await response.json();
        displayPhotos()
        console.log(photosArray)
    } catch (error){
        // Catch Error Here
    }
}


window.addEventListener('scroll',()=>{
    if (window.innerHeight + scrollY >= document.body.offsetWidth - 1000 && ready){
        ready = false;
        getPhotos();
        console.log()
    }
})

// On load
getPhotos();

