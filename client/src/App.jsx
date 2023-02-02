import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import API from './util/API';
import Auth from './pages/Auth';
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [contents, setContents] = useState(<></>);

  async function handleLogin(info) {
    if (!info.email || !info.password) return;

    const response = await API.login(info);
    console.log(response);

    const user = jwt_decode(response.token);
    console.log(user);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', response.token);
  }

  async function handleLogout() {
    await API.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  async function handleRegister(register) {
      if (!register.username || !register.email || !register.password) return;
      await API.register(register);
  }

  useEffect(() => {
    let item = localStorage.getItem('user');
    if (item) {
      item = JSON.parse(item);
      setUser(item.user);
    }
  }, [])

  useEffect(() => {
    let protectedData;

    if (user) {
      (async() => {
        protectedData = await API.getItems();
        console.log(protectedData);
      })();
    }

    setContents(
      user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <div>

          </div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <Auth handleLogin={handleLogin} handleRegister={handleRegister} />
      )
    )
  }, [user])

  return (
    <div className="App">
      <h1>Auth Testing</h1>
      { contents }
    </div>
  )
}

export default App
