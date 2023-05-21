const db = require("../db");

class FileController {
  async saveFile(req, res, next) {
    try {
      const data = JSON.parse(req.body.fileData);
      const savedFiles = [];

      for (const info of data) {
        if (req.files[info.key]) {
          const bin = req.files[info.key];
          bin.name = info.name || bin.name;

          if (!bin) savedFiles.push({ file: null });

          const file = await db.query(
            `
            insert into
              public."file"
              (id_remark, name, bin)
            values
              ($1, $2, $3)
          `
          );

          savedFiles.push({ ...file, url: `/files/${file.id_code}` });
        }
      }

      res.json(savedFiles);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FileController();
