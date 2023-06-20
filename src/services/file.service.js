const fileRepository = require('../repositories/file.repository');
const {resolve, join} = require("path");
const fs = require('fs');

class FileService {
  localPath = resolve(__dirname,'..','..','uploads');
  constructor() {
  }

  async getAll(limit, page) {
    try {
      const files = await fileRepository.getFiles(limit, page);

      const [{ total }] = await fileRepository.count();

      return {
        data: files,
        itemsCount: total,
      }
    } catch (err) {
      return {
        data: err.message
      }
    }
  }

  async getFile(id) {
    const [result] = await fileRepository.getById(id)

    if (!result) {
      throw new Error('File not found');
    }

    return result;
  }

  async updateFile(id, file) {
    const oldFile = await this.getFile(id);
    fs.unlink(join(this.localPath, oldFile.path), (err) => {
      if (err) {
        throw new Error(err.message)
      }
    });
    const updatePayload = {
      name: file.originalname,
      path: file.filename,
      mimetype: file.mimetype,
      type: file.mimetype.split('/')[1],
      size: file.size
    }
    await fileRepository.update(oldFile.id, updatePayload);
    return {
      updated: true,
      message: 'Successfully file updated',
    }
  }

  async createFile(data) {
    try {
      const newFile = {
        name: data.originalname,
        path: data.filename,
        mimetype: data.mimetype,
        type: data.mimetype.split('/')[1],
        size: data.size
      }
      const file = await fileRepository.create(newFile);
      return {
        fileId: file.insertId,
        created: true,
        message: 'Successfully created'
      }
    } catch(e) {
      return {
        created: false,
        message: e.message,
      };
    }
  }

  async deleteFile(id) {
    const [file] = await fileRepository.getById(id);

    if (!file) {
      throw new Error('File not found');
    }

    fs.unlink(join(this.localPath, file.path), (err) => {
      if (err) {
        throw new Error(err.message)
      }
    });

    await fileRepository.deleteById(id);

    return {
      deleted: true,
      message: 'Successfully file deleted',
    };
  }

}

module.exports = new FileService();
