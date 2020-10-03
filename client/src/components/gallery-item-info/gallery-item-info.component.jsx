import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumIcon from '@material-ui/icons/Forum';
import './gallery-item-info.styles.scss';

const GalleryItemInfo = ({ eachPost }) =>
  eachPost.likes && eachPost.comments ? (
    <div className="gallery-item-info">
      <div className="gallery-heart">
        <FavoriteIcon className="icon" />
        <span>{eachPost.likes ? eachPost.likes.length : 0}</span>
      </div>
      <div className="gallery-comment">
        <ForumIcon className="icon" />
        <span>{eachPost.comments ? eachPost.comments.length : 0}</span>
      </div>
    </div>
  ) : null;

export default React.memo(GalleryItemInfo);
