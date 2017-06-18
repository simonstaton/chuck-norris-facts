import React from 'react';
import { Link } from 'react-router';

class Base extends React.Component {
  render(){
    return (
      <div className="container vertical-center">
        <div className="columns">
          <header className="eight columns offset-by-two align-center">
            <Link to='/'><img src="images/logo.png" className="logo" /></Link>
            <h1>Chuck Norris Facts</h1>
          </header>
          <div className="ten columns offset-by-one align-center">
            {React.cloneElement(this.props.children, { test: 123 })}
          </div>
        </div>
      </div>
    );
  }
};

export default Base;
