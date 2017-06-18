import React from 'react';
import Api from '../api';
import Memory from '../memory'
import view from './views/fact';

class Fact extends React.Component {

  state = {
    fact: []
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillReceiveProps(props) {
   this.props = props;
  }

  getFact() {
    Fact.request(this.props).then(res => {
      this.setState({
        fact: res.data
      });
    });
  }

  static request(props) {
    return Api.get('random', {category: props.params.category});
  }

  componentWillMount() {
    const fact = Memory.get('random'); // Stored in memory (either server or local cache)
    if (fact) {
      this.setState({fact});
    } else {
      this.getFact();
    }
  }

  render(...args){
    return view.apply(this, args);
  }

};

export default Fact;
