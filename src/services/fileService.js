const path = require('path');

const uploadSingleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, '../public/images/upload');

  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  try {
    await fileObject.mv(finalPath);
    return {
      status: 'success',
      path: finalName,
      error: null,
    };
  } catch (error) {
    console.log('>>>check error', error);
    return {
      status: 'failed',
      path: fileObject.name,
      error: JSON.stringify(error),
    };
  }
};

const uploadMultipleFiles = async (fileArr) => {
  try {
    let uploadPath = path.resolve(__dirname, '../public/images/upload');
    let resultArr = [];
    let countSuccess = 0;
    for (let i = 0; i < fileArr.length; i++) {
      let extName = path.extname(fileArr[i].name);
      let baseName = path.basename(fileArr[i].name, extName);

      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      try {
        await fileArr[i].mv(finalPath);
        resultArr.push({
          status: 'success',
          path: finalName,
          error: null,
        });
        countSuccess++;
      } catch (error) {
        console.log('>>>check error', error);
        resultArr.push({
          status: 'failed',
          path: fileArr[i].name,
          error: JSON.stringify(error),
        });
      }
    }
    return {
      countSuccess: countSuccess,
      result: resultArr,
    };
  } catch (error) {
    console.log('>>>check error', error);
    return {
      countSuccess: countSuccess,
      result: resultArr,
    };
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
