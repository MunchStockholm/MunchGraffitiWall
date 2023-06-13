import { useEffect, useState, createContext, ReactNode } from "react";
import ArtworkService from "../services/ArtworkService";
import IArtworkContext from '../interfaces/IArtworkContext';

export const ArtworkContext = createContext<IArtworkContext | null>(null);

type Props = { children: ReactNode };

const ArtworkProvider = ({ children }: Props) => {
    const [artworks, setArtworks] = useState<any[]>([]);

    const getArtworksFromService = async () => {
        const response = await ArtworkService.getArtworks();
        setArtworks(response);
    }

    const getArtworkByIdFromService = async (id: any) => {
        const response = await ArtworkService.getArtworkById(id);
        const array = [];
        array.push(response);
        setArtworks(array);
        return response;
    }

    return (
        <ArtworkContext.Provider value={{ artworks, getArtworksFromService, getArtworkByIdFromService }}>
            {children}
        </ArtworkContext.Provider>
    )
};

export default ArtworkProvider;