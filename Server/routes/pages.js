
// Damit der Code übersichtlich belibt, werden hier die Verlinkungen ausgelagert
const express = require('express');

const router = express.Router();


// Seiten Anfragen und Requests
router.use('/',(req,res)=>{
    res.render('index.html');


});


module.exports = router;