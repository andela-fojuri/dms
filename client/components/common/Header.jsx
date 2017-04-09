import React, { } from 'react';
import { IndexLink } from 'react-router';
import Search from '../search/Search';
import UserLogout from '../user/UserLogout';

const Header = () => (
  <nav>
    <div className="nav-wrapper  blue-grey darken-4">
      <IndexLink to="/" className="brandLogo" activeClassName="active">DMS</IndexLink>
      <UserLogout />
      <Search />
    </div>
  </nav>
);

export default Header;
