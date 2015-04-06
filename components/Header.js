'use strict';

var React = require('react');

var Header = React.createClass({

  propTypes: {
    data: React.PropTypes.object
  },

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
  },

  componentWillUnmount: function(){
  },

  render: function(){
    var data = this.props.data;
    return (
      <header className="banner">
        <div className="container">
          <div className="cf">
            {!data.session_id ?
              <ul className="list-unstyled list-inline cf pull-right">
                <li><a href="/auth/twitter" className="button button-primary">sign in with twitter</a></li>
              </ul>
              :
              <p className="pull-right spacing">Hi, {data.twitter_user.screen_name}! <a href="/logout">logout</a></p>
            }
          </div>
          <h1><a href="/">sstateBB</a></h1>
          <p>this is a bulletin booard</p>
        </div>
      </header>
    );
  }
});

module.exports = Header;