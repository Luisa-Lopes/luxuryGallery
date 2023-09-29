import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_PUBLIC_API_KEY

const Card = ({ bio, id, first_name, image, username }) => {

    const [userPhotos, setUserPhotos] = useState()

    const fetchSearchPhotos = async () => {
        const connection = await fetch(`https://api.unsplash.com/users/${username}/photos/?client_id=${API_KEY}`);
        const convertedConnection = await connection.json();
        return convertedConnection;
    }

    useEffect(() => {
        const results = fetchSearchPhotos()
        results.then(result => setUserPhotos(result.splice(0, 4)))

    }, [first_name])

    return (
        <div className="shadow-lg h-full w-full relative ">
            <div className="absolute grid grid-cols-2 grid-rows-2 z-0 w-full h-full grayscale">
                {userPhotos && (
                    userPhotos.map(photo => {

                        return (
                            <img
                                key={photo.id}
                                className="h-full w-full"
                                src={photo.urls.regular}
                            />
                        )
                    })
                )
                }
            </div>
            <div className="absolute w-full h-full z-40 py-auto flex justify-center items-center">
                <Link to={`/users/${username}`} className="shadow-2xl">
                    <img className="border-[#F5EBEB] border-2 rounded-full shadow-2xl h-[8rem] w-[8rem]" src={image.large} />
                    <h4 className="bottom-5 right-[38%] text-white text-center"> @{username}</h4>
                </Link>
            </div>
        </div>
    )
}

export default Card;