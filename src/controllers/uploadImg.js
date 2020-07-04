const { Router } = require('express');
const router = new Router();


router.post('/', (req, res) => { 
    let EDFile = req.files.file;
    console.log(EDFile);
    EDFile.mv(`./download/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : "carajo" })

        return res.status(200).send({ message : 'File upload' })
    })
   
});


module.exports = router;  