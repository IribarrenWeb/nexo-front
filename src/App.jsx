import { Route, Routes } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout.jsx';
import AppLayout from './layout/AppLayout.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import { AuthenticateGuard } from './components/guards/AuthenticateGuard.jsx';
import Users from './pages/Users.jsx';
import { RoleGuard } from './components/guards/RoleGuard.jsx';
import Post from './pages/Post.jsx';
import Messages from './pages/Messages.jsx';

function App() {
  return (
    <Routes>
      
	  <Route element={<AuthenticateGuard/>}>
		<Route element={<AppLayout />}>
			<Route path='/' element={<Home />} />
			<Route path='/profile' element={<Profile />} />
			
			<Route element={<RoleGuard role="admin"/>}>
				<Route path='/users' element={<Users />} />
			</Route>

			<Route path='/post/:id' element={<Post />} />
			
			<Route path='/messages/:from?' element={<Messages />} />

			{/* ponemos esta ruta al final para capturar los perfiles de usuario sin pisar las otras rutas */}
			<Route path='/:username' element={<Profile />} /> 
		</Route>
	  </Route>

	  <Route element={<AuthLayout />}>
	  	<Route path='/login' element={<Login />} />
		<Route path='/register' element={<Register />} />
	  </Route>

	  <Route path='*' element={<h1 className='text-center mt-20 text-3xl font-bold'>404</h1>} />
    </Routes>
  )
}

export default App;