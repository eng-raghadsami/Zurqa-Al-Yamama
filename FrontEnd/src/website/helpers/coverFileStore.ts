/** يحتفظ بملف الغلاف في الذاكرة لإعادة التحليل (لا يُخزَّن في sessionStorage) */
let coverFile: File | null = null;

export function setCoverFile(file: File | null) {
  coverFile = file;
}

export function getCoverFile(): File | null {
  return coverFile;
}

export function clearCoverFile() {
  coverFile = null;
}
