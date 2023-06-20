const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");

const jwtStrategy = require('../middlewares/verifyToken');

router.use(jwtStrategy.verifyAccessToken);

router.get("/list", fileController.getFiles);
router.get('/:id', fileController.getFile);
router.get('/download/:id', fileController.downloadFile);
router.post("/upload", fileController.postFile);
router.put('/update/:id', fileController.updateFile)
router.delete('/delete/:id', fileController.deleteFile);

module.exports = router;
