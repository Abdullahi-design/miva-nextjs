export const formatFileSize = (sizeInBytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (sizeInBytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(sizeInBytes) / Math.log(1024)));
    return Math.round(sizeInBytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};