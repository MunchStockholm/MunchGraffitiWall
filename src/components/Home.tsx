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
        <div>
          <strong id="title">
            <p id="titles">
              {language === 'en' ? 'Munch interactive experience' : 'Munch interaktiv opplevelse'}
            </p>
          </strong>
    
          <div className="container">
            <p id="lineOne">
              <b>{language === 'en' ? '1:' : '1:'}</b>{' '}
              {language === 'en' ? 'Draw on the digital canvas' : 'Tegn på det digitale lerretet'}
            </p>
            <p id="lineTwo">
              <b>{language === 'en' ? '2:' : '2:'}</b>{' '}
              {language === 'en'
                ? 'Send your creation to the big canvas'
                : 'Send din skapelse til det store lerretet'}
            </p>
            <p id="lineThree">
              <b>{language === 'en' ? '3:' : '3:'}</b>{' '}
              {language === 'en'
                ? 'Experience the collection of paintings'
                : 'Opplev samlingen av malerier'}
            </p>
          </div>
    
          <button id="Norw" onClick={() => handleLanguageChange('no')}>
            NO
          </button>
          <button id="Eng" onClick={() => handleLanguageChange('en')}>
            EN
          </button>
    
          <img src={logo} alt="munch.jpg" id="munchImage" />
          <img src={oneLiner} alt="oneLiner.png" id="oneLiner" />
    
          <Link to="/draw">
            <button id="start">Start</button>
          </Link>
        </div>
    );
}

export default Home;