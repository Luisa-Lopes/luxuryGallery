import { useEffect, useState } from "react"
//import Grid from "./grid"
import Oweres from "./oweres"
import FigureList from "./figureList";
import { FilterItem } from "../utils/data";

const API_KEY = process.env.REACT_APP_PUBLIC_API_KEY


const Filter = ({ searchValue }) => {

    const [changeData, setChangeData] = useState(false)
    const [photos, setPhotos] = useState([])
    const [collections, setCollections] = useState([])
    const [users, setUsers] = useState([])

    const newGroup = (group) => {
        let array = []
        group.map(element => {
            
            var favorite = false
            var storage = JSON.parse(localStorage.getItem("favorites")) || []
            const index = storage.findIndex(item => item.id === element.id)
            if (index !== -1) favorite = true

            array.push(FilterItem(element,favorite))
            
            /*const obj = {
                alt:  element?.alt_description || element?.cover_photo?.alt_description || null,
                favorite: favorite,
                height: element?.height || element?.cover_photo?.height,
                id: element.id,
                likes: element.likes 
                    ? element.likes
                    : (element.cover_photo?.likes || 0),
                urls: element?.urls || element?.cover_photo?.urls,
                user: {
                    bio: element.user?.bio 
                        ? element.user.bio
                        : (element.owners?.[0]?.bio || null),
                    first_name: element?.user?.first_name || element.owners?.[0]?.first_name,
                    id: element.user?.id || element?.owners?.[0]?.id,
                    instagram_username: element.user?.instagram_username ||
                        element.owners?.[0]?.instagram_username || 
                        element.cover_photo?.user?.instagram_username ||
                        null,
                    name: element?.user?.name || element?.owners?.[0]?.name,
                    profile_image: element.user?.profile_image || element.owners?.[0]?.profile_image,
                    username: element?.user?.username || element.owners?.[0]?.username
                },
                width: element?.width || element?.cover_photo?.width
            }
            array.push(obj)*/
        }
        )
        return array
    }

    const fetchSearchPhotos = async () => {
        const connection = await fetch(`https://api.unsplash.com/search/photos?per_page=12&query=${searchValue}&client_id=${API_KEY}`);
        const convertedConnection = await connection.json();
        return convertedConnection;
    }

    const fetchSearchUsers = async () => {
        const connection = await fetch(`https://api.unsplash.com/search/users?query=${searchValue}&client_id=${API_KEY}`);
        const convertedConnection = await connection.json();
        return convertedConnection;
    }

    const fetchSearchCollections = async () => {
        const connection = await fetch(`https://api.unsplash.com/search/collections?per_page=12&query=${searchValue}&client_id=${API_KEY}`);
        const convertedConnection = await connection.json();
        return convertedConnection;
    }


    useEffect(() => {

        var photosPromise = fetchSearchPhotos()
        var collectionsPromise = fetchSearchCollections()
        var usersPromise = fetchSearchUsers()

        photosPromise.then(result => { setPhotos(newGroup(result.results)) })

        collectionsPromise.then(result => { setCollections(newGroup(result.results)) })

        usersPromise.then(result => { setUsers(result.results) })

        setChangeData(false)
        console.log('entrou')
    }, [searchValue,changeData])


    return (
        <div className="w-full p-10">
            {
                photos !== 0 && photos !== undefined &&
                (
                    <section>

                        <FigureList figures={photos} changed={setChangeData}/>

                        <div className="my-10">
                            <Oweres photos={users} />
                        </div>

                        <FigureList figures={collections} changed={setChangeData} />

                    </section>

                )

            }

        </div >
    )

}

export default Filter;