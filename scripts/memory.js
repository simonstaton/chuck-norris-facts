import Helpers from './helpers';

function _onClear() {
  const now = new Date().getTime();
  for (let key in Memory._data) {
    if (Memory._data[key].expiry < now) delete Memory._data[key];
  }
}

class Memory {

  static _data = {}; // Move this to a memory store

  static _clear = setInterval(_onClear, 1000*60*10); // Check memory every 10 minutes

  static get(key) {
    return Memory._data[key] ? Memory._data[key].val : null;
  }

  static set(key, val, ttl=1000*60*30) {
    const expiry = new Date().getTime() + ttl;
    Memory._data[key] = {val, expiry};
  }

  static delete(key) {
    delete Memory._data[key];
  }

  static hydrate(state) {
    for (let part of state) Memory.set(part.key, part.data);
  }

}

if (Helpers.isClient && window._state) {
  Memory.hydrate(window._state);

  // Clean up
  delete window._state;
  document.body.removeChild(document.getElementById('state-bootstrap'));
}

export default Memory;