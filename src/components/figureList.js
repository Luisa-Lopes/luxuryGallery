import { useEffect, useState } from "react"

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { BsHeart, BsHeartFill } from 'react-icons/bs'

const FigureList = ({ figures , changed }) => {

    const [cols, setCols] = useState(4); // Inicialmente, 4 colunas

    // Função para verificar o tamanho da tela e atualizar o número de colunas
    const updateCols = () => {
        if (window.innerWidth <= 768) {
            setCols(2); // Se a largura da tela for menor ou igual a 768px, use 2 colunas
        }
        else if (window.innerWidth <= 1024) { // Se a largura da tela for menor ou igual a 1024px e maior que 768px, use 3 colunas
            setCols(3);
        }
        else {
            setCols(4)// Caso contrário, use 4 colunas
        }
    };

    const favoriteLocalStorege = (e, figure) => {
        e.preventDefault()

        var array = JSON.parse(localStorage.getItem("favorites")) || []
        const index = array.findIndex(item => item.id === figure.id)

        if (index !== -1) array.splice(index, 1);
        else {
            figure.favorite = true
            array.push(figure)}

        localStorage.setItem("favorites", JSON.stringify(array))
        changed(true)
    }

    useEffect(() => {
        updateCols();
        window.addEventListener('resize', updateCols);
        return () => {
            window.removeEventListener('resize', updateCols);
        };
    }, []);

    return (
        <ImageList className="" cols={cols} gap={15}>
            {
                figures.map(item => (

                    <ImageListItem sx={{ height: 200 }} key={item.id} className="">
                        <img
                            src={item?.urls?.regular || item.cover_photo.urls.regular}
                            alt={item.title}
                            loading="lazy"
                            className="h-full relative"
                        />

                        <ImageListItemBar
                            title={item.alt}
                            subtitle={`by: ${item.user.name}`}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.alt}`}
                                >
                                    {item.favorite
                                        ?

                                        <BsHeartFill
                                            style={{ color: '#FF0000' }}
                                            onClick={e => favoriteLocalStorege(e, item)}
                                            className="absolute right-0 z-10 m-2 h-6 w-6"
                                        />
                                        :
                                        <BsHeart
                                            style={{ color: '#FF0000' }}
                                            onClick={e => favoriteLocalStorege(e, item)}
                                            className="absolute right-0 z-10 m-2 h-6 w-6"
                                        />

                                    }
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))

            }

        </ImageList>
    )

}

export default FigureList;