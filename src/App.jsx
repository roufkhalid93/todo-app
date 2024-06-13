import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddTodo from "./pages/AddTodo";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";

function Layout() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
          {/* line 13-15:create Nav component in the existing Navbar with href linked of the /add  */}
        </Container>
      </Navbar>
      <Outlet />
      {/* // 'Outlet' equivalent to {children} special prop. allow the route in the path to be shown */}
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  // use local storage to store data with the key todos and value an empty array 

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* if you go to any random url, error page (line 28) will be shown within the navbar (line 13) since the Layout (line 25) is wrapping the whole page view */}
            <Route index element={<Home />} />
            <Route path="add" element={<AddTodo />} />
            {/* route/path of line 13-15 through /add */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}