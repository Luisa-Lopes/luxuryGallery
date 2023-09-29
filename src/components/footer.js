import { BsInstagram, BsPinterest, BsTwitter, BsFacebook } from 'react-icons/bs'

const Footer = () => {

    return (
        <footer className='h-80 bg-white'>
            <hr></hr>
            <div className="flex flex-col md:grid md:grid-cols-2">

                <section className="flex flex-col p-5">
                    <h2 className='p-3 text-2xl font-bold'>Luxury Gallery</h2>
                    <p className='p-3'> More than 4.4 million high-quality images, photos and videos for your projects.</p>
                    <ul className='p-3 flex flex-row'>
                        <li className='px-3'>
                            <BsInstagram />
                        </li>
                        <li className='px-3'>
                            <BsPinterest />
                        </li>
                        <li className='px-3'>
                            <BsTwitter />
                        </li>
                        <li className='px-3'>
                            <BsFacebook />
                        </li>
                    </ul>
                </section>
                
                <section className='grid grid-cols-3 p-5'>
                    <div>
                        <h4 className='font-bold'>Discover</h4>
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='font-bold'>Community</h4>
                        <ul>
                            <li>Users</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='font-bold'>About Us</h4>
                        <ul>
                            <li>FAQ</li>
                            <li>License Summary</li>
                            <li>Service Terms</li>
                            <li>Privacy Policy</li>
                            <li>Cookies Policy</li>
                            <li>API</li>
                        </ul>
                    </div>
                </section>
            </div>
        </footer>

    )
}

export default Footer;

