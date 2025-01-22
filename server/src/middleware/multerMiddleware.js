import multer from 'multer'

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})


// handleMulterError middleware is for handling errors with Multer, placed it after upload multer middleware
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds the limit of 2MB',
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Invalid file formatFieldName',
    });
  }
  next(err);
};

export default upload