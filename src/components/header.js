import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"


const Header = () => {

    const location = useLocation();
    const { pathname } = location
    const splitLocation = pathname.split("/");

    const [mouse, setMouse] = useState(false);

    const navigate = useNavigate()

    const searchInput = (value) => {
        const updatedSearch = value;
        
        navigate(`?search=${updatedSearch}`);
    }


    return (
        <nav className="w-full  bg-[#85586F] px-4 py-1 text-[#F8EDE3] ">
            <h1 className="font-bold mx-1 block">
                <Link to={"/"}>Luxury Gallery
                </Link>
            </h1>
            <ul className="flex justify-center mx-auto">
                <li className={`relative header-link ${splitLocation[1] === "photos" ? "text-[#3F2305]" : ""}`}>

                    <Link
                        to={"/photos"}
                        onMouseEnter={() => setMouse(true)}
                        onMouseLeave={() => setMouse(false)}
                        className=""
                    >Photos</Link>
                    <div
                        className={`dropdown mt-2 absolute z-20 bg-white border-4 rounded-lg shadow-md shadow-black p-2 text-center text-amber-950 ${mouse ? "" : "hidden"}`}
                        onMouseEnter={() => setMouse(true)}
                        onMouseLeave={() => setMouse(false)}
                        style={{ left: "50%", transform: "translateX(-50%)" }}
                    >
                        <div id="seta"></div>
                        <ul>
                            <li><Link to={"/topics/Nature"}>Nature</Link></li>
                            <li><Link to={"/topics/People"}>People</Link></li>
                            <li><Link to={"/topics/Architecture"}>Architecture</Link></li>
                            <li><Link to={"/topics/Film"}>Film</Link></li>
                            <li><Link to={"/topics/StreetPhotography"}>StreetPhotography</Link></li>
                        </ul>
                    </div>

                </li>
                <li className="header-link"><Link to={"/people"}> Users </Link></li>
                <li className="header-link"><Link to={"/favorites"}> Favorites </Link></li>
                <form>
                    <input
                        onChange={(e) => searchInput(e.target.value)}
                        type='search'
                        name='busca'
                        placeholder='Search images, users'
                        className="text-[#85586F] input bg-transparent w-6 h-6 rounded-2xl bg-contain bg-no-repeat bg-right border-none placeholder-transparent focus:w-[220px] focus:p-1 focus:bg-white focus:placeholder-[#85586F] focus:border-solid focus:outline-none transition-all duration-1000 focus:border-white"
                    />
                </form>
            </ul>

        </nav>
    )
}


export default Header