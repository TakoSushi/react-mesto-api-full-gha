import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import NotFoundPage from './NotFoundPage.js';
import api from '../utils/api.js';
import { signUp, signIn } from '../utils/auth.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);

  const navigate = useNavigate();


  useEffect( () => {
    if(isLoggedIn){
      api.getUserInfo()
      .then( (userData) => setCurrentUser(userData))
      .catch( (err) => console.warn(err));

      api.getInitialCards()
      .then( (cardsData) => setCards(cardsData))
      .catch((err) => console.warn(err));
    }
  }, [isLoggedIn]);

  useEffect( () => {
    handleAutoSignIn();
  }, []);

  function handleAutoSignIn() {
    api.getUserInfo()
      .then( () => {
        setLoggedIn(true);
      })
      .catch(err => {
        setLoggedIn(false);
        setIsAuthSuccess(false);
        setInfoTooltipOpen(true);
        console.warn(err);
      });
  }

  if(isLoggedIn === null) {
    return(<div className='default'>Loading...</div>)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch( err => console.warn(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch( err => console.warn(err));
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true);

    api.setUserInfo(newUserData).then( (userData) => setCurrentUser(userData))
    .then( () => closeAllPopups())
    .catch( err => console.warn(err))
    .finally( () => setIsLoading (false));
  }

  function handleUpdateAvatar(newAvatarUrl) {
    setIsLoading(true);

    api.setUserAvatar(newAvatarUrl).then( (userData) => setCurrentUser(userData))
    .then( () => closeAllPopups())
    .catch( err => console.warn(err))
    .finally( () => setIsLoading (false));
  }

  function handleAddPlaceSubmit(newCardData) {
    setIsLoading(true);

    api.addNewCard(newCardData).then( (newCard) => setCards([newCard, ...cards]))
    .then( () => closeAllPopups())
    .catch( err => console.warn(err))
    .finally( () => setIsLoading (false));
  }

  function handleUserRegisterSubmit(newUserData) {
    setIsLoading(true);

    signUp(newUserData)
    .then( () => {
      setIsAuthSuccess(true);
      navigate('/sign-in');
    })
    .catch(err => {
      setIsAuthSuccess(false);
      console.log(err);
    })
    .finally( () => {
      setInfoTooltipOpen(true);
      setIsLoading (false)
    });
  }

  function handleUserLoginSubmit(UserData) {
    setIsLoading(true);

    signIn(UserData)
    .then( () => {
      setLoggedIn(true);
      setUserEmail(UserData.email);
      navigate('/');
    })
    .catch(err => {
      setIsAuthSuccess(false);
      setInfoTooltipOpen(true);
      console.log(err);
    })
    .finally( () => setIsLoading (false));
  }

  function handleExitUser() {
    setLoggedIn(false);
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} userEmail={userEmail} onExitUser={handleExitUser}/>

        <Routes>
          <Route path='/' element={<ProtectedRoute element={Main}
            isLoggedIn={isLoggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            />}
          />
          <Route path='sign-up' element={<Register isLoading={isLoading} onRegisterUser={handleUserRegisterSubmit} />} />
          <Route path='sign-in' element={<Login isLoading={isLoading} onLoginUser={handleUserLoginSubmit} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <PopupWithForm
          title="Вы уверены?"
          buttonText="Да"
          name="delete-confirm"
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isAuthSuccess={isAuthSuccess}
        ></InfoTooltip>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
