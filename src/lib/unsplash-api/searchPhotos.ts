export const searchPhotos = async (
  query: string,
  page: number,
  perPage: number
) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${query}&page=${page}&per_page=${perPage}`
  );
  const data = await response.json();
  return data;
};
