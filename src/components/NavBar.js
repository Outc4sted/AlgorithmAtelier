import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';


const NavBar = () => (
  <nav>
    <Toolbar>
      <ToolbarGroup>
        <Link to="/">
          <ToolbarTitle text="Atelier" />
        </Link>
      </ToolbarGroup>
    </Toolbar>
  </nav>
);


export {NavBar as default};
