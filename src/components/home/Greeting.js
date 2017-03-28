import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Greeting = ({ isAuthenticated, title}) => {

  const login = (
    <div>
      <h1>{title}</h1>
      <p>You need to be logged in to use this app.</p>
      <Link to="login" className="btn btn-primary btn-lg">Login</Link>
    </div>
  );

  const loggedIn = (
    <div>
      <h1>Tropicana Fulfilment Admin</h1>
      <p>You are logged in.</p>
      <Link to="transactions" className="btn btn-primary btn-lg">Show Transactions</Link>
    </div>
  )


  return (
    <div className="jumbotron">
      { isAuthenticated ? loggedIn : login }
    </div>
  )
};

Greeting.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Greeting;