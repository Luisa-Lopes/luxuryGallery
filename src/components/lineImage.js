import Image from "./image";

const LineImage = ({ collection }) => {


    return (
        <div className="flex flex-col justify-between bg-white">
            {collection.map(photo => {
                return (
                    <main key={photo.id} className="my-5 shadow-xl shadow-black">
                        <Image image={photo}/>
                    </main>)
            }
            )
            }
        </div>
    )
}

export default LineImage