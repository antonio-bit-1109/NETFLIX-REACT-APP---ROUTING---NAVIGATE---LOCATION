import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FilmsSection = () => {
    const [arrayOfFilms, setArrayOfFilms] = useState(null);
    console.log("FILMS", arrayOfFilms);

    useEffect(() => {
        FetchAGet("bob");
    }, []);

    const FetchAGet = (value) => {
        const options = {
            method: "GET",
            headers: {},
        };

        fetch(`http://www.omdbapi.com/?s=${value}&apikey=195f13a4`, options)
            .then((response) => {
                if (!response.ok) {
                    if (response.status > 400 && response.status < 500) {
                        if (response.status === 429) {
                            throw new Error("429 INFAME PER TE TANTE COSE BRUTTE");
                        } else {
                            throw new Error("STAI CAPPELLANDO , RIGUARDA QUELLO CHE HAI SCRITTO");
                        }
                    }
                    if (response.status > 500 && response.status < 600) {
                        throw new Error("SERVER SPOMPATO, NON FUNZIA??");
                    }
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                setArrayOfFilms(data.Search);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <Container>
                <Row data-testid="ROW-ID">
                    {arrayOfFilms &&
                        arrayOfFilms.slice(0, 6).map((film) => (
                            <Col sm={12} md={8} lg={6} xl={4} xxl={3} key={film.imdbID}>
                                <Card className="m-4">
                                    <Link to={`/singoloFilm/${film.imdbID}`}>
                                        <Card.Img
                                            data-testid="IMG-TEST"
                                            variant="top"
                                            src={film.Poster}
                                            alt="img-film"
                                        />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>{film.Title}</Card.Title>
                                        <Card.Text>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, aliquam?
                                        </Card.Text>
                                        <Link
                                            data-testid="TEST-BUTTON"
                                            className="btn btn-warning m-0"
                                            to={`/singoloFilm/${film.imdbID}`}
                                        >
                                            Scopri ulteriori dettagli
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    );
};

export default FilmsSection;
