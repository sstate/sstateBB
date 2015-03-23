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
        <form method='post' action='/authenticate'>
          <input type='email' name='email' placeholder="email" required autofocus />
          <input type='password' name='password' placeholder="password" required />
          {this.props.data.error ? <p>this.props.data.error</p> : ''}
          <input type="hidden" name="crumb" value={this.props.data.crumb} />
          <button type="submit">log in</button>
        </form>
    );
  }
});

module.exports = Login;