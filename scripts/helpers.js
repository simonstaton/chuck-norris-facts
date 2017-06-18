class Helpers {
  static isClient = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export default Helpers;
