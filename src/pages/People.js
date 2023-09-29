import React, { useEffect, useState } from 'react'
import Header from "../components/header";
import Data from '../utils/data';
import Card from "../components/card";
import { useLocation } from "react-router-dom";
import Filter from "../components/filter";
import Footer from '../components/footer';

function People() {

    const [data, setData] = useState([]);

    /*
        Verifica se o user fez uma pesquisa no input de busca do header
        A palavra inserida no input vai para url com o query search
    */
    const location = useLocation(); //url
    const searchPathname = location.search; //Seleciona o query search
    const search = searchPathname.split("?search="); //Seleciona a palavra buscada

    useEffect(() => {
        //Recebendo os dados
        Data().then((results) => {
            //const que pega do conjunto Photos presente em data, e filtra o users
            const filterPhotos = () => {
                var array = []

                results.Photos.forEach(
                    photo => {
                        //Verifca se o user já está presente no array
                        const index = array.findIndex(item => item.user.id === photo.user.id)
                        // Se não estiver o findIndex retorna -1
                        if (index === -1) array.push(photo) //Com isso adicionamos no array
                    }
                )
                return array
            }
            setData(filterPhotos)
        })
    }, [])

    return (
        <div>
            <Header />
            {//Verifca se a busca está vazia
            search[1] !== '' && search[1] !== undefined ?
                (//Se não estiver a busca acontece
                    <section className="w-full">
                        <Filter searchValue={search[1]} />
                    </section>
                ) :
                (//Se estive mostra os users
                    <main className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-10'>
                        {data.map(item => {
                            return (
                                <div key={item.id} className='h-72'>
                                    <Card first_name={item.user.first_name} image={item.user.profile_image} username={item.user.username} />
                                </div>

                            )
                        })

                        }
                    </main>
                )

            }

            <Footer/>
        </div>
    )
}

export default People