import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NothingFoundHere = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }, []);
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
            <Row>
                <Col>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h3 className="display-3">Ops, qui non c'è nulla!</h3>
                        <Link to={"/"} className="btn btn-primary">
                            Torna in HomePage{" "}
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default NothingFoundHere;
