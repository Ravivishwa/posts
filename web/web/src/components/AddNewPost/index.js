import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                    </IconButton>
                ) : null}
        </MuiDialogTitle>
    );
    });

    const DialogContent = withStyles(theme => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

    export default class AddNewPost extends React.Component{
        constructor (props) {
            super()
            this.state = {
                updatable: false,
                name: props.name,
                status: props.status,
                file: '',
                imagePreviewUrl: '',
                imageUrl:'',
                title:'',
                description:'',
                uploaded: false  ,
                currentTite:""
            };
          }

        //   componentWillMount(){
        //     this.setState({
        //         currentTite : this.props.currentTite
        //     });
        // }

        _handleSubmit(e) {
            e.preventDefault();
            const data = new FormData()
            data.append('file', this.state.file)
            axios.post("http://localhost:3001/upload", data, {
            }).then(res => {
                this.setState({
                    imageUrl: res.data.url,
                    uploaded:true
                  });
            })
        }

        _handleImageChange(e) {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
              this.setState({
                file: file,
                imagePreviewUrl: reader.result
              });
            }

            reader.readAsDataURL(file)
          }

        addPost = () => {
            var data = {
                "type":"IMAGES",
                "description":this.state.description,
                "data":{
                    "media":[{
                        "image":this.state.imageUrl,
                        "width":2500,
                        "height":1667,
                        "version":"2019-03-14",
                        "description":this.state.title}]
            }};
            this.props.addNewPost(data);
            this.props.closePopup()
        }

        updatePost = (id) => {
            var data = {
                "description":this.state.description,
                "data":{
                    "media":[{
                        "image":this.state.imageUrl,
                        "description":this.state.title}]
            }};
            this.props.updatePost(data,id);
            this.props.closePopup()
        }

        handleChange = (evt) => {
            const value = evt.target.value;
            this.setState({
              ...this.state,
              [evt.target.name]: value
            });
          }

        render(){
            let imagePreviewUrl = this.state.imagePreviewUrl ? this.state.imagePreviewUrl:this.props.imagePreviewUrl
            let $imagePreview = null;
            if (imagePreviewUrl) {
                $imagePreview = (<img src={imagePreviewUrl} />);
            } else {
                $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
            }
            return (
                <div>
                   <Dialog onClose={() => this.props.closePopup()} aria-labelledby="customized-dialog-title" open={this.props.open}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.props.closePopup()}>
                    {
                        this.props.update ? "Update Post" : "Add New Post"
                    }
                    </DialogTitle>
                    <DialogContent dividers>
                    <div className="previewComponent">
                        <form onSubmit={(e)=>this._handleSubmit(e)}>
                        <input className="fileInput"
                            type="file"
                            onChange={(e)=>this._handleImageChange(e)} />
                        <button className="submitButton"
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                        </form>
                        <div className="imgPreview">
                         {$imagePreview}
                        </div>
                        </div>
                        <FormControl fullWidth variant="outlined" style={{marginTop: "20px"}}
                        >
                            <InputLabel >title</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                labelWidth={40}
                                name="title"
                                // value = {this.props.currentTite}
                                onChange={(e) =>this.handleChange(e)}
                            />
                            </FormControl>
                             <FormControl fullWidth variant="outlined" style={{marginTop: "20px"}}>
                              <InputLabel >Description</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        labelWidth={80}
                                        multiline
                                        rows="4"
                                        name="description"
                                        // value = {this.props.currentDesc}
                                        onChange={this.handleChange}
                                        />
                             </FormControl>
                    </DialogContent>
                    <DialogActions>
                        {this.props.update ?
                            <Button autoFocus onClick={() => this.updatePost(this.props.postId)} color="primary">
                                Update
                            </Button>:
                            <Button autoFocus onClick={() => this.addPost()} color="primary">
                                Add
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
                </div>
        );
    }
}

