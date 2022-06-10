const key = config.MY_API_KEY;

const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")
const more = document.querySelector(".more")

let searchValue;
let page = 1
let fetchLink;

// event listeners
searchInput.addEventListener("input", updateInput)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchPhotos(searchValue)
})
more.addEventListener('click', loadMore)

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
            
            <div class="gallery-info">
                <p>${photo.photographer}</p>
                <a href=${photo.src.original} target="_blank">Download</a>
            </div>
            <img src=${photo.src.large}></img>
            
        `
        gallery.appendChild(galleryImg)
    });
}

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchApi(fetchLink)
    generatePhotos(data)

}

async function searchPhotos(query) {
    clear()
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePhotos(data)
}

function clear() {
    gallery.innerHTML = ''
    searchInput.value = ""
}

async function loadMore() {
    page++
    const updateLink = fetchLink.slice(0, -1) + page
    const dataFetch = await fetchApi(updateLink)
    generatePhotos(dataFetch)
}


curatedPhotos()
