const fileService = require('../services/file.service');
const {resolve} = require("path");
const fs = require('fs')

class FileController {
  constructor() {}

  async getFile(req, res) {
    try {
      const { id } = req.params
      const file = await fileService.getFile(id);
      res.send(file);
    } catch (err) {
      res.status(404).send({
        message: err.message
      });
    }
  }

  async getFiles(req, res) {
    try {
      let { page, list_size } = req.query;

      if (!page) page = 1;
      if (!list_size) list_size = 10;

      const result = await fileService.getAll(list_size, page);

      res.send(result);
    } catch(e) {
      res.status(400).send({
        message: e.message,
      });
    }
  }

  async downloadFile(req, res) {
    try {
      const { id } = req.params
      const file = await fileService.getFile(id);

      const fileFullPath = resolve(__dirname,'..','..','uploads', file.path);
      const fileStream = fs.createReadStream(fileFullPath);

      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.path)}"`);

      fileStream.pipe(res);
    } catch (err) {
      res.send({
        message: err.message
      });
    }
  }

  async postFile(req, res) {
    try {
      const result = await fileService.createFile(req.file)
      res.send(result)
    } catch(err) {
      res.status(500).send({
        message: err.message
      });
    }
  }

  async updateFile(req, res) {
    try {
      const { id } = req.params;
      const result = await fileService.updateFile(id, req.file);
      res.send(result)
    } catch (err) {
      res.status(404).send({
        message: err.message,
      });
    }
  }

  async deleteFile(req, res) {
    try {
      const { id } = req.params;
      const file = await fileService.deleteFile(id);
      res.send(file);
    } catch(err) {
      res.status(404).send({
        message: err.message
      });
    }
  }
}

module.exports = new FileController();
