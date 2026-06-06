import { useRef } from "react";
import { useMediaVerification } from "@website/context/MediaVerificationContext";

const ACCEPT_BY_TYPE = {
  image: "image/jpeg,image/png,image/webp",
  video: "video/mp4,video/webm,video/quicktime",
} as const;

const FORMATS_BY_TYPE = {
  image: "JPG, PNG, WEBP (بحد أقصى 100 ميجابايت)",
  video: "MP4, WEBM, MOV (بحد أقصى 100 ميجابايت)",
} as const;

export default function UploadStep() {
  const { mediaType, form, updateForm } = useMediaVerification();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (form.filePreviewUrl) URL.revokeObjectURL(form.filePreviewUrl);
    updateForm({
      file,
      filePreviewUrl: URL.createObjectURL(file),
    });
  };

  return (
    <section className="p-8 md:p-12">
      <div className="text-center mb-10">
        <h2 className="font-headline-md text-headline-md mb-2">
          {mediaType === "image" ? "رفع الصورة للتحليل" : "رفع الفيديو للتحليل"}
        </h2>
        <p className="text-on-surface-variant">
          ابدأ برفع الملف الذي ترغب في التحقق من صحته
        </p>
      </div>

      <button
        type="button"
        className="group relative w-full border-2 border-dashed border-mist-grey rounded-2xl p-16 flex flex-col items-center justify-center hover:border-gold-metallic-start hover:bg-gold-metallic-start/[0.02] transition-all cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          accept={ACCEPT_BY_TYPE[mediaType]}
          className="hidden"
          type="file"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <div className="w-20 h-20 bg-mist-grey/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-gold-metallic-start">
            cloud_upload
          </span>
        </div>
        <p className="font-headline-sm text-center mb-2">
          اسحب الملف هنا أو انقر للاختيار
        </p>
        <p className="text-on-surface-variant text-sm mb-8">
          يدعم الصيغ: {FORMATS_BY_TYPE[mediaType]}
        </p>
        <div className="flex gap-8">
          {mediaType === "video" && (
            <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined">movie</span>
              <span className="text-xs">فيديو</span>
            </div>
          )}
          {mediaType === "image" && (
            <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined">image</span>
              <span className="text-xs">صورة</span>
            </div>
          )}
          <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined">audio_file</span>
            <span className="text-xs">صوت</span>
          </div>
        </div>
      </button>

      {form.file && (
        <div className="mt-6 p-4 bg-success-teal/5 border border-success-teal/20 rounded-lg flex items-center gap-3">
          <span className="material-symbols-outlined text-success-teal">check_circle</span>
          <div className="text-right flex-1 min-w-0">
            <p className="font-label-bold text-primary truncate">{form.file.name}</p>
            <p className="text-xs text-on-surface-variant">
              {(form.file.size / (1024 * 1024)).toFixed(2)} ميجابايت
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
