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
    var UserInfo = function(){
      if (this.props.data.twitter_user){
        return (
          <div>
            <p><img src={this.props.data.avatar_url} /> {this.props.data.twitter_user.screen_name} {this.props.data.user_role.name}</p>
          </div>
        );
      }
    }.bind(this);
    return (
      <div>
        <p>Index Page</p>
        {UserInfo()}
      </div>
    );
  }
});

module.exports = Login;