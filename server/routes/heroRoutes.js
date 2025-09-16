const express = require('express'); 
const router = express.Router();
const multer = require('multer');
const {getHero , updateHero} = require('../controllers/heroController.js');
const { protect } = require('../middleware/authMiddleware.js');

const upload = multer({ dest: 'uploads/' });

router.get('/' , getHero)

router.put('/', protect, upload.single('resume'), updateHero);

module.exports = router;