import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Todo />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
