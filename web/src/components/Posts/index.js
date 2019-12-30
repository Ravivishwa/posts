import React from "react";
import { Grid, Typography,ListItem } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {posts} from "../../dummy-post";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

export default class Posts extends React.Component {


  renderRow = ({ index, isScrolling, key, style}) => {
    console.log(this.props)
    const { posts } =   this.props
    return (
      <div key={key} style={style}>
        {/* <div>{this.props.posts[index].description}</div> */}
        {/* <div>{this.props.data[index].email}</div> */}
        <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={posts[index].data.media[0].image}
                  // image={post.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {/* {post.data.media[0].description} */}
                    {/* {post.description} */}
                  </Typography>
                  {/* <Typography component="p">{post.excerpt}</Typography> */}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
      </div>
    )
  }


  render() {
    return (
    <List
            rowCount={this.props.posts.length}
            rowHeight={50} width={300} height={300}
            rowRenderer={this.renderRow}
          />        
    );
  }
}

// function Posts(props) {
//     // const { posts } = props
//   return (
//     <div style={{ padding: 30 }}>
//       <List container spacing={6} justify="center">
//         {posts && posts.map((post,i) => (
//           <ListItem key={i} xs={3}>
            // <Card>
            //   <CardActionArea>
            //     <CardMedia
            //       component="img"
            //       alt="Contemplative Reptile"
            //       height="140"
            //       // image={post.data.media[0].image}
            //       image={post.image}
            //       title="Contemplative Reptile"
            //     />
            //     <CardContent>
            //       <Typography gutterBottom variant="h5" component="h2">
            //         {/* {post.data.media[0].description} */}
            //         {post.description}
            //       </Typography>
            //       <Typography component="p">{post.excerpt}</Typography>
            //     </CardContent>
            //   </CardActionArea>
            //   <CardActions>
            //     <Button size="small" color="primary">
            //       Share
            //     </Button>
            //     <Button size="small" color="primary">
            //       Learn More
            //     </Button>
            //   </CardActions>
            // </Card>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// }

