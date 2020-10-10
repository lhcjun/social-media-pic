# Contributing

### Development Setup

---

1. Fork this repo
2. Clone the repo that you just forked to your Github account<br>
   ```
   git clone YOU_FORKED_REPO
   cd social-media-pic
   ```
3. Install dependencies<br>
   ```
   npm i && cd client && npm i
   ```
4. Create a `dev.js` file into `config` folder
5. Set up the _config/dev.js_ file<br>
   [MongoDB Connection String](https://docs.mongodb.com/guides/server/drivers/)<br>
   [Create SendGrid API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key) (we select 'Full Access' here for now)<br>
   ```js
   module.exports = {
     MONGO_URI: 'YOUR_MongoDB_Connection_String',
     JWT_SECRET: 'YOUR_JWT_SECRET',
     SEND_GRID_API: 'YOUR_SEND_GRID_API',
     EMAIL_LINK: 'http://localhost:3000',
     EMAIL_FROM: 'YOUR_EMAIL (requested by SendGrid)',
   };
   ```
   ps. The email put in 'EMAIL_FROM' is requested to be verified by SendGrid before they help delivering an email to the user.<br>
   &emsp;So if you're not using the Forget & Reset Password functionality(which will send an email), you could just leave it for now.<p>
6. Change Cloudinary setting from prod to dev in the below 2 files.<br>

   - _components/create-post.component.jsx_ file
   - _components/edit-profile.component.jsx_ file<p>

   Make sure to comment out the **prod** settings and use the **dev** ones like below.<br>

   ```js
   // dev
   formData.append('upload_preset', 'social-media-pic-dev');
   formData.append('folder', `silhouette-test/${user._id}/avatar`);

   // prod
   // formData.append('upload_preset', 'social-media-pic');
   // formData.append('folder', `silhouette-prod/${user._id}/avatar`);
   ```

   ps. Or you could create your Cloudinary API and have the settings in these two file.<br>
   &emsp;See [Optional](#optional)<p>

7. Run the project
   ```
   npm run dev
   ```
   <p>

#### Optional

Create your [Cloudinary API](https://cloudinary.com/documentation/upload_presets) & set up upload presets

1. Add Cloudinary `IMG_UPLOAD API` to _assets/api-call.js_
2. Add [Cloudinary](https://cloudinary.com/users/login) `upload_preset` & `cloud_name` to the below 2 files.

   - _components/create-post.component.jsx_ file
   - _components/edit-profile.component.jsx_ file

   ```js
   formData.append('upload_preset', 'YOUR_UPLOAD_PRESETS_NAME');
   formData.append('cloud_name', 'YOUR_CLOUD_NAME');
   formData.append('folder', 'YOUR_FOLDER_NAME');
   ```

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
