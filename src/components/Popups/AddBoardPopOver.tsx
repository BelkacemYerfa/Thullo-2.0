"use client";

import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const AddBoardPopOver = () => {
  const [title, setTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  return (
    <Dialog>
      <DialogTrigger className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-3 py-2 text-sm text-white font-medium">
        + Add
      </DialogTrigger>
      <DialogContent className="p-5">
        <DialogHeader>
          {img ? (
            <Image
              src={img}
              alt=""
              height={100}
              width={278}
              className="rounded-lg"
              quality={100}
            />
          ) : (
            <label className="w-full">
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
              <Input type="file" className="hidden" />
            </label>
          )}
        </DialogHeader>
        <Input
          className="rounded-lg"
          placeholder="Add board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DialogFooter>
          <Button
            disabled={!title || !img}
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-3 py-2 text-sm text-white font-medium"
          >
            + Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
