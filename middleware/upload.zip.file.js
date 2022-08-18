const multer = require('multer');
const Constant = require('../constant')
const fs = require('fs-extra')
const path = require('path');
var ResourceFileType = {
    image:1,
    audio:2,
    video:3,
    other:4
}
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      var folderPath = Constant.uploadFolder
      var folder = 'zips/'
      folderPath=folderPath+ folder
      req.localFolder = folderPath;
      fs.ensureDir(folderPath, err => {
        
        // dir has now been created, including the directory it is to be placed in
        callback(null, folderPath)
      })
    },
    filename: function (req, file, callback) {
      
      
      
      var ext = getExtension(file.originalname);
      var fileName = Date.now().toString()
      if(typeof req.user._id != 'undefined'){
          fileName+=req.user._id 
      }
      callback(null, fileName +'.'+ ext)
    }
})

function getExtension(filename) {
  var ext = path.extname(filename||'').split('.');
  return ext[ext.length - 1];
}

/**
 * how to use: require(this_file_path)
 */
const upload = multer({ storage: storage }).single('file')
module.exports = upload

