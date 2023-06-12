import { useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/munch.jpg';
import oneLiner from '../assets/images/oneLiner.png';

const Home = () => {
    // State
    const [language, setLanguage] = useState('en');

    // Handle language change
    const handleLanguageChange = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);
    };

    return (
        <div id='homepage-body'>
            <img src={logo} alt="munch.jpg" id="munchImage" />

            <strong id="title">
                <p id="titles">
                {language === 'en' ? 'Munch interactive experience' : 'Munch interaktiv opplevelse'}
                </p>
            </strong>
    
            <div className="container">
                <div id='steps-group'>
                    <p>
                        <b>{language === 'en' ? '1:' : '1:'}</b>{' '}
                        {language === 'en' ? 'Draw on the digital canvas' : 'Tegn på det digitale lerretet'}
                    </p>

                    <p>
                        <b>{language === 'en' ? '2:' : '2:'}</b>{' '}
                        {language === 'en'
                            ? 'Send your creation to the big canvas'
                            : 'Send din skapelse til det store lerretet'}
                    </p>

                    <p>
                        <b>{language === 'en' ? '3:' : '3:'}</b>{' '}
                        {language === 'en'
                            ? 'Experience the collection of paintings'
                            : 'Opplev samlingen av malerier'}
                    </p>
                </div>

                <img src={oneLiner} alt="oneLiner.png" id="oneLiner" />
            </div>

            <footer>
                <div className='lang-btn-group'>
                    <button className='lang-btn footer-btn' id="nor" onClick={() => handleLanguageChange('no')}>
                        NO
                    </button>

                    <button className='lang-btn footer-btn' id="eng" onClick={() => handleLanguageChange('en')}>
                        EN
                    </button>
                </div>
            
                <button className='footer-btn' id='start-btn'>
                    <Link to="/draw"> Start</Link>
                </button>
            </footer>
        
        </div>
    );
}

export default Home;