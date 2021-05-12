import React, { useContext, useEffect } from "react"
import { BookContext } from "./Providers/BookProvider"
import Card from "react-bootstrap/Card"



export const Hello = () => {
    const { getAllBooks } = useContext(BookContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).firstName;


    //-------------Find correct bookd using udrt Id  -------------
    useEffect(() => {
        getAllBooks()
    }, [])



    return (
        <>
            <Card>
                <span className="landing_page" style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    marginTop: "-0.5rem",
                    marginLeft: "2rem",
                    textAlign: "center",
                }}

                >
                    <div className="landing_page_text"><h3>Hello {currentUser}!</h3>
                    </div>
                </span>

            </Card>
        </>
    );
}
export default Hello;