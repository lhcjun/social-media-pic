import React from 'react';
import { Link } from 'react-router-dom';
import GalleryItemInfo from '../gallery-item-info/gallery-item-info.component';
import './gallery.styles.scss';

const Gallery = ({ userPosts }) => {    
    const allRows = [];

    const createRows = userPosts => {
        // 3 posts in 1 row (for layout)    [[1, 2, 3], [...], [1]]
        for(var i=0; i<userPosts.length; i+=3){
            allRows.push(userPosts.slice(i, i+3));
        }
        return allRows;     
    }

    const checkRowLength = eachRow => {
        let len = eachRow.length;

        const pushBlankItem = id => {
            eachRow.push({ photo: '', title: '', _id: id });
        };
        // make sure the last row also = 3 items (so that the img won't fill up the whole row)
        if(len === 1){
            pushBlankItem('blank1');
            pushBlankItem('blank2');
        }else if(len === 2){
            pushBlankItem('blank1');
        }
        return eachRow;
    }

    return(
      <main className='profile-gallery'>
        <article className='gallery'>
          { createRows(userPosts).map((eachRow, i) => 
              <div className='row' key={i}>
                { checkRowLength(eachRow).map(eachPost => 
                    <div className='img-container' key={eachPost._id}>
                      <Link to={eachPost._id.length ? `/post/${eachPost._id}` : `/empty`}>
                        <React.Fragment>
                            <img 
                                src={eachPost.photo} 
                                alt={eachPost.title}  
                                className='item-img' 
                            />
                            <GalleryItemInfo eachPost={eachPost} />
                        </React.Fragment>
                      </Link>
                    </div>
                )}
              </div> 
          )} 
        </article>
      </main>
    )
};

export default Gallery;



/*  no layout
myPosts.map(eachPost => 
    <img src={eachPost.photo} alt={eachPost.title}  
        className='item-img' key={eachPost._id}
    />
)
*/