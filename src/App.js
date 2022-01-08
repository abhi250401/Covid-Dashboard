import './App.css';
import Dashboard from './Dashboard';
import styled from "styled-components"
const Title = styled.h1`
    font-size: 2em;
    color: #334E93;
    padding-left:1.5em;
    margin-top:1.5em;
    `;
function App() {
  return (
    <div className="App">
      <Title >Covid Dashboard</Title>
      <Dashboard />
    </div>
  );
}

export default App;
