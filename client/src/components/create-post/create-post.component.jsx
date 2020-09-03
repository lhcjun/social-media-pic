import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { API_CALL } from '../../assets/api-call';
import './create-post.styles.scss';

const getImgPath = event => {
    // get input img data
    const fileData = event.target.files[0];
    // get img file name
    const fileName = fileData.name;
    showFileName(fileName);
    // get thumbnail url
    const thumbnailURL = URL.createObjectURL(fileData);
    showThumbnail(thumbnailURL);
}

const showFileName = fileName => {
    // set file name value to input text (.file-path)
    const pathContainer = document.querySelector('.file-path');
    pathContainer.value = fileName;
}

const showThumbnail = thumbnailURL => {
    // set thumbnail url into img src (.thumbnail)
    const thumbnailContainer = document.querySelector('.thumbnail');
    thumbnailContainer.src = thumbnailURL;
}

const showErrorMsg = error => {
    const createPostError = document.querySelector('#create-post-error');
    createPostError.style.display='flex';
    createPostError.textContent = error;
};


const CreatePost = () => {
    const history = useHistory();
    const [ title, setTitle ] = useState(''); 
    const [ content, setContent ] = useState(''); 
    const [ postImg, setPostImg ] = useState('');
    const [ imgURL, setImgURL ] = useState('');

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

    const onImgSubmit = () => {
        // upload file with FormData & fetch
        const formData = new FormData();
        // append data into formData obj (convert into a data format that can be sent to the backend)
        formData.append('file', postImg);
        formData.append('upload_preset', 'social-media-pic');   // cloudinary
        formData.append('cloud_name', 'jl');                    // cloudinary
        
        if(!postImg){
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
        <div className='img-input'>
            <div className='file-input'>
                <label className='input-btn'>
                    <input id='upload_img' type='file' accept='image/*' 
                        onChange={event => {
                            getImgPath(event);
                            setPostImg(event.target.files[0]);  // input img data
                        }} 
                    />
                    <AddPhotoAlternateIcon className='img-btn' />
                    <span>Add Img</span>
                </label>
                <input type='text' name='file-path' className='file-path' readOnly />
            </div>
            <img src='' alt='' className='thumbnail' />
        </div>
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
                value={content}
                onChange={e => setContent(e.target.value)}
                inputProps={{style: {fontSize: '1.2rem'}, maxLength: 1000}}  // input text
                InputLabelProps={{style: {fontSize: '1.2rem'}}}              // input label
            />
            <span>{content.length > 900 ? `${content.length} / 1000` : null}</span>
        </div>
        {/* Error msg */}
        <p id='create-post-error' className='center'></p>
        <div className='post-btn center'>
            <button className='publish' onClick={() => onImgSubmit()}>Publish</button>
        </div>
    </div>
  )
};

export default CreatePost;
