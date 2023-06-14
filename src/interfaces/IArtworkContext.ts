export default interface IArtworkContext {
    artworks: any[];
    getArtworksFromService: () => Promise<any>;
    getArtworkByIdFromService: (id: any) => Promise<any>;
}