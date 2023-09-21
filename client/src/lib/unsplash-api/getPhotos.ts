export const getPhotos = async (query: string) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=${
      process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    }&query=${query}&page=${1}&per_page=${12}`
  );
  const data = await response.json();
  return data;
};
