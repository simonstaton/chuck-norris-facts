import React from 'react';
import Api from '../api';
import Memory from '../memory';
import view from './views/index';

class Index extends React.Component {

  state = {
    categories: []
  };

  static request() {
    return Api.get('categories');
  }

  componentWillMount() {
    const categories = Memory.get('categories'); // Stored in memory (either server or local cache)
    if (categories) {
      this.setState({categories});
    } else {
      Index.request().then(res => {
        this.setState({
          categories: res.data
        });
      });
    }
  }

  render(...args){
    return view.apply(this, args);
  }

};

export default Index;
