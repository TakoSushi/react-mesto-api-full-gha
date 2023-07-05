import whiteLogo from '../images/mesto-logo_white.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({isLoggedIn, userEmail, onExitUser}) {

  return (
    <header className="header">
      <img className="header__logo" src={whiteLogo} alt="логотип Место"/>
      <ul className="header__bar">
        { isLoggedIn
          ? <>
            <li><p className="header__user-email">{userEmail}</p></li>
            <li><button className="header__link header__link_button-style" to='/sign-in' onClick={onExitUser}>Выйти</button></li>
            </>
          : <Routes>
              <Route path='/sign-in' element={<li><Link className="header__link" to='/sign-up'>Регистрация</Link></li>} /> 
              <Route path='/sign-up' element={<li><Link className="header__link" to='/sign-in'>Вход</Link></li>} /> 
            </Routes>
        }
      </ul>
    </header>
  );
}

export default Header;