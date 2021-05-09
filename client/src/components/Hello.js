import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BookContext } from "./Providers/BookProvider"
import { BookDetail } from "./Book/BookDetail"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"


export const Hello = () => {
    const { getAllBooks } = useContext(BookContext);
    const [books, setBooks] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).firstName;


    //-------------Find correct bookd using udrt Id  -------------
    useEffect(() => {
        getAllBooks()
    }, [])



    return (
        <>
            <Card bg={"Dark"}>
                <span className="landing_page" style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    marginTop: "-0.5rem",
                    textAlign: "center",
                }}

                ><div className="landing_page_text"><h3>Hello {currentUser}!</h3>
                    </div></span>

            </Card>
        </>
    );
}
export default Hello;