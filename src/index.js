import Notiflix from 'notiflix';
import cardTpl from './card-tpl.hbs';
import ApiService from './search-service'


const refs = {
    input: document.querySelector('.input'),
    submitBtn: document.querySelector('input-btn'),
    gallery: document.querySelector(".gallery"),
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more')
}


const API_KEY = '37419057-9cd64d5bcafa6da667183f7e4';
const BASE_URL = 'https://pixabay.com/api/'

let renderredImgs = 0;
let maxImgs = 0;
let step = 0;
refs.loadMoreBtn.style.display = "none";

refs.form.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

const apiService = new ApiService();


function renderImgs(images) {
    refs.gallery.insertAdjacentHTML('beforeend', cardTpl(images))
}

async function onSearch(event) {
    try {
    event.preventDefault()
    resetBasic()
    apiService.query = refs.input.value;
    const answ = await apiService.fetchImg()
    if (answ.totalHits === 0) {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }
    renderredImgs = answ.hits.length;
    maxImgs = answ.totalHits;
    step = answ.hits.length;
    Notiflix.Notify.success(`Hooray! We found ${answ.totalHits} images`)
    refs.loadMoreBtn.style.display = "block";
    renderImgs(answ.hits)
    }
    catch (error) {
        Notiflix.Notify.failure(error)
    }

}

async function onLoadMore() {
    renderredImgs += step;
    const morePics = await apiService.fetchImg()
    renderImgs(morePics.hits)
    
    if ((maxImgs - renderredImgs) < 0) { 
        refs.loadMoreBtn.style.display = "none";
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
        return 
    }
}

function resetBasic() {
    refs.loadMoreBtn.style.display = "none";
    refs.gallery.innerHTML = '';
    apiService.resetPage()
}
