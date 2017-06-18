import axios from 'axios';
import Memory from './memory';

// https://api.chucknorris.io/jokes/random
// https://api.chucknorris.io/jokes/random?category=religion
// https://api.chucknorris.io/jokes/categories
// https://api.chucknorris.io/jokes/search?query={query} << the joke/or part of it

// Abstraction layer
class Api {

  static endpoint = 'https://api.chucknorris.io/jokes';

  static get(key='categories', params={}) {
    return axios.get(`${Api.endpoint}/${key}`, params).then(res => {
      Memory.set(key, res.data);
      return {key, data: res.data};
    }).catch(err => {
      throw new Error(`Api: Unable to get ${key}`);
    });
  }

}

export default Api;
