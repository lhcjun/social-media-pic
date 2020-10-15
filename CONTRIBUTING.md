# Contributing

Thank you for considering contributing to this little project! ❤

### Features you are encouraged to implement

---

- Chat with another user
- Private account (only followers can see the posts)
- Performance optimized (ex. infinite scroll on post)
- Notification
- Tests
- Dark mode
- Others...

To avoid conflict, please create an issue before you start, or leave a comment if there is already one.

### Development Setup

---

1. Fork this repo (Click the Fork button in the top right of this page)
2. Clone the repo that you just forked to your Github account<br>
   ```
   git clone https://github.com/<your_username>/social-media-pic.git
   cd social-media-pic
   ```
3. Install dependencies<br>
   ```
   npm i && cd client && npm i
   ```
4. Create a `dev.js` file into `config` folder
5. Set up the `config/dev.js` file<p>
   [MongoDB Connection String](https://docs.mongodb.com/guides/server/drivers/)<br>
   SendGrid API key ? (see 6)<br>
   ```js
   module.exports = {
     MONGO_URI: 'YOUR_MongoDB_Connection_String',
     JWT_SECRET: 'YOUR_JWT_SECRET',
     SEND_GRID_API: 'YOUR_SEND_GRID_API',
     EMAIL_LINK: 'http://localhost:3000',
     EMAIL_FROM: 'YOUR_EMAIL (requested by SendGrid)',
   };
   ```
6. setting SendGrid API key<br>
   This API is used for Forget & Reset Password,<br>
   so if you're not using the Forget & Reset Password functionality,<br>
   you could just leave it(SEND_GRID_API, EMAIL_FROM) like above<br>
   and comment out the **transporter** & **/reset-password route** in `routes/auth.js` like below.<p>

   routes/auth.js

   ```js
   // const transporter = nodemailer.createTransport(
   //   sgTransport({
   //     auth: {
   //       api_key: SEND_GRID_API,
   //     },
   //   })
   // );

   // router.post('/reset-password', (req, res) => {
   //    ...
   //    .catch(console.log);
   //   })
   // });
   ```

   - Or you could create your own SendGrid API<br>
     &emsp;&emsp;[Create SendGrid API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key)<p>

   - ps. The email put in 'EMAIL_FROM' is requested to be verified by SendGrid before they help delivering an email to the user.<br>

7. Setting Cloudinary<br>
   This API is for image upload,<br>
   here are 2 ways for setting Cloudinary, you could use one of them:

   - Method 1<br>
     Create your [Cloudinary API](https://cloudinary.com/documentation/fetch_remote_images) & set up [upload presets](https://cloudinary.com/documentation/upload_presets)

     a. Add Cloudinary `IMG_UPLOAD_URL` to `assets/api-call.js`<br>
     b. Add [Cloudinary](https://cloudinary.com/users/login) `upload_preset` & `cloud_name` to the below 2 files.<br>

     - `components/create-post.component.jsx` file
     - `components/edit-profile.component.jsx` file
       ```js
       formData.append('upload_preset', 'YOUR_UPLOAD_PRESETS_NAME');
       formData.append('cloud_name', 'YOUR_CLOUD_NAME');
       formData.append('folder', 'silhouette-test');
       ```

   - Method 2<br>
     If you are only doing some simple testing,<br>
     you could just change the existing Cloudinary setting from prod to dev in the below 2 files.<br>

     - `components/create-post.component.jsx` file
     - `components/edit-profile.component.jsx` file<p>

     Make sure to comment out the **prod** settings and use the **dev** ones like below.<br>

     ```js
     // dev
     formData.append('upload_preset', 'social-media-pic-dev');
     formData.append('folder', `silhouette-test/${user._id}/avatar`);

     // prod
     // formData.append('upload_preset', 'social-media-pic');
     // formData.append('folder', `silhouette-prod/${user._id}/avatar`);
     ```

     ps. Since there are some limitations in storage, once the limit is reached, the img files uploaded by this method will be deleted or the upload API will be destroyed.
      <p>

8. Run the project
   ```
   npm run dev
   ```
   <p>

### Push & Pull Request

---

1. Sync your clone with the original repo (get the latest updates)
   ```
   git remote add upstream https://github.com/lhcjun/social-media-pic.git
   git pull upstream master
   ```
2. Create a branch
   ```
   git checkout -b <new_branch_name>
   ```
3. Commit and push the code to your fork.
   ```
   git add .
   git commit -m 'your update message'
   git push origin <branch-name>
   ```
4. Create a pull request to have the changes merged from your fork into the origin.<br>
   (Click the `New Pull Request` button located at the top of your repo)<p>
5. Provide detailed description about the changes you have made and the expected outcome.
