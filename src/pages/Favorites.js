import { useEffect, useState } from "react"
import Header from "../components/header"
import Grid from "../components/grid"
import { useLocation } from "react-router-dom";
import Filter from "../components/filter";
import Footer from "../components/footer";
import Slide from "../components/slide";

//Essa página mostra as imagens Favoritados pelos users
export default function Favorites() {


    //Pegando o objeto com a key favorites do localStorage
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

    //Constante que representa se os dados presentes em favorites mudaram
    const [change, setChange] = useState(false); //TRUE - os dados mudaram o useEffect sincroniza os dados presente em favorites

    /*
        Verifica se o user fez uma pesquisa no input de busca do header
        A palavra inserida no input vai para url com o query search
    */
    const location = useLocation(); //url 
    const searchPathname = location.search; //seleciona o query search 
    const search = searchPathname.split("?search="); //seleciona a palavra buscada

    useEffect(() => {
        //Recarrega os dados
        setFavorites(JSON.parse(localStorage.getItem("favorites")))
        setChange(false)

    }, [change])


    return (
        <div>
            <Header />

            <Slide wallpapers={favorites} title={"Favorites"} />
            {/*Verifica se a busca está vazia*/
                search[1] !== '' && search[1] !== undefined ?
                    //Se não estiver a busca acontece
                    (<section className="w-full">
                        <Filter searchValue={search[1]} />
                    </section>)
                    :
                    (//Se estiver vazio mosta as imagens favoritadas
                        <section className="bg-[#A7727D]">
                            <Grid photos={favorites} changed={setChange} />
                        </section>
                    )
            }

            <Footer />
        </div>
    )
}


