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
    var View = this.props.data.child_view ? this.props.data.child_view : Router.RouteHandler;
    return (
      <div>
        <View data={this.props.data} />
      </div>
    );
  }
});

module.exports = Admin;