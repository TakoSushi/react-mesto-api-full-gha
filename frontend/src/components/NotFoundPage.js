import { Link } from 'react-router-dom'

function NotFoundPage() {
  return(
    <div className='default'>
      <p>404</p>
      <Link className='default__link' to='/'>Вернуться на начальную страницу</Link>
    </div>
  );
}

export default NotFoundPage;