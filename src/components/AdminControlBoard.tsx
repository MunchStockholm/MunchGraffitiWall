import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import axios, { AxiosResponse } from 'axios';

const AdminControllBoard = () => {
    const [images, setImages] = useState<{_id: any, url: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchImagesFromApi = async () => {
        setIsLoading(true);
        const response: AxiosResponse<{ _id: any, ImageBytes: string }[]> = await axios.get('https://graffitiwallserver.onrender.com/');
        if (response.data.length > 0) {
            const newImages = await Promise.all(response.data.map(async (imageData) => {
                const blob = await fetch(`data:imageBytes/bmp;base64,${imageData.ImageBytes}`).then(res => res.blob());
                return {_id: imageData._id, url: URL.createObjectURL(blob)};
            }));
            setImages(newImages);
        } else {
            throw new Error('No images returned from the API');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchImagesFromApi().catch(error => console.log(error));
    }, []);

    const removeFromBoard = (_id: any) => {
        setIsLoading(true);
        console.log(_id);
        axios.delete(`https://graffitiwallserver.onrender.com/${_id}`)
          .then(() => {
              fetchImagesFromApi().catch(error => console.log(error));
          })
          .catch(error => console.log(error))
          .finally(() => setIsLoading(false));
    };

    return (
        <div className="grid-container">
            {isLoading ? <div>Loading...</div> : 
            images.map((image) => (
                <div key={image._id} className="grid-item">
                    <img className="grid-img" src={image.url} alt={`Image ${image._id}`} />
                    <button 
                        onClick={() => removeFromBoard(image._id)} 
                        disabled={isLoading}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    )
};

export default AdminControllBoard;