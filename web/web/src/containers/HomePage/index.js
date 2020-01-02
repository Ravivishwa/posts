import React from 'react';
import axios from 'axios';
import Posts from '../../components/Posts'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

export default class HomePage extends React.Component {
    state = {
        posts: [],
        open:false,
        loading:true,
        file: '',
        imagePreviewUrl: '',
        currentTite:'',
        currentDesc:'',
        currentimage:'',
        update:false,
        postId:''
      }

      componentDidMount() {
        axios.get(`http://localhost:3001/posts`)
          .then(res => {
            const posts = res.data;
            this.setState({ posts,loading:false });
          })
      }

    openPopup = () => {
        this.setState({open:true})
    }

    closePopup = () => {
        this.setState({
            open:false,
            currentTite:'',
            currentDesc:'',
            currentimage:'',
            imagePreviewUrl:'',
            update:false,
            postId:''
        })
    }

    deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/`+ id)
            .then((res) => {
                let newPosts= this.state.posts.filter(post => post.id !== id);
                this.setState({ posts:newPosts});
            })
    }

    addNewPost = (data) => {
        axios.post("http://localhost:3001/posts", data, {
        }).then(res => {
            this.setState({ posts: [...this.state.posts, res.data] })
        })
    }

    updatePost = (data,id) => {
        axios.put("http://localhost:3001/posts/"+ id, data, {
        }).then(res => {
            const postIndex = this.state.posts.findIndex(post => post.id === id);
            let newPosts = [...this.state.posts]
            newPosts[postIndex] = res.data
            this.setState({
               ...this.state.posts,
                posts:newPosts
            })
        })
    }

    getPost = (id) => {
        this.openPopup()
        // let curentPost = this.state.posts.filter(x => x.id === id);
        // console.log(id)
        axios.get(`http://localhost:3001/posts/`+ id)
            .then((res) => {
                this.setState({
                    currentTite:res.data.data.media[0].description,
                    currentDesc:res.data.description,
                    imagePreviewUrl:res.data.data.media[0].image,
                    update:true,
                    postId:id
                });
            })
    }

    render() {
        const { loading,posts } = this.state
        return (
            <div>
                <AppBar color="primary" position="fixed">
                    <Toolbar>
                        <TypoGraphy variant="h6"
                        color="inherit"
                        >
                        Impacter's Posts
                        </TypoGraphy>
                        <div style={{marginLeft:"16px"}}>
                            <Fab size="small" color="secondary" onClick={() => this.openPopup()}>
                                <AddIcon />
                            </Fab>
                        </div>
                    </Toolbar>
                </AppBar>
                {loading ?
                    <CircularProgress style={{position: 'absolute',top: '50%',left: '50%'}}/>
                    : <Posts posts={posts}
                        deletePost = {this.deletePost}
                        open={this.state.open}
                        getPost={this.getPost}
                        addNewPost = {this.addNewPost}
                        closePopup={this.closePopup}
                        currentTite = {this.state.currentTite}
                        currentDesc = {this.state.currentDesc}
                        imagePreviewUrl = {this.state.imagePreviewUrl}
                        update = {this.state.update}
                        postId = {this.state.postId}
                        updatePost = {this.updatePost}
                        />
                }
            </div>
        )
    }
}
