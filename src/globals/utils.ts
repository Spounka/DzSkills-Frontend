function fileNameFromPath(path: string): string {
    const arr = path.split('/');
    return arr[arr.length - 1];
}

export { fileNameFromPath };
