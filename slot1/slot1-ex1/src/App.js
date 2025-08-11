import logo from './logo.svg';
import './App.css';
const myName = "Nam";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello react
        </p>
        <p>
          My name is {myName}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Fer202
        </a>
      </header>
    </div>
  );
}

export default App;
