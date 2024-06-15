import '../src/App.css';
import Footer from './routes/Footer';
import Header from './routes/Header';
import Main from './routes/Main';

function App() {
  return (
    <div className="web">
      <div className="web_div">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
