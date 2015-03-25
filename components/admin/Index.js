'use strict';
var React = require('react');

var Index = React.createClass({

  propTypes: {
    //scroll: React.PropTypes.bool
  },

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
  },

  componentWillUnmount: function(){
  },

  handleClick: function(e){
    console.log(this);
  },

  render: function(){
    return (
        <div onClick={this.handleClick}>Hello Admin Index</div>
    );
  }
});

module.exports = Index;