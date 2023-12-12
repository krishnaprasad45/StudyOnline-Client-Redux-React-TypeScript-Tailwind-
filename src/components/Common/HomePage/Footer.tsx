
import './navbar.css'
import { Link } from "react-router-dom";


function Footer() {

  

    return (

        <div className="bg-[#dbdbdb] flex justify-between px-[3%] w-[100%] shadow-xl items-center h-[80px]">
           
               
            <div >
                    <p className="font-extrabold">All copytight - StudyOnline Pvt. Lmt.</p>
                    </div>
                    <div>
                        <div className="flex gap-7">
                            <Link to={""} >
                                <div className= 'border-b-2 border-black'>
                                    <p className="font-extrabold">About</p>
                                </div>
                            </Link>
                            <Link to={""} >
                                <div className= 'border-b-2 border-black'>
                                    <p className="font-extrabold">Contact</p>
                                </div>
                            </Link>
                            <Link to={""} >
                                <div className=''>
                                    <p className="font-extrabold">More</p>
                                </div>
                            </Link> 

                              
                        </div>
                    </div>
                    </div>

      

    )
}

export default Footer;