const express = require('express');
require('dotenv').config();

const config = {
    authRequired: false,
    // auth0Logout: true,  
    secret: process.env.APP_SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};


module.exports = config;