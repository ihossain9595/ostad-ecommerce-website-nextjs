export const Fetcher = async (url) => {
  const response = await fetch(url);
  return await response.json();
};
