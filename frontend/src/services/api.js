export const fetchPaginatedContent = async (url, setStateContent, setStatePrevPage, setStateNextPage) => {
    try {
        const contentResponse = await fetch(url);

        if (contentResponse.ok) {
            const contentData = await contentResponse.json();
            
            setStateContent(contentData.results);
            
            if (setStatePrevPage != null)
                setStatePrevPage(contentData.next);

            if (setStateNextPage != null)
                setStateNextPage(contentData.previous);
        
        } else {
            throw new Error("Response was not OK");
        }
    } catch (error) {
        throw new Error(`Error fetching from :${url}`, error);
    }
};

export const fetchContent = async (url, setStateContent, setStatePrevPage, setStateNextPage) => {
    try {
        const contentResponse = await fetch(url);

        if (contentResponse.ok) {
            const contentData = await contentResponse.json();
            
            setStateContent(contentData);

        } else {
            throw new Error("Response was not OK");
        }
    } catch (error) {
        throw new Error(`Error fetching from :${url}`, error);
    }
};