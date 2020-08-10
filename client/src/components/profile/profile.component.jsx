import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import Gallery from '../gallery/gallery.component';
import './profile.styles.scss';

const Profile = () => {
    const { state, dispatch } = useContext(UserContext);        // nearest Context.Provider
    const { user } = state;
    const [ myPosts, setMyPosts ] = useState([]);

    useEffect(() => {
        fetch('/myposts', {
            headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')}
        })
          .then(res => res.json())
          .then(posts => setMyPosts(posts.myPosts))
          .catch(console.log)
    }, []);


    return(
        <div className='profile'>
            <header className='user-info'>
                <div className='profile-img'>
                    <img  src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='avatars'  />
                </div>
                {/* <section className='introduction'> */}
                    <div className='user-setting'>
                        <h2>{user ? user.name : 'Loading'}</h2>
                        <button className='edit-btn'>Edit Profile</button>
                    </div>
                    <div className='user-activity'>
                        <div className='state'>
                        <h4><span>200</span> posts</h4>
                        <h4><span>200</span> followers</h4>
                        <h4><span>200</span> following</h4>
                        </div>
                    </div>
                    <div className='bio'>Live in California</div>
                {/* </section> */}
            </header>
            {myPosts.length
                ?  <Gallery userPosts={myPosts} />
                : <p>Pending</p>
            }
           
        </div>
    )
};

export default Profile;




// myPosts.map(eachPost => 
//     <img src={eachPost.photo} alt={eachPost.title}  
//         className='item-img' key={eachPost._id}
//     />
// )