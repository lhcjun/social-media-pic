# Contributing

### Development Setup

---

1. Fork this repo to your Github account
2. Clone the repo that you just forked<br>
   ```
   git clone YOU_FORKED_REPO
   cd social-media-pic
   ```
3. Install dependencies<br>
   `npm i && cd client && npm i`
4. Create a _dev.js_ file into _config_ folder
5. Set up the _config/dev.js_ file<br>
   [MongoDB Connection String](https://docs.mongodb.com/guides/server/drivers/)<br>
   ```js
   module.exports = {
     MONGO_URI: 'YOUR_MongoDB_Connection_String',
     JWT_SECRET: 'YOUR_JWT_SECRET',
     SEND_GRID_API: 'YOUR_SEND_GRID_API',
     EMAIL_LINK: 'http://localhost:3000',
     EMAIL_FROM: 'YOUR_EMAIL',
   };
   ```
6. Add [Cloudinary](https://cloudinary.com/users/login) `upload_preset` & `cloud_name` to the _components/create-post.component.jsx_<br>
   and _components/edit-profile.component.jsx_ file

   ```js
   formData.append('upload_preset', 'YOUR_UPLOAD_PRESETS_NAME');
   formData.append('cloud_name', 'YOUR_CLOUD_NAME');
   formData.append('folder', 'YOUR_FOLDER_NAME');
   ```

7. Add Cloudinary `IMG_UPLOAD API` to _assets/api-call.js_
8. `npm run dev`
<p>

### How to contribute

---

1. Sync your clone with the original repo (get the latest updates)
   ```
   git remote add upstream https://github.com/lhcjun/social-media-pic.git
   git pull upstream master
   ```
2. Create a branch
3. Commit and push the code to your fork
4. Create a pull request to have the changes merged from your fork into the origin
