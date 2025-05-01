const multer = require('multer');
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '..', 'roomImages');
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        const sanitizedOriginalName = file.originalname.replace(/\s+/g, '_');
        const uniqueName = sanitizedOriginalName;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
