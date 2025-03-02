import { Container } from "react-bootstrap";
import styles from "./about.module.css";

const { heads, pList, list } = styles;
const About = () => {
    return (

        <Container>
            <h1 className={heads}>About Us</h1>
            <p className={pList}>Welcome to My E-Commerce Store, your number one source for the best products at unbeatable prices. We are dedicated to providing high-quality items with a focus on reliability, customer service, and uniqueness.</p>
            
            <h2 className={heads}>Our Mission</h2>
            <p className={pList}>Our mission is to make online shopping easy, enjoyable, and affordable for everyone. We strive to bring you the latest trends and essentials while ensuring a seamless shopping experience.</p>

            <h2  className={heads}>Our Story</h2>
            <p className={pList}>Founded in 2025, our journey began with a passion for e-commerce and a commitment to providing excellent service. From a small startup to a growing online store, we continue to evolve and expand our product range to serve our valued customers better.</p>

            <h2 className={heads}>Why Shop With Us?</h2>
            <ul className={`${list} ${pList}`}>
                <li>High-quality products at competitive prices.</li>
                <li>Secure and hassle-free shopping experience.</li>
                <li>Fast and reliable delivery service.</li>
                <li>Excellent customer support.</li>
            </ul>

            <h2 className={heads}>Contact Us</h2>
            <p className={pList}>If you have any questions or feedback, feel free to <a href="contact.php">contact us</a>. We’d love to hear from you!</p>
        </Container>
    )
}

export default About;