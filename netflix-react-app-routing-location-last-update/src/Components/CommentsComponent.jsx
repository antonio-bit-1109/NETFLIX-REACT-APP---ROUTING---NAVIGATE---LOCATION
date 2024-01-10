import React from "react";
import { Button, Col, ListGroup } from "react-bootstrap";

const CommentsComponent = (props) => {
    const { comments } = props;
    /* SCRIVI LA FETCH PER FARE UNA DELETE  */

    return (
        <div>
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
                                <Button type="submit" variant="danger">
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
