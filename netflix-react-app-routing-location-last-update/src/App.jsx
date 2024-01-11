import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComponent from "./Components/NavbarComponent";
import NothingFoundHere from "./Components/NothingFoundHere";
import FilmsSection from "./Components/FilmsSection";
import SingleDetailFilm from "./Components/SingleDetailFilm";
import AddComment from "./Components/AddComment";

function App() {
    return (
        <div className="App ">
            <BrowserRouter>
                <h2 data-testid="ELEMENT-TEST">Sempre Visibile</h2>
                <Routes>
                    {/* rotta principale */}
                    <Route
                        path="/"
                        element={
                            <>
                                <NavbarComponent /> <FilmsSection />{" "}
                            </>
                        }
                    />
                    {/* rotta nothing found  */}
                    <Route
                        path="*"
                        element={
                            <>
                                <NavbarComponent />
                                <NothingFoundHere />
                            </>
                        }
                    />
                    {/* rotta paginaDettagli  */}
                    <Route
                        path="/singoloFilm/:imdbID"
                        element={
                            <>
                                <NavbarComponent />
                                <SingleDetailFilm />
                            </>
                        }
                    />
                    <Route
                        path="/AddComment/:imdbID"
                        element={
                            <>
                                {" "}
                                <NavbarComponent /> <AddComment />
                            </>
                        }
                    />
                </Routes>{" "}
            </BrowserRouter>
        </div>
    );
}

export default App;
