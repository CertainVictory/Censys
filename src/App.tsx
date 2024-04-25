import './App.css';

import PaginatedList from './components/PaginatedList';
function App() {
  return (
    <div>
      <div>
        <img src={'https://search.censys.io/static/img/censys-2022.svg'} />
      </div>
      <div style={{ fontSize: 32 }}>Censys API Search Assessment</div>
      <div className="card">
        <PaginatedList />
      </div>
    </div>
  );
}

export default App;
