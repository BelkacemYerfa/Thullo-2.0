import Image from "next/image";
import { Input } from "../ui/input";
import { ChangeEvent, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type UploadImageFormProps = {
  image: string;
  setImage: (image: string) => void;
};

export const UploadImageForm = ({ image, setImage }: UploadImageFormProps) => {
  const handleBannerImageChange = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) setImage(reader.result as string);
    };
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    // to show image preview before uploading
    // render it as a base64 encoded URL and send it to the server
    const file = e.target.files?.[0] as Blob;
    handleBannerImageChange(file);
    if (file.size > 1024 * 1024 * 5) {
      toast.error("Image size must be less than 5mb");
      return;
    }
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    handleBannerImageChange(file);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 1024 * 1024 * 5 });
  return image ? (
    <div className="grid gap-3" {...getRootProps()}>
      <Image
        src={image}
        alt="image"
        height={100}
        width={200}
        className="w-full h-[300px] rounded-lg object-cover"
      />
      <Input
        type="file"
        className="rounded-lg"
        onChange={(e) => handleBannerChange(e)}
        accept="image/*"
      />
    </div>
  ) : (
    <label
      className={`w-full border-2 border-dashed rounded-lg cursor-pointer duration-300 ease-in-out
      ${
        isDragAccept
          ? "border-green-500"
          : isDragReject
          ? "border-red-500"
          : "border-gray-300 "
      }`}
      {...getRootProps()}
    >
      <div className="flex items-center justify-center flex-col pt-5 pb-6">
        <svg
          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span>
          &nbsp; or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF
        </p>
      </div>
      <Input
        type="file"
        className="hidden"
        onChange={(e) => handleBannerChange(e)}
        accept="image/*"
        {...getInputProps()}
      />
    </label>
  );
};
