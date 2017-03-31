import React, { } from 'react';
import { Link, IndexLink } from 'react-router';
import Search from '../search/Search';
import auth from '../../middlewares/authentication';

const Header = () => (
  <nav>
    <div className="nav-wrapper  blue-grey darken-4">
      <IndexLink to="/" className="brandLogo" activeClassName="active">DMS</IndexLink>
      <Link className="brandLogo" to="/dashboard" activeClassName="active">dashboard</Link>
      <Link id="logout" className="brandLogo right" to="/" onClick={auth.deauthenticateUser} activeClassName="active">logout</Link>
      <Search />
    </div>
  </nav>
);

export default Header;
