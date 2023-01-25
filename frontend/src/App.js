import Footer from "./component/Footer";
import Header from "./component/Header";
import RouteList from "./routes/RouteList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <div className="mainDiv">
      <section id="header">
        <Header />
      </section>
      <div className="subDiv">
        <RouteList />
      </div>
      {/* <section id="footer">
        <Footer />
      </section> */}
    </div>
  );
}

export default App;
