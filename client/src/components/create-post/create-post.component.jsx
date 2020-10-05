import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import AddImgBtn from '../add-img-btn/add-img-btn.component';
import Spinner from '../spinner/spinner.component';
import { API_CALL } from '../../assets/api-call';
import './create-post.styles.scss';


const showErrorMsg = error => {
    const createPostError = document.querySelector('#create-post-error');
    createPostError.style.display='flex';
    createPostError.textContent = error;
};

const CreatePost = () => {
    const history = useHistory();
    let match = useRouteMatch();
    const path = match.path;

    const [ title, setTitle ] = useState(''); 
    const [ content, setContent ] = useState(''); 
    const [ postImg, setPostImg ] = useState('');
    const [ imgURL, setImgURL ] = useState('');
    const [ showSpinner, setShowSpinner ] = useState(false);


    useEffect(() => {
        // upload post only when imgURL is changed
        if(imgURL){
            fetch('/createpost', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                body: JSON.stringify({ title, content, imgURL })
            })
              .then(res => res.json())
              .then(newPost => {
                  setShowSpinner(false);
                  if(newPost.error){   // from backend
                    showErrorMsg(newPost.error);
                  }else{
                    // successfully upload new post 
                    showErrorMsg('');
                    history.push('/');
                  }
                })
              .catch(console.log);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgURL]);                                                       // (for dependencies warning)

    const setPostImgFile = file => setPostImg(file);  // input img data

    const onImgSubmit = () => {
        // set spinner on publish btn
        setShowSpinner(true);
        // upload file with FormData & fetch
        const formData = new FormData();
        // append data into formData obj (convert into a data format that can be sent to the backend)
        formData.append('file', postImg);
        formData.append('upload_preset', 'social-media-pic');   // cloudinary
        formData.append('cloud_name', 'jl');                    // cloudinary
        formData.append('folder', 'silhouette');
        
        if(!postImg){
            setShowSpinner(false);
            return showErrorMsg('Please add an image to your new post');
        }else{
            // upload img > get uploaded img url
            fetch(API_CALL.IMG_UPLOAD, {
                method: 'post',
                body: formData
            })
              .then(res => res.json())
              .then(postedImg => setImgURL(postedImg.secure_url))
              .catch(console.log);
        }
    }

    return (
    <div className='create-post-frame'>
        <div className='title-row'>
            <CreateIcon className='pen-icon' />
            <h2>New Post</h2>
        </div>
        <AddImgBtn path={path} setImgFile={setPostImgFile} btnTitle='Add Img' />
        <div className='post-input'>
            <TextField  
                id='post-title' label='Title' variant='outlined' margin='normal' 
                value={title}
                onChange={e => setTitle(e.target.value)}
                inputProps={{style: {fontSize: '1.2rem'}, maxLength: 100}}  // font size of input text
                InputLabelProps={{style: {fontSize: '1.2rem'}}}             // font size of input label
            />
            <span>{title.length > 80 ? `${title.length} / 100` : null}</span>
            <TextField  
                id='post-content' label='Content' multiline variant='outlined' margin='normal'
                value={content} rowsMax={12}
                onChange={e => setContent(e.target.value)}
                inputProps={{style: {fontSize: '1.2rem'}, maxLength: 1000}}  // input text
                InputLabelProps={{style: {fontSize: '1.2rem'}}}              // input label
            />
            <span>{content.length > 900 ? `${content.length} / 1000` : null}</span>
        </div>
        {/* Error msg */}
        <p id='create-post-error' className='center'></p>
        <div className='post-btn center'>
            <button className='publish' onClick={() => onImgSubmit()}>
                {!showSpinner ? 'Publish' : <Spinner size={'small'} />}
            </button>
        </div>
    </div>
  )
};

export default CreatePost;
