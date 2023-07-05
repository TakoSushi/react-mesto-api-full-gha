import AutorisationUser from './AutorisationUser';

function Register({ isLoading, onRegisterUser }) {

  return(
    <AutorisationUser
      titleText={"Регистрация"}
      buttonText={"Зарегестрироваться"}
      isLoading={isLoading}
      handleUserData={onRegisterUser}
    ></AutorisationUser>
  );
}
  
export default Register;