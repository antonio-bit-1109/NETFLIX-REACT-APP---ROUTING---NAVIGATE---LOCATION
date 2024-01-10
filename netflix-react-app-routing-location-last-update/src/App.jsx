import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComponent from "./Components/NavbarComponent";
import NothingFoundHere from "./Components/NothingFoundHere";
import FilmsSection from "./Components/FilmsSection";
import SingleDetailFilm from "./Components/SingleDetailFilm";

function App() {
    return (
        <div className="App ">
            <BrowserRouter>
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
                    <Route
                        path="/singoloFilm/:imdbID"
                        element={
                            <>
                                <NavbarComponent />
                                <SingleDetailFilm />
                            </>
                        }
                    />
                </Routes>{" "}
            </BrowserRouter>
        </div>
    );
}

export default App;
