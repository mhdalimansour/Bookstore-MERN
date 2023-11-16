import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import Cart from "./components/Cart";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import BookAdmin from "./pages/BookAdmin";
import BookDetailsPage from "./pages/BookDetailsPage";
import BooksPage from "./pages/BookPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrdersAdmin from "./pages/OrdersAdmin";
import SignupPage from "./pages/SignupPage";
// document.addEventListener("contextmenu", function (event) {
//   event.preventDefault();
// });

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/books" element={<BooksPage />}></Route>
            <Route
              path="/books/:bookSlug"
              element={<BookDetailsPage />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/admin-page" element={<AdminPage />}></Route>
            <Route path="/books-admin" element={<BookAdmin />}></Route>
            <Route path="/orders-admin" element={<OrdersAdmin />}></Route>
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

export default App;
