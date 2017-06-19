import React from 'react';
import Helmet from 'react-helmet';

export default function() {
  return (
    <div>
      <Helmet
        title="Fact"
        meta={[
          {name: "description", content: "Fact..."}
        ]}
      />
      <p>{this.state.fact && this.state.fact.value}</p>
      <button onClick={this.getFact.bind(this)} className="button button-primary">New Fact</button>
    </div>
  );
};