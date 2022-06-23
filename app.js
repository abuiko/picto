const key = config.MY_API_KEY;

const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")
const more = document.querySelector(".more")
const popularLinks = document.querySelectorAll(".popular-tag a")

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
popularLinks.forEach((link) => {
    link.addEventListener('click', () => {
        const tag = link.textContent.toLowerCase()
        searchPhotos(tag)
    })
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
            
            <div class="gallery-info">
                <p>${photo.photographer}</p>
                <a href=${photo.src.original} target="_blank">Open Full Size</a>
            </div>
            <img src=${photo.src.large}></img>
            <div class="size">
                <p><a href="#">Small</a></p>
                <p><a href="#">Medium</a></p>
                <p><a href="#">Large</a></p>
            </div>
            
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
