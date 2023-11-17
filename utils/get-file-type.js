import path  from "path";

export default getFileType;

function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  const exts = {
    '.png': 'photo',
    '.jpg': 'photo',
    '.jpeg': 'photo',
    '.gif': 'animation',
    '.webp': 'animation',
    '.mp3': 'audio',
    '.mp4': 'video'
  };

  if (!(ext in exts))
    return 'document';

  return exts[ext];
}