import Image from "next/image";
import { Input } from "../ui/input";
import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { AspectRatio } from "../ui/aspect-ratio";

type UploadImageFormProps = {
  image: File[];
  setImage: (image: File[]) => void;
  preview: string;
  setPreview: (preview: string) => void;
};

export const UploadImageForm = ({
  setImage,
  preview,
  setPreview,
}: UploadImageFormProps) => {
  const [isFileTooBig, setIsFileTooBig] = useState<boolean>(false);

  const handleBannerImageChange = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    setImage([file]);
  };

  const checkFileSize = (file: File) => {
    if (file.size > 1024 * 1024 * 4) {
      setIsFileTooBig(true);
      return;
    }
    setIsFileTooBig(false);
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    checkFileSize(file);
    handleBannerImageChange(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return toast.error("file error , probably too big");
    checkFileSize(file);
    handleBannerImageChange(file);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      maxSize: 1024 * 1024 * 4,
      multiple: false,
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      onDropRejected: () => setIsFileTooBig(true),
      onDropAccepted: () => setIsFileTooBig(false),
    });

  return preview ? (
    <div className="grid gap-3" {...getRootProps()}>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={preview}
          alt="uploaded image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className=" rounded-lg object-cover"
        />
      </AspectRatio>
      <Input
        type="file"
        className="rounded-lg"
        onChange={(e) => handleBannerChange(e)}
        accept="image/*"
      />
    </div>
  ) : (
    <div
      className={`w-full border-2 border-dashed rounded-lg cursor-pointer duration-300 ease-in-out
      ${
        isDragAccept
          ? "border-green-500"
          : isDragReject || isFileTooBig
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
      <Input onChange={(e) => handleBannerChange(e)} {...getInputProps()} />
    </div>
  );
};
