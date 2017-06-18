import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

export default function() {
  return (
    <div ref="_mounted">
      <Helmet
        title="Homepage"
        meta={[
          {name: "description", content: "Homepage..."}
        ]}
      />
      {this.state.categories.map((category, index) => {
        return <Link className="button" key={index} to={`/${category}`}>{category}</Link>
      })}
    </div>
  );
};
