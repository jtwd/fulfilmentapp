import React, { Component } from 'react';
import { connect } from 'react-redux';

import Greeting from './Greeting';


class HomePage extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Greeting
        isAuthenticated={isAuthenticated}
        title="Tropicana Fulfilment Admin" />
    )
  }

}

/*
HomePage.propTypes = {
  auth: PropTypes.object.isRequired
};
*/

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(HomePage);
