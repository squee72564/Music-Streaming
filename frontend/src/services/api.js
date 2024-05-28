export const fetchContent = async (url, setContentState, setPrevPageState, setNextPageState) => {
    try {
        const contentResponse = await fetch(url);
        if (contentResponse.ok) {
            const contentData = await contentResponse.json();
            
            setContentState(contentData.results);
            
            if (setPrevPageState != null)
                setPrevPageState(contentData.next);

            if (setNextPageState != null)
                setNextPageState(contentData.previous);
        
        } else {
            throw Error("response != ok");
        }
    } catch (error) {
        console.error(`Error fetching from :${url}`, error);
    }
};