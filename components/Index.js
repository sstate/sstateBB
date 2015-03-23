'use strict';

var React = require('react');

var Login = React.createClass({

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
    return (
      <p>index {this.props.data.sessionUsername} {this.props.data.user_role}</p>
    );
  }
});

module.exports = Login;