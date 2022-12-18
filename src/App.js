import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";

function App() {
  return (
    <div className="App">
      <SavedNewsHeader />
      {/* <Main />
      <About /> */}
      <Footer />
    </div>
  );
}

export default App;
