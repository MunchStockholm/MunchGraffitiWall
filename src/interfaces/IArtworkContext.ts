export default interface IArtworkContext {
    artworks: any[];
    getArtworksFromService: () => void;
    getArtworkByIdFromService: (id: any) => Promise<any>;
}