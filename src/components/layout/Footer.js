import styles from './Footer.css';
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

export default function Footer(){
    return(
        <footer className='footer'>
            <ul className='social_list'>
                <li>
                    <FaFacebook></FaFacebook>
                </li>
                <li>
                    <FaInstagram></FaInstagram>
                </li>
                <li>
                    <FaLinkedin></FaLinkedin>
                </li>
            </ul>
            <p className='copy_right'><span>Costs</span> &copy; 2023</p>
        </footer>
    )
}