import { useCallback, useEffect, useRef, useState } from "react"

// Hook para criar um intervalo controlado
function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        tick(); // Chamamos a função imediatamente ao iniciar o intervalo
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
      }
    }, [delay]);
  }

const Slide = ({wallpapers,title}) => {
    
    const [photo, setPhoto] = useState()
   
    const changeWallpaper = useCallback(() => {
        setPhoto(wallpapers[Math.floor(Math.random() * wallpapers.length)]);
      }, [wallpapers]);
    
      // Use o useInterval para acionar a troca de papel de parede a cada 10 segundos
      useInterval(() => {
        changeWallpaper();
      }, 10000);

    return (
        <div className="w-full h-[75vh] relative">
            <div className="absolute text-[5rem] z-10 top-[50%] text-white text-center w-full ">
                <h1>{title}</h1>
            </div>
            {photo == null ?
                (<section>

                </section>
                )
                : (
                     <img
                            src={photo.urls.full}
                            className="w-full h-full opacity-80"
                            alt="slide"
                            loading="lazy"
                        />
                )
            }
           
        </div>
    )
}

export default Slide;