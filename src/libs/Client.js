
const endpoints = {
  istanbul: "57d5ca1b47dde42bfbdc6a26",
  domain : "https://cors-anywhere.herokuapp.com/http://apimobile.reztoran.com/",
  restaurantsDetail : "v1/restaurant/detail",
  restaurantsMenu : "v1/restaurant/menu",
  restaurants : "v1/search/restaurants",
}

const post = (endpoint, form = null, header = null) => {
  return fetch(endpoints.domain + endpoint, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(form),
    headers: {
      'Access-Control-Allow-Origin':'*',
      "X-api-token": "q2KVBxYyy",
      "X-guest-token": "bcdcf7d0-2d8b-42a3-9eab-02f52011b662",
      "X-platform": "android",
    },
  }).then(res => res.json());
}

module.exports = {
  post,
  endpoints,
}