import Banner from "../../components/Common/HomePage/Banner";
import Footer from "../../components/Common/HomePage/Footer";
import Navbar from "../../components/Common/HomePage/NavBar";

function HomePage() {
    return (
        <>
            <Navbar />
            <Banner background={{ url: 'https://e1.pxfuel.com/desktop-wallpaper/343/502/desktop-wallpaper-online-education-application-learning-worldwide-on-computer-mobile-website-background-social-distance-concept-the-classroom-training-course-library-vector-illustration-flat-1937754-vector-art-at-vecteezy.jpg' }} heading="let's Learn through Online" paragraph="hey," button="LOGIN NOW" linkTo="/" />
            <Banner background={{ url: 'https://t3.ftcdn.net/jpg/03/45/29/56/240_F_345295622_gUzV6dU09syTrk49uSabBvhaEDBlJeFp.jpg' }} heading="Are you interested to teach ?" paragraph="hey want to join with us" button="LOGIN" linkTo="/mentor/login" />
            <Banner background={{ url: 'https://t4.ftcdn.net/jpg/04/45/70/71/240_F_445707107_elptpcI7pUDPa9kMdnX9e3506QdHfo7r.jpg' }} button="READ MORE" heading="Build eductaion better with us" paragraph="join with us" right={true} linkTo={""} />
            <Footer/>
        </>
    )
}

export default HomePage;