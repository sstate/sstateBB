'use strict';
var React = require('react');
var Router = require('react-router');
var Index = require('./Index');

var Admin = React.createClass({

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

  render: function(){
    var View = typeof window !== 'undefined' ? Router.RouteHandler : function() {
      return (<div></div>);
    };

    return (
      <div>
        <View />
      </div>
    );
  }
});

module.exports = Admin;