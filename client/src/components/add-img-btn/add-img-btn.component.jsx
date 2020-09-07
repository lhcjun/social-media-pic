import React, { useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
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


const AddImgBtn = ({ setImgFile, path, btnTitle }) => {
    const { state } = useContext(UserContext); // nearest Context.Provide      r
    const { user } = state;

    const getImgPath = event => {
        // get input img data
        const fileData = event.target.files[0];
        if(fileData){
            if(path !== '/edit'){
                // get img file name
                const fileName = fileData.name;
                showFileName(fileName);
            }
            // get thumbnail url
            const thumbnailURL = URL.createObjectURL(fileData);
            showThumbnail(thumbnailURL);
        }
    }

    return (
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
              <span>{btnTitle}</span>
            </label>
            {path === '/edit' ? null : (
                <input type='text' name='file-path' className='file-path' readOnly />
            )}
          </div>
          <img 
            src={path === '/edit' ? (user ? user.profileImg : null) : ''} 
            alt='' 
            className='thumbnail' 
          />
        </div>
    )
};

export default AddImgBtn;
