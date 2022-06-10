const key = config.MY_API_KEY;

const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")

let searchValue;
// event listeners
searchInput.addEventListener("input", updateInput)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchPhotos(searchValue)
})

function updateInput(e) {
    searchValue = e.target.value
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: key
        }
    })
    const data = await dataFetch.json()

    return data
}

function generatePhotos(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `
            <img src=${photo.src.large}></img>
            <p>${photo.photographer}</p>
        `
        gallery.appendChild(galleryImg)
    });
}

async function curatedPhotos() {
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1")
    generatePhotos(data)

}

async function searchPhotos(query) {
    clear()
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`)
    generatePhotos(data)

}

function clear() {
    gallery.innerHTML = ''
}
// searchPhotos()
curatedPhotos()
