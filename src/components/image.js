import { ImageListItem } from "@mui/material";
import { BsHeart, BsHeartFill } from 'react-icons/bs'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: '10px',
    border: '2px solid #000',
    p: 4,
};

const numberRowsCols = (col,width,height) => {   

        if (col > 2) {
            if (col === 4) {
                if (width > height) { return [2,4]; }
                else if (height >width) { return [3,3]; }
                else { return [4,4]; }
            }
            if (width >height) { return [2,3]; }
            else if (height > width) { return [3,2]; }
            else { return [2,2]; }
        }
        if (width > height) { return [2,2]; }
        else if (height > width) { return [3,2]; }
        else { return [2,2]; }
    }

export default function Image({ image, changed, col }) {    

    const size = numberRowsCols(col,image.width,image.height)

    const width = image.width
    const height = image.height || (image.cover_photo && image.cover_photo.height);
    const urls = image.urls ? image.urls.regular : (image.cover_photo && image.cover_photo.urls.regular);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const favoriteLocalStorege = (e, figure) => {
        e.preventDefault()

        var array = JSON.parse(localStorage.getItem("favorites")) || []
        const index = array.findIndex(item => item.id === figure.id)

        if (index !== -1) array.splice(index, 1);
        else {
            figure.favorite = true
            array.push(figure)
        }

        localStorage.setItem("favorites", JSON.stringify(array))
        changed(true)
    }

    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    return (
        <ImageListItem
            key={image.id}
            // se a altura for menos que 4000 fixCol
            cols={size[1]}
            rows={size[0]}
            className="relative w-full h-full cursor-pointer"
        >

            {image.favorite
                ?
                <BsHeartFill
                    style={{ color: '#FF0000' }}
                    onClick={e => favoriteLocalStorege(e, image)}
                    className="absolute right-0 z-10 m-2 h-6 w-6"
                />
                :
                <BsHeart
                    style={{ color: '#FF0000' }}
                    onClick={e => favoriteLocalStorege(e, image)}
                    className="absolute right-0 z-10 m-2 h-6 w-6"
                />
            }

            <img

                {...srcset(
                    (urls),
                    (height),
                    (width),
                    (size[0]),
                    (size[1]),
                )}
                alt={image.alt}
                loading="lazy"
                className=""
                onClick={handleOpen}
            />


            <Modal
                open={open}
                onClick={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=""
            >
                <Box sx={style}
                    className={`grid grid-rows-6
                                   max-h-[500px] h-[90%] max-w-[400px] w-[40%] bg-[#F9F5E7] 
                                   rounded-3xl shadow-black shadow-2xl` }
                >
                    <figure className="row-start-1 row-end-6 h-full w-full flex justify-center">
                        <img
                            src={urls}
                            alt={image.alt}
                            loading="lazy"
                            className="shadow-black shadow-lg object-cover"
                        />
                    </figure>


                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="row-start-6 row-end-7 flex flex-col">
                        {image.alt}
                        <br></br>
                        @{image.user.username}
                    </Typography>
                </Box>
            </Modal>
        </ImageListItem>
    )
}