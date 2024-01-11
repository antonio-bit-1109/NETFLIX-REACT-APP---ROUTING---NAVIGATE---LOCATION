import React, { useEffect, useState } from "react";
import { Button, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CommentsComponent = (props) => {
    const navigate = useNavigate();

    const { comments, commentDeleted, setCommentDeleted } = props;
    console.log("comments", comments);

    const [elementIDFilm, setElementIDFilm] = useState(null);

    /* SCRIVI LA FETCH PER FARE UNA DELETE  */

    useEffect(() => {
        if (elementIDFilm) {
            setTimeout(() => {
                navigate(`/singoloFilm/${elementIDFilm}`); /* elementiddel singolo film  */
            }, 1000);
        }
    }, [commentDeleted, elementIDFilm]);

    const fetchDelete = (value) => {
        const optionsComments = {
            method: "DELETE",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDQ5MDEwMzksImV4cCI6MTcwNjExMDYzOX0.JgBLrx0gtEMbqKZEL4v4DHn-u2liDfnO58fki3MUC1Q",
            },
            "Content-Type": "application/json",
        };

        const UrlToGetComments = `https://striveschool-api.herokuapp.com/api/comments/${value}`;

        fetch(UrlToGetComments, optionsComments)
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
            })

            .catch((err) => console.error(err));
    };

    return (
        <div>
            <Col>
                {" "}
                <ListGroup>
                    {comments.length > 0 ? <h3>Lista dei commenti: </h3> : null}
                    {comments.slice(0, 5).map((comment, index) => (
                        <>
                            <div key={`comm-${index}`} className=" border border-primary my-3">
                                {" "}
                                <ListGroup.Item>{comment.author}</ListGroup.Item>
                                <ListGroup.Item>{comment.comment}</ListGroup.Item>
                                <ListGroup.Item>✨ {comment.rate}</ListGroup.Item>
                                <ListGroup.Item>{comment._id}</ListGroup.Item>
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        fetchDelete(comment._id);
                                        setCommentDeleted(!commentDeleted);
                                        setElementIDFilm(comment.elementId);
                                    }}
                                    type="button"
                                    variant="danger"
                                >
                                    Cancella Commento{" "}
                                </Button>
                            </div>
                        </>
                    ))}
                </ListGroup>
            </Col>
        </div>
    );
};

export default CommentsComponent;
