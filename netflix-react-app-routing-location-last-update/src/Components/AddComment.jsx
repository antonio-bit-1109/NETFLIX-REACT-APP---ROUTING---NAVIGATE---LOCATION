import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Alert, Col, Container, Row } from "react-bootstrap";

const AddComment = () => {
    const navigate = useNavigate();

    const params = useParams();
    console.log(params);

    const [commentToSend, setCommentToSend] = useState({
        comment: "",
        rate: 1,
        elementId: params.imdbID,
    });

    const [commentSent, setCommentSent] = useState(false);

    const handleCommentChange = (event) => {
        setCommentToSend((prevState) => ({
            ...prevState,
            comment: event.target.value,
        }));
    };

    const handleRateChange = (event) => {
        setCommentToSend((prevState) => ({
            ...prevState,
            rate: event.target.value,
        }));
    };

    useEffect(() => {
        if (commentSent) {
            setInterval(() => {
                return setCommentSent(false);
            }, 3000);
        }
    }, [commentSent]);

    const FetchAGet = () => {
        const optionsComments = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDQ5MDEwMzksImV4cCI6MTcwNjExMDYzOX0.JgBLrx0gtEMbqKZEL4v4DHn-u2liDfnO58fki3MUC1Q",
            },
            body: JSON.stringify(commentToSend),
        };

        fetch(`https://striveschool-api.herokuapp.com/api/comments/`, optionsComments)
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
                    setCommentSent(true);
                    console.log("TUTTO APPOSTO ZIO!", response);
                }
            })

            .catch((err) => console.error(err));
    };

    const handleTheFetch = (event) => {
        event.preventDefault();
        FetchAGet();
    };

    return (
        <>
            <Container>
                <Row>
                    <Form onSubmit={handleTheFetch} className="mt-5">
                        <Col className="m-auto" sm={12} md={8} lg={6} xl={5}>
                            <Form.Label htmlFor="comment">commento</Form.Label>
                            <Form.Control
                                type="comment"
                                id="comment"
                                aria-describedby="commentToSend"
                                value={commentToSend.comment}
                                onChange={handleCommentChange}
                            />
                            <Form.Text id="comment" muted>
                                Inserisci il tuo commento...
                            </Form.Text>
                        </Col>
                        <Col className="m-auto" sm={12} md={8} lg={6} xl={5}>
                            <Form.Select
                                aria-label="Default select example"
                                aria-placeholder="inserisci la tua valutazione"
                                value={commentToSend.rate}
                                onChange={handleRateChange}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Col>
                        <Col className="m-auto" sm={12} md={8} lg={6} xl={5}>
                            <Form.Label htmlFor="comment">MovieID</Form.Label>
                            <Form.Control
                                readOnly
                                type="comment"
                                id="MovieID"
                                aria-describedby="commentToSend"
                                value={commentToSend.elementId}
                            />
                            <Form.Text id="comment" muted>
                                questo è l'ID del film...
                            </Form.Text>
                        </Col>
                        <div className="text-center mt-3">
                            <button type="submit"> Invia commento! </button>

                            {commentSent && (
                                <Alert variant="success" className="mt-5 w-50 m-auto">
                                    commento inviato con successo!
                                </Alert>
                            )}
                        </div>
                    </Form>
                </Row>
            </Container>
        </>
    );
};

export default AddComment;
