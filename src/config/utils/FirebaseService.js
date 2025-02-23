import admin from "firebase-admin";

// import serviceAccount from '../assets/firebase-adminsdk.json';
import serviceAccount from '../assets/firebase-adminsdk.json' assert {type: 'json'};
import multer from "multer";

import dotenv from 'dotenv';
dotenv.config();

class FirebaseService {
    constructor() {
        if (!FirebaseService.instance) {
            // Initialize Firebase Admin SDK if it hasn't been initialized yet
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
              storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
              databaseURL: process.env.FIREBASE_DATABASE_URL,
            });
      
            this.auth = admin.auth();
            this.bucket = admin.storage().bucket();
            
            
    
            // Multer setup to handle file uploads
            this.upload = multer({storage: multer.memoryStorage()})
      
            // Store the instance so it can be reused
            FirebaseService.instance = this;
          }
      
          return FirebaseService.instance;
      }
}

export default FirebaseService;