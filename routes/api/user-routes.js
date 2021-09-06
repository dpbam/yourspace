const router = require("express").Router();

const {

};

router  
    .route('/')
    .get(getAllUsers)
    .post(createUser);
