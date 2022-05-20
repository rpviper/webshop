import { Injectable } from '@angular/core'; 
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: 'AIzaSyCP76DD7sqIB4kfHeGBmqVFy-UsayYOc2g',
  authDomain: 'rainowebshop.web.app',
  databaseURL: 'https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: 'gs://rainowebshop.appspot.com'
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  uploadedPictureUrl: string = "";

  constructor() { }

  metadata: any = {
    contentType: 'image/jpeg'
  };

  metadataPDF: any = {
    contentType: 'application/pdf'
  };

  uploadPDF(file: any) {
    const storageRef = ref(storage, 'doc/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, this.metadataPDF);
    this.doUpload(uploadTask);
  }

  uploadPicture(file: any) {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, this.metadata);
    this.doUpload(uploadTask);
  }

  doUpload(uploadTask: UploadTask) {
     // Listen for state changes, errors, and completion of the upload.
     uploadTask.on('state_changed',
     (snapshot) => {
       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
       switch (snapshot.state) {
         case 'paused':
           console.log('Upload is paused');
           break;
         case 'running':
           console.log('Upload is running');
           break;
       }
     }, 
     (error) => {
       // A full list of error codes is available at
       // https://firebase.google.com/docs/storage/web/handle-errors
       switch (error.code) {
         case 'storage/unauthorized':
           // User doesn't have permission to access the object
           break;
         case 'storage/canceled':
           // User canceled the upload
           break;

         // ...

         case 'storage/unknown':
           // Unknown error occurred, inspect error.serverResponse
           break;
       }
     }, 
     () => {
       // Upload completed successfully, now we can get the download URL
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         console.log('File available at', downloadURL);
         this.uploadedPictureUrl = downloadURL;
       });
     }
   );
  }
}
