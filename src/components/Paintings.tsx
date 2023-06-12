import React, { useEffect, useState } from "react";


import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";

const Paintings = () => {
    const crazybunny = "image";
    const [images, setImages] = useState<{id: number, url: string, position: string}[]>([]);
    const [positions, setPositions] = useState<string[]>([]);
    const [replaceIndex, setReplaceIndex] = useState(0);
    const [prevReplaceIndex, setPrevReplaceIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const generatePositions = (count: number) => {
        let positions: string[] = [];
        for (let i = 1; i <= count; i++) {
            for (let j = 1; j <= count; j++) {
                positions.push(`${i} / ${j}`);
            }
        }
        return positions;
    };

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    useEffect(() => {
        const count = 10; 
        setIsLoading(true);
        let tempPositions = generatePositions(count);
        tempPositions = shuffleArray(tempPositions);
        setPositions(tempPositions);

        let tempImages = Array(100).fill({id: -1, url: crazybunny, position: ""}); // Add 100 initial images

        tempImages = tempImages.map((image, index) => ({...image, id: index, position: tempPositions[index]}));

        setImages(tempImages);
        const interval = setInterval(() => {
            addNewImagesFromApi('https://graffitiwallserver.onrender.com/');
          }, 10000);
          return () => {
            clearInterval(interval);
          };
    }, []);

    const fetchImagesFromApi = async (url: string): Promise<string[]> => {
        const response: AxiosResponse<{ ImageBytes: string }[]> = await axios.get(url);
        if (response.data.length > 0) {
            // Map the response data to an array of blobURLs
            const blobURLs = await Promise.all(response.data.map(async (imageData) => {
                const blob = await fetch(`data:imageBytes/bmp;base64,${imageData.ImageBytes}`).then(res => res.blob()).finally(() => setIsLoading(false));;
                return URL.createObjectURL(blob);
            }));
    
            return blobURLs;
        } else {
            throw new Error('No images returned from the API');
        }
    };

    const addNewImagesFromApi = async (apiUrl: string) => {
        const newImages: string[] = await fetchImagesFromApi(apiUrl);
      
        setImages(prevImages => {
            let newImagesState = [...prevImages];
    
            newImages.forEach((newImage, index) => {
                const replaceIndex = (prevReplaceIndex + index) % 100; 
                newImagesState[replaceIndex] = {id: replaceIndex, url: newImage, position: positions[replaceIndex]};
            });
    
            setReplaceIndex((prevReplaceIndex + newImages.length) % 100);
            return newImagesState;
        });
    };

    return (
        <div>
            {isLoading ? <div>Loading...</div> :
                <div className="grid-container">

            {images.map((image) => (
                <div key={image.id} className="grid-item" style={{ gridArea: image.position }}>
                    <img className="grid-img" src={image.url} alt={`Image ${image.id}`} />
                </div>
            ))}
        </div>}
            <Link to="/">
            <button className="button">Back to start</button>
            </Link>
    </div>
    );
};

export default Paintings;