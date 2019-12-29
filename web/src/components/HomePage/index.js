import React from 'react';
import NavBar from '../Navbar/index'
import Posts from '../Posts/index'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';

function HomePage() {
  return (
    <div>
    <AppBar color="primary" position="static">
      <Toolbar>
        <TypoGraphy variant="h6"
          color="inherit"
        >
          My header
          
       </TypoGraphy>
       <NavBar/>
       

      </Toolbar>
    </AppBar>
    <Posts/>

  </div>  
  );
}

export default HomePage;
