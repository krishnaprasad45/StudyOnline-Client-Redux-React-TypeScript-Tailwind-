
import './navbar.css'
import { Link } from "react-router-dom";


function Navbar() {

  

    return (

        <div className="bg-[#F8F8F8] flex justify-between px-[3%] w-[100%] shadow-xl items-center h-[80px]">
            <div>
                <img className="h-[40px]"  alt="" />
            </div>
            <div>
               
                  
                    
                    <div>
                        <div className="flex gap-7">
                            <Link to={""} >
                                <div className= 'border-b-2 border-black'>
                                    <p className="font-extrabold">ABOUT</p>
                                </div>
                            </Link>
                            <Link to={""} >
                                <div className= 'border-b-2 border-black'>
                                    <p className="font-extrabold">CONTACT</p>
                                </div>
                            </Link>
                            <Link to={""} >
                                <div className=''>
                                    <p className="font-extrabold">MORE</p>
                                </div>
                            </Link> 

                              
                        </div>
                    </div>
                

            </div>
        </div>

    )
}

// eslint-disable-next-line no-irregular-whitespace
export default Navbar;