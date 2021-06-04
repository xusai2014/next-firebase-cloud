const admin = require("firebase-admin");
const firebase = require("firebase");
const functions = require("firebase-functions");
const next = require("next");
const config = require("./next.config");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6dWtxUzhBA0jN6LaoyRpxJFHRTXvBMuo",
    authDomain: "next-firebase-cloud.firebaseapp.com",
    projectId: "next-firebase-cloud",
    storageBucket: "next-firebase-cloud.appspot.com",
    messagingSenderId: "742982458093",
    appId: "1:742982458093:web:b12cc1e0e924cf756c4ae4",
    measurementId: "G-Y971VT9FFH"
};


firebase.initializeApp(firebaseConfig);
admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev:false,
    // the absolute directory from the package.json file that initialises this module
    // IE: the absolute path from the root of the Cloud Function
    conf: config,
});
const handle = app.getRequestHandler();

const server = functions.https.onRequest((request, response) => {
    // log the page.js file or resource being requested
    console.log("File: " + request.originalUrl);
    return app.prepare().then(() => handle(request, response));
});

exports.nextjs = { server };