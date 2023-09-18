export const searchPhotos = async (query: string) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=${query}&orientation=landscape`
  );
  const data = await response.json();
  return data;
};
