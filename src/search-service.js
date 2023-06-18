const axios = require('axios').default;

export default class ApiService {
    constructor() {
    this.page = 1;
    this.searchQuery = '';
}
async fetchImg() {
    const url = `https://pixabay.com/api/?key=37419057-9cd64d5bcafa6da667183f7e4&q='${this.query}'&image_type=photo&orientation=horizontal&min_height=427&min_width=640&page=${this.page}&per_page=40&safesearch=true`
    // console.log(url)
    // console.log(axios.get(url))
    const answ = await axios.get(url)
        // .then(response => response.json())
        // .then(data => {
        //     this.page += 1;
        //     console.log(this)
        //     return data;
        // });
    this.page += 1;
    return answ.data
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}