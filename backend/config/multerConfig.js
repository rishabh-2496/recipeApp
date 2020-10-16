const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: (req, file, callback) => {
//       console.log("file in storage", file);
//       console.log("req", req);
//       cb(undefined, file);
//     },
//     // filename: function (req, file, cb) {
//     //   cb(undefined, file.originalname);
//     // },
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//   },
// });

// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: '', // cloudinary folder where you want to store images, empty is root
//   allowedFormats: ['jpg', 'png'],
// });

module.exports.storage = storage;
