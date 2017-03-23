import React, { } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => (
  <nav className="nav-wrapper  blue-grey darken-4">
    <div className="brandLogo">
      <IndexLink to="/" activeClassName="active">DMS</IndexLink>
      {' | '}
      <Link to="/dashboard" activeClassName="active">dashboard</Link>
    </div>
  </nav>
  );

export default Header;
