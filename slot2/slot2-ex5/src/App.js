import logo from './logo.svg';
import './App.css';
import CourseList from './CourseList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          I love FPT
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CourseList />
      </header>
    </div>
  );
}

export default App;
