import { useEffect, useState } from "react";
import Card from "./card";


const Oweres = ({photos}) => {

    const [owners, setOwners] = useState([])
    
    useEffect(() => {
        
    }, []);

    useEffect(() => {
        
        if(photos !== undefined){
        const owners = Filterowners(photos)
        setOwners(owners.splice(0, 6))
        }
        
    }, [photos])


    const Filterowners = (results) => {
       
        let array = []
        results.forEach(element => {
            
            const info = element.user || element
            
            const obj = {
                bio: info.bio ,
                id: info.id,
                first_name: info.first_name,
                profile_image: info.profile_image,
                username: info.username
            }
            const index = array.findIndex(item => item.id === obj.id)
            if (index === -1) { array.push(obj) }

        });
        return array
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {owners.map(ower => {

                return (
                    <div key={ower.id} className="h-72 w-full">
                        <Card bio={ower.bio} id={ower.id} first_name={ower.first_name} image={ower.profile_image} username={ower.username} />
                    </div>
                )
            })
            }
        </div>
    )
}

export default Oweres;