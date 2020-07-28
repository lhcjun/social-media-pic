import React from 'react';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
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


const CreatePost = () => (
    <div className='create-post-frame'>
        <div className='title-row'>
            <CreateIcon className='pen-icon' />
            <h2>New Post</h2>
        </div>
        <div className='img-input'>
            <div className='file-input'>
                <label className='input-btn'>
                    <input id='upload_img' type='file' accept='image/*' 
                        onChange={event => getImgPath(event)} 
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
                inputProps={{style: {fontSize: '1.2rem'}}}         // font size of input text
                InputLabelProps={{style: {fontSize: '1.2rem'}}}    // font size of input label
            />
            <TextField  
                id='post-content' label='Content' multiline variant='outlined' margin='normal' 
                inputProps={{style: {fontSize: '1.2rem'}}}         // input text
                InputLabelProps={{style: {fontSize: '1.2rem'}}}    // input label
            />
        </div>
        <div className='post-btn center'>
            <button className='publish'>Publish</button>
        </div>
  </div>
);

export default CreatePost;
