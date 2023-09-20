import { getPlaiceholder } from "plaiceholder";

type SearchDataResults = {
  image: string;
  blurDataURL: string;
};

export const getBase64Url = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching image");
    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (err) {
    console.error(err);
  }
};

export const addBlurredUrls = async (urls: SearchDataResults[]) => {
  const base64Promises = urls.map((url) => getBase64Url(url.image));
  const base64Urls = await Promise.all(base64Promises);
  const blurredPics = urls.map((url, i) => {
    url.blurDataURL = base64Urls[i] ?? "";
    return url;
  });
  return blurredPics;
};
