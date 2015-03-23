'use strict';
var React = require('react');

var Register = React.createClass({
  render: function () {
    return (
      <form action="/users/new" method="post">
        <input type="email" name="email" value="" placeholder="email" />
        <input type="username" name="username" value="" placeholder="username" />
        <input type="password" name="password" value="" placeholder="password" />
        <input type="hidden" name="crumb" value={this.props.data.crumb} />
        <button type="submit">register</button>
      </form>
    );
  }
});

module.exports = Register;
