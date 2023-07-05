import AutorisationUser from './AutorisationUser';

function Login( {isLoading, onLoginUser}) {

  return(
    <AutorisationUser
      titleText={"Вход"}
      buttonText={"Войти"}
      isLoading={isLoading}
      handleUserData={onLoginUser}
    ></AutorisationUser>
  );
}

export default Login;