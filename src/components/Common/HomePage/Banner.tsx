
import { Link } from "react-router-dom";
import { BannerProps } from "../../../Interfaces/banner";

function Banner(props:BannerProps) {
    const banner_image = {
        background: `url(${props.background.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'white'
    };
    
    return (
        <div className="h-[90vh]" style={banner_image}>
            <div className={`h-[90vh] bg-black bg-opacity-50 flex items-center px-[3.5%] ${props.right ? 'justify-end' : ''}`}>
                <div>
                    <p className="text-white text-2xl w-[80%]">
                        {props.paragraph}
                    </p>
                    <h1 className="text-white text-6xl font-bold">{props.heading}</h1>
                    <Link to={props.linkTo}>
                        <button className="green_btn  mt-3">{props.button}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;
