import axios from "axios";

const ArtworkService = ( () => {

    const serverEndpoint = "https://graffitiwallserver.onrender.com";

    const getArtworks = async () => {
        const response = await axios.get(serverEndpoint);
        return response.data;
    }

    const getArtworkById = async (id: string) => {
        const response = await axios.get(`${serverEndpoint}/${id}`);
        return response.data;
    }

    return {
        getArtworks,
        getArtworkById
    }

})();

export default ArtworkService;