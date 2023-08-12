export const getPhotos = async (page: number, perPage: number) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=${page}&per_page=${perPage}`
  );
  const data = await response.json();
  return data;
};
