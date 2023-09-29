import { ImageList } from "@mui/material";
import Image from "./image";
import { useEffect, useState } from "react";


const Grid = ({ photos, title, changed }) => {

    const [cols, setCols] = useState(4);

    // Função para verificar o tamanho da tela e atualizar o número de colunas
    const updateCols = () => {

        if (window.innerWidth <= 500) {
            setCols(2); // Se a largura da tela for menor ou igual a 768px, use 2 colunas
        }
        else if (window.innerWidth <= 700) { // Se a largura da tela for menor ou igual a 1024px e maior que 768px, use 3 colunas
            setCols(4);
        }
        else {
            setCols(5)// Caso contrário, use 4 colunas
        }
    };

    useEffect(() => {
        updateCols();
        window.addEventListener('resize', updateCols);
        return () => {
            window.removeEventListener('resize', updateCols);
        };

    }, []);

    return (
        <div className="w-full flex flex-col md:flex-row p-10 ">
            {title && 
                (
                    <h2 
                     className="text-[3rem] w-full overflow-hidden text-center m-0 p-0 md:w-[150px] md:tracking-[8rem] md:text-[6rem] md:[writing-mode:vertical-lr] md:text-start">
                        {title}
                    </h2>                
                )

            }


            <ImageList
                variant="quilted"
                cols={cols}
                rowHeight={121}
                className="w-full"
                gap={8}
            >
                {photos.map((item) => {

                    return (<Image key={item.id} image={item} changed={changed} col={cols} />)
                })
                }
            </ImageList>
        </div >
    )
}

export default Grid;