import { Link } from 'react-router-dom';
import Container from './Container';
import styles from './Navbar.css';
import logo from '../../img/costs_logo.png'

export default function Navbar(){
    
    return(
        <nav className="navbar">
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs"/>
                </Link>
                <ul className='list'>
                    <li className='item'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='item'>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className='item'>
                        <Link to="/company">Company</Link>
                    </li>
                    <li className='item'>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}