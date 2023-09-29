
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import Grid from "../components/grid";
import { FilterData } from "../utils/data";
import { useLocation } from "react-router-dom";
import Filter from "../components/filter";
import Footer from "../components/footer";

const API_KEY = process.env.REACT_APP_PUBLIC_API_KEY

const fetchUser = async (username) => {
    const [
        dataUser,
        dataPhotos
    ] = await Promise.all(
        [
            fetch(`https://api.unsplash.com/users/${username}/?client_id=${API_KEY}`)
                .then(data => data.json()),
            fetch(`https://api.unsplash.com/users/${username}/photos/?client_id=${API_KEY}`)
                .then(data => data.json()),
        ])

    return {
        DataUser: dataUser,
        DataPhotos: dataPhotos
    }

}

export default function Users() {
    const query = useParams()
    const username = query.username

    const location = useLocation()
    const searchPathname = location.search
    const search = searchPathname.split("?search=");

    const [user, setUser] = useState([])
    const [change, setChange] = useState(false)
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        fetchUser(username).then(res => {
            setUser(res.DataUser)
            setPhotos(FilterData(res.DataPhotos))
        })
    }, [username,photos])

    useEffect(() => {
        FilterData(photos)
        setChange(false)
    }, [change])

    return (
        <div>
            <Header />
            {
                search[1] !== '' && search[1] !== undefined ?
                    (
                        <section className="w-full">
                            <Filter searchValue={search[1]} />
                        </section>
                    ) :
                    (
                        photos.length !== 0 && (

                            <section>
                                <div className="bg-[#EDDBC7] h-[75vh] p-5 flex w-screen justify-around">
                                    <h4 className="flex items-end uppercase">Total de fotos: {user.total_photos}</h4>
                                    <figure className="my-auto ">
                                        <img
                                            src={user.profile_image.large}
                                            className="w-[18rem] rounded-full border-4 border-[#A7727D] shadow-2xl"
                                            alt={user.name}
                                        />
                                        <h2 className="text-center my-2">{user.name}</h2>
                                        <h3 className="text-center my-2">@{user.username}</h3>
                                    </figure>
                                    <h4 className="flex items-end uppercase">Curtidas: {user.total_likes}</h4>
                                </div>
                                <div className="p-10">
                                    <Grid photos={photos} changed={setChange} />
                                </div>
                            </section>
                        )

                    )
            }

            <Footer/>
        </div>
    )
}
