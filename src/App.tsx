import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { NewsArticleDetails } from "./components/NewsArticleDetails";
import NewsComponent from "./components/NewsComponent";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="App">
          <Routes>
            {/* <Route path='/login' element={<Login />} /> */}
            <Route path="/" element={<NewsComponent />} />
            <Route path="/articles/:id" element={<NewsArticleDetails />} />

            {/* <Route path='/users/:id' element={ <Home><NewsArticleDetails /></Home>} /> */}
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
