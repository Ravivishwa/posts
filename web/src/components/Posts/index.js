import React from "react";
import AddNewPost from '../AddNewPost/index'
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { List } from "react-virtualized";
import { withStyles } from '@material-ui/core/styles';

const styles  = {
    card: {
        width: '75%',
        display: 'flex',
        height: '250px',
        margin: 'auto',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 270,
    },
};

const height = 850;
const rowHeight = 270;
const width = 1050;

class Posts extends React.Component {

    rowRenderer = ({ index, key, style }) => {
        let { posts,classes } = this.props
        // posts = posts.reverse();
        return (
          <div key={key} style={style}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={posts[index].data.media[0].image}
                    title={posts[index].data.media[0].description}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {posts[index].data.media[0].description}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {posts[index].description}...
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => this.props.getPost(posts[index].id)}>
                            Edit Post
                        </Button>
                        <Button size="small" color="primary" onClick={() => this.props.deletePost(posts[index].id)}>
                            Delete Post
                        </Button>
                    </CardActions>
                </div>
            </Card>
          </div>
        );
      };

    render(){
        const { open,closePopup,currentTite,currentDesc,imagePreviewUrl,update,postId,updatePost,addNewPost, } = this.props
        return (
            <div style={{ padding: "80px 0 0 0" }}>
                <List
                    rowCount={this.props.posts.length}
                    width={width}
                    height={height}
                    rowHeight={rowHeight}
                    rowRenderer={this.rowRenderer}
                    overscanRowCount={3}
                    style={{width:"100%"}}
                />
                <AddNewPost
                    open={open}
                    closePopup={closePopup}
                    addNewPost = {addNewPost}
                    currentTite = {currentTite}
                    currentDesc = {currentDesc}
                    imagePreviewUrl = {imagePreviewUrl}
                    update = {update}
                    postId = {postId}
                    updatePost = {updatePost}
                 />
            </div>
          );
    }
}

export default withStyles(styles)(Posts);
