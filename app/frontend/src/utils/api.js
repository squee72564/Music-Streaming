export const fetchPaginatedContent = async (
  url,
  setStateContent,
  setStatePrevPage,
  setStateNextPage
) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} : ${response.statusText}`);
    }

    const contentData = await response.json();
    setStateContent(contentData.results);
    if (setStatePrevPage != null) setStatePrevPage(contentData.next);
    if (setStateNextPage != null) setStateNextPage(contentData.previous);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchContent = async (url, setStateContent) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} : ${response.statusText}`);
    }
    
    const contentData = await response.json();
    setStateContent(contentData);

    return response;
  } catch (error) {
    throw error;
  }
};
