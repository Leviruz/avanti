import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../assets/img/slide1.png';
import slide2 from '../assets/img/slide2.png';
import slide3 from '../assets/img/slide3.png';
import { Link } from 'react-router-dom';

const Carrossel = () => {
    return (
        <>
        <Carousel data-bs-theme="light">
            <Carousel.Item>
                <Link to={"/vitrine"}>
                <img
                    className="d-block w-100"
                    src={slide1}
                    alt="First slide"
                />
                </Link>

            </Carousel.Item>
            <Carousel.Item>
            <Link to={"/vitrine"}>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second slide"
                />
                </Link>

            </Carousel.Item>
            <Carousel.Item>
            <Link to={"/vitrine"}>
                <img
                    className="d-block w-100"
                    src={slide3}
                    alt="Third slide"
                />
                </Link>

            </Carousel.Item>
        </Carousel>
        </>
    )
}

export default Carrossel