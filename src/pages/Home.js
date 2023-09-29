import { useEffect, useState } from "react";
import Header from "../components/header";
import Slide from "../components/slide";
import Oweres from "../components/oweres";
import Grid from "../components/grid";
import { useLocation } from "react-router-dom";
import Filter from "../components/filter";
import Data from "../utils/data";
import Footer from "../components/footer";

function Home() {
    //const change simboliza se alguma image foi favoritada ou não
    const [change, setchange] = useState(false);
    //const data recebe um conjunto de imagens
    const [data, setData] = useState([]);

    /*
       Verifica se o user fez uma pesquisa no input de busca do header
       A palavra inserida no input vai para url com o query search
   */
    const location = useLocation(); //url 
    const searchPathname = location.search; //seleciona o query search 
    const search = searchPathname.split("?search=");  //seleciona a palavra buscada

    //carrega os dados
    useEffect(() => {
        Data().then((results) => setData(results))
        setchange(false)
    }, [change])

    return (
        <div className="m-0 p-0 w-screen">
            <Header />


            {//Verifica se o user quer fazer uma busca
                search[1] !== '' && search[1] !== undefined ?
                    (//Se o user quer fazer uma busca as as imagens são procuradas 
                        <section className="w-full">
                            <Filter searchValue={search[1]} />
                        </section>

                    ) :
                    (//Se o user não quiser fazer uma busca a parte pincipal do home é mostrado
                        <main className="">
                            {data.length === undefined && 
                            (
                                <div>
                                    <Slide title={"Luxury Gallery"} wallpapers={data.Wallpapers} />
                                    <div className="mx-10 mt-10 mb-5">
                                        <Oweres photos={data.Photos} />
                                    </div>
                                    <div className="mx-10 mb-10 mt-10 py-10 bg-[#F8EAD8]">
                                        <Grid title={"Collections"} photos={data.Collections} changed={setchange} />
                                    </div>
                                </div>
                            )
                            }
                        </main>
                    )
            }
            <Footer />
        </div>
    );
}

export default Home;
