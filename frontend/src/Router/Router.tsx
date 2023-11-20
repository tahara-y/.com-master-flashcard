import { Route, Routes } from 'react-router-dom';
import SingUpPage from '../Pages/SingUpPage';
import LogInPage from '../Pages/LoginPage';
import MenuPage from '../Pages/MenuPage';
import FlashcardPage from '../Pages/FlashcardPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LogInPage />} />
      <Route path='/signup' element={<SingUpPage />} />
      <Route path='/menu' element={<MenuPage />} />
      <Route path='/flashcard' element={<FlashcardPage />} />
    </Routes>
  )
}

export default Router;
