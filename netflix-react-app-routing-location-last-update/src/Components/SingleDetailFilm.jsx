import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CommentsComponent from "./CommentsComponent";
import { Alert } from "react-bootstrap";

const SingleDetailFilm = () => {
    const params = useParams();
    console.log("questo è il params perbacco!", params);

    const [detailSIngleFilm, SetdetailSIngleFilm] = useState(null);
    console.log("detailSIngleFilm", detailSIngleFilm);

    const [comments, setComments] = useState(null);
    console.log("comments", comments);

    /* gestione della cancellazione del commento  */
    const [commentDeleted, setCommentDeleted] = useState(false);

    useEffect(() => {
        FetchAGet(params.imdbID);
    }, []);

    useEffect(() => {
        FetchAGet(params.imdbID);
    }, [params]);

    useEffect(() => {
        if (commentDeleted) {
            setTimeout(() => {
                setCommentDeleted(false);
            }, 1000);
        }
    }, [commentDeleted]);

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
                            <Card className="my-5">
                                <Card.Img variant="top" src={detailSIngleFilm.Poster} />
                                <Card.Body>
                                    <Card.Title>
                                        {" "}
                                        <h6>Actors:</h6> <p>{detailSIngleFilm.Actors}</p>
                                    </Card.Title>
                                    <Card.Text>
                                        <h6 className="mt-3">Plot:</h6> <p>{detailSIngleFilm.Plot}</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Box Office:</h6> <p>{detailSIngleFilm.BoxOffice}</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Country:</h6> <p>{detailSIngleFilm.Country}</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Genre:</h6> <p>{detailSIngleFilm.Genre}</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Type:</h6> <p>{detailSIngleFilm.Type}</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>Writer: </h6>
                                        <p>{detailSIngleFilm.Writer}</p>
                                    </Card.Text>

                                    <Link
                                        data-testid={"BTN-SINGLEDETAIL"}
                                        to={`/AddComment/${detailSIngleFilm.imdbID}`}
                                        className="btn btn-primary"
                                    >
                                        Vuoi scrivere un commento ?{" "}
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>{" "}
                    </Row>
                    {commentDeleted && (
                        <Row className="justify-content-center">
                            <Col sm={12} md={8} lg={6} xl={6} xxl={5}>
                                <Alert variant={"success"}>commento cancellato con successo!</Alert>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <CommentsComponent
                            comments={comments}
                            setCommentDeleted={setCommentDeleted}
                            commentDeleted={commentDeleted}
                        />
                    </Row>
                </Container>
            )}
        </>
    );
};

export default SingleDetailFilm;
