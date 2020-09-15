# Silhouette - social media app

Silhouette is an Instagram like social media app created with React.<p>

### Features

---

- Custom photo feed based on who you follow

* Like posts
  - View all likes on a post
* Comment on posts
  - View all comments on a post
* Search for users
  - Search based on usernames
* Profile
  - Follow / Unfollow Users
  - Change img view from grid layout to feed layout
  * Edit profile (profile img / name / bio)
* Sign in / Sign up
  - Forgot / Reset Password
  <p>

### Overview

---

Created with:<br>

- React
  - Context API / React Hook
  - react router
- JWT authentication
- MongoBD / mongoose
- Node.js / express
- SCSS
<p>
Logo is designed by Vexels.com<p>

### How to use

---

1. `git clone`
2. `npm install`
3. Create a _dev.js_ file in _config_ folder
4. Add [MongoDB URI key](https://account.mongodb.com/account/login) to the _config/dev.js_ file
   ```js
   module.exports = {
     MONGO_URI: 'YOUR_MongoDB_URI_KEY',
     JWT_SECRET: 'YOUR_JWT_SECRET',
     SEND_GRID_API: 'YOUR_SEND_GRID_API',
     EMAIL_LINK: 'http://localhost:3000',
     EMAIL_FROM: 'YOUR_EMAIL'
   };
   ```
5. Add [Cloudinary](https://cloudinary.com/users/login) `upload_preset` & `cloud_name` to the _components/create-post.component.jsx_<br>
   and _components/edit-profile.component.jsx_ file

   ```js
   formData.append('upload_preset', 'YOUR_UPLOAD_PRESETS_NAME');
   formData.append('cloud_name', 'YOUR_CLOUD_NAME');
   ```

6. Add Cloudinary `IMG_UPLOAD API` to _assets/api-call.js_
<p>
