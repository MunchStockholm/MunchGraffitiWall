import logo from '../assets/images/munch.jpg'
import { useContext, useEffect, useState } from 'react';
import IArtworkContext from '../interfaces/IArtworkContext';
import { ArtworkContext } from '../contexts/ArtworkContext';

const Souvenir = () => {
    const { getArtworkByIdFromService } = useContext(ArtworkContext) as IArtworkContext;
    const [artworkId, setArtworkId] = useState<any>('');
    const [souvenirArtwork, setSouvenirArtwork] = useState<{_id: any, url: string} | null>(null);

    const fetchArtwork = async () => {
        const artworkData = await getArtworkByIdFromService(artworkId);
        const blob = await fetch(`data:image/bmp;base64,${artworkData.imageBytes}`).then(res => res.blob());
        const artwork = { _id: artworkData._id, url: URL.createObjectURL(blob) };
        setSouvenirArtwork(artwork);
    }

    useEffect(() => {
        fetchArtwork().catch(error => console.log(error));
    }, [artworkId]);


    return (
        <div className='souvenir-container'>
            <span className='frame top-frame'></span>
            <div className='middle-frame'>
                <span className='frame left-frame'></span>

                    <div className='image-container'>
                    {souvenirArtwork && <img src={souvenirArtwork.url} alt="Your Artwork" className='souvenir-artwork'/>}
                    </div>

                <span className='frame right-frame'></span>
            </div>
            <span className='frame bottom-frame'>
                <img src={logo} className='logo'/>
            </span>
        </div>
    );
};

export default Souvenir;