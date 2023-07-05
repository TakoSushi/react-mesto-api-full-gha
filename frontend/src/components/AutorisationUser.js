import { useState } from 'react';
import { Link } from 'react-router-dom';


function AutorisationUser({titleText, buttonText, isLoading, handleUserData}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUserData({
      password,
      email
    });
  }

  return(
    <div className="authentication">
      <h2 className="authentication__title">{titleText}</h2>
      <form name={'login'} method="POST" className="authentication__form" onSubmit={handleSubmit}>
        <section>
          <input
            type="text"
            name="user-email"
            placeholder="Email"
            onChange={handleChangeEmail}
            className="authentication__input-data authentication__input-data_user-email"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="authentication__error-message"></span>
          <input
            type="password"
            name="user-password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            className="authentication__input-data authentication__input-data_user-password"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="authentication__error-message"></span>
        </section>
        <button type="submit" className="authentication__button" disabled={isLoading}>
          {isLoading ? 'Ожидайте...' : `${buttonText}`}
        </button>
      </form>

      {buttonText === "Зарегестрироваться" && <p className='authentication__text'>Уже зарегестрированы? <Link className='authentication__link' to='/sign-in'>Войти</Link></p>}

    </div>
  );
}
  
export default AutorisationUser;