let instance = null;

class HttpService {

  constructor() {
    // enforce singelton
    if(!instance){
      instance = this;
    }
    return instance;
  }

  get(url, queryObject) {
    let headers = new Headers();
    const q = queryObject ? this.buildQueryString(queryObject) : '';

    return fetch(url + q)
      .then( (response) => response.json() );
  }

  post(url, data, queryObject) {
    let headers = new Headers();
    const q = queryObject ? this.buildQueryString(queryObject) : '';

    return fetch(url + q, {
      method: 'post',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody(data)
    })
    .then( (response) => response.json() );
  }

  buildQueryString(queryObject) {
    return Object.keys(queryObject).reduce( (acc, key) => {
      return `${acc}&${key}=${queryObject[key]}`;
    }, '?')
  }

  encodeBody(data) {
    return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
  }

}

export default HttpService;
