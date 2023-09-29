import { useEffect, useState } from "react"
import fetchData from "../utils/fetchApi";
import Header from "../components/header";
import Slide from "../components/slide";
import { useLocation } from "react-router-dom";
import Filter from "../components/filter";
import Footer from "../components/footer";
import LineImage from "../components/lineImage";


export default function Photos() {

    //Mostra os principais temas
    const [nature, setNature] = useState([]);
    const [people, setPeople] = useState([]);
    const [architecture, setArchitecture] = useState([]);
    const [film, setFilm] = useState([]);
    const [streetPhotography, setStreetPhotography] = useState([]);
    const [wallpapers, setWallpapers] = useState([])
    const location = useLocation()
    const searchPathname = location.search
    const search = searchPathname.split("?search=");

    useEffect(() => {

        fetchData().then(results => {
            setNature(results.Nature);
            setPeople(results.People);
            setArchitecture(results.Architecture);
            setFilm(results.Film);
            setStreetPhotography(results.StreetPhotography)
            setWallpapers(results.Wallpapers)
        })

    }, [])


    return (
        <div className=" bg-[#EDDBC7]">
            <Header />
            {
                search[1] !== '' && search[1] !== undefined ?
                    (
                        <section className="w-full">
                            <Filter searchValue={search[1]} />
                        </section>
                    ) : (
                        nature.length !== 0 && people.length !== 0 && architecture.length !== 0 && film.length !== 0 && streetPhotography.length !== 0 &&
                        (
                            <main className="">
                                <Slide wallpapers={nature} title={'Photos'} />
                                <section className="grid grid-cols-2 md:grid-cols-3 gap-6 m-10">
                                    <LineImage collection={nature}></LineImage>
                                    <LineImage collection={people}></LineImage>
                                    <LineImage collection={architecture}></LineImage>
                                    <LineImage collection={film}></LineImage>
                                    <LineImage collection={streetPhotography}></LineImage>
                                    <LineImage collection={wallpapers}></LineImage>
                                </section>
                                
                            </main>
                        )
                    )
            }
            <Footer />
        </div>
    )
}