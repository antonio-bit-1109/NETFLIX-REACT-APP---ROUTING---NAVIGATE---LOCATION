import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const SingleDetailFilm = () => {
    const params = useParams();
    console.log("questo è il params perbacco!", params);

    const [detailSIngleFilm, SetdetailSIngleFilm] = useState(null);
    console.log("detailSIngleFilm", detailSIngleFilm);

    const [comments, setComments] = useState(null);
    console.log("comments", comments);

    useEffect(() => {
        FetchAGet(params.imdbID);
    }, []);

    useEffect(() => {
        FetchAGet(params.imdbID);
    }, [params]);

    const FetchAGet = (value) => {
        const optionsSingleFilm = {
            method: "GET",
            headers: {},
        };

        const optionsComments = {
            method: "GET",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDQ5MDEwMzksImV4cCI6MTcwNjExMDYzOX0.JgBLrx0gtEMbqKZEL4v4DHn-u2liDfnO58fki3MUC1Q",
            },
        };

        const UrlToGetSingleFilm = `http://www.omdbapi.com/?apikey=195f13a4&i=${value}`;
        const UrlToGetComments = `https://striveschool-api.herokuapp.com/api/comments/${value}`;

        fetch(UrlToGetSingleFilm, optionsSingleFilm)
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
                SetdetailSIngleFilm(data);

                return fetch(UrlToGetComments, optionsComments);
            })
            .then((returnedComments) => {
                console.log(returnedComments);
                return returnedComments.json();
            })
            .then((dataComments) => {
                console.log(dataComments);
                setComments(dataComments);
            })

            .catch((err) => console.error(err));
    };

    return (
        <>
            {" "}
            {detailSIngleFilm && comments && (
                <Container>
                    <Row className="justify-content-center">
                        {" "}
                        <Col sm={12} md={8} lg={6} xl={6} xxl={5}>
                            <Card className="mt-5">
                                <Card.Img
                                    variant="top"
                                    src={detailSIngleFilm.Poster}
                                    style={{ maxHeight: "500px", objectFit: "contain" }}
                                />
                                <Card.Body>
                                    <Card.Title>
                                        {" "}
                                        <h6>Actors:</h6> {detailSIngleFilm.Actors}
                                    </Card.Title>
                                    <Card.Text>
                                        <h6 className="mt-3">Plot:</h6> {detailSIngleFilm.Plot}
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Box Office:</h6> {detailSIngleFilm.BoxOffice}
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Country:</h6> {detailSIngleFilm.Country}
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Genre:</h6> {detailSIngleFilm.Genre}
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Type:</h6> {detailSIngleFilm.Type}
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Writer: </h6>
                                        {detailSIngleFilm.Writer}
                                    </Card.Text>

                                    <Link to={`/AddComment/${detailSIngleFilm.imdbID}`} className="btn btn-primary">
                                        Vuoi scrivere un commento ?{" "}
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {" "}
                            <ListGroup>
                                <h3>Lista dei commenti: </h3>
                                {comments.slice(0, 5).map((comment, index) => (
                                    <>
                                        <div key={`comm-${index}`} className=" border border-primary my-3">
                                            {" "}
                                            <ListGroup.Item>{comment.author}</ListGroup.Item>
                                            <ListGroup.Item>{comment.comment}</ListGroup.Item>
                                            <ListGroup.Item>{comment.elementId}</ListGroup.Item>
                                        </div>
                                        <div>
                                            <Button variant="danger">Cancella Commento </Button>
                                        </div>
                                    </>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default SingleDetailFilm;
