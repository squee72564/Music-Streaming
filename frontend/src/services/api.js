export const fetchContent = async (url, setStateContent, setStatePrevPage, setStateNextPage) => {
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
            throw Error("Response was not OK");
        }
    } catch (error) {
        console.error(`Error fetching from :${url}`, error);
    }
};