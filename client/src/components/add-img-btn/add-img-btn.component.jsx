import React from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import './add-img-btn.styles.scss';

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


const AddImgBtn = ({ setImgFile }) => (
    <div className="add-img-btn">
      <div className="file-input">
        <label className="input-btn">
          <input id='upload_img' type='file' accept='image/*' 
            onChange={event => {
                getImgPath(event);
                setImgFile(event.target.files[0]);
            }} 
          />
          <AddPhotoAlternateIcon className='img-btn' />
          <span>Add Img</span>
        </label>
        <input type='text' name='file-path' className='file-path' readOnly />
      </div>
      <img src='' alt='' className='thumbnail' />
    </div>
);

export default AddImgBtn;
