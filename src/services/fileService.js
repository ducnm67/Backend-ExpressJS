const path = require('path');

const generateFilePath = (fileObject, uploadPath, timestamp) => {
  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);
  let finalName = `${baseName}-${timestamp}${extName}`;
  let finalPath = path.join(uploadPath, finalName);
  return { finalName, finalPath };
};

const uploadSingleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, '../public/images/upload');
  let timestamp = Date.now();
  let { finalName, finalPath } = generateFilePath(
    fileObject,
    uploadPath,
    timestamp
  );

  try {
    await fileObject.mv(finalPath);
    return { status: 'success', path: finalName, error: null };
  } catch (error) {
    console.error('>>> Error:', error);
    return { status: 'failed', path: fileObject.name, error: error.message };
  }
};

const uploadMultipleFiles = async (fileArr) => {
  let uploadPath = path.resolve(__dirname, '../public/images/upload');
  let timestamp = Date.now();

  let uploadPromises = fileArr.map((file) => {
    let { finalName, finalPath } = generateFilePath(
      file,
      uploadPath,
      timestamp
    );
    return file
      .mv(finalPath)
      .then(() => ({ status: 'success', path: finalName, error: null }))
      .catch((error) => ({
        status: 'failed',
        path: file.name,
        error: error.message,
      }));
  });

  let resultArr = await Promise.all(uploadPromises);
  let countSuccess = resultArr.filter(
    (result) => result.status === 'success'
  ).length;

  return { countSuccess, result: resultArr };
};

module.exports = { uploadSingleFile, uploadMultipleFiles };
