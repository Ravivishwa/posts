import React from 'react';
import axios from 'axios';
import NavBar from '../../components/Navbar'
import Posts from '../../components/Posts'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';

export default class HomePage extends React.Component {
    state = {
        posts: []
      }
    
      componentDidMount() {
        axios.get(`http://localhost:3001/posts`)
          .then(res => {
            const posts = res.data;
            this.setState({ posts });
          })
      }

  render() {
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
            <Posts posts={this.state.posts}/> 
      </div>
    )
  }
}