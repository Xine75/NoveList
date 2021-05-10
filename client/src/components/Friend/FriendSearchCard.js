import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { FriendContext } from "../Providers/FriendProvider"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

//FriendSearch Card renders list view of friend search results
//Renders an ADD button to add Friend

export const FriendSearchCard = ({ friendSearchResult }) => {

    //--------------------JSX for FriendSearchCard----------------------

    return (
        <div className="searchResult__card__container">

            <Card style={{ width: '18rem' }} className="searchResult_card" border="no border">
                <Card.Body>

                    <Card.Title className="">
                        <Button variant="link" className="friendSearchResult_userName" id="bootstrap" >
                            {friendSearchResult.userName}</Button>
                    </Card.Title>
                    <h5 className="searchResult__name">{friendSearchResult.firstName} {friendSearchResult.lastName}</h5>
                </Card.Body>

            </Card>
        </div>

    )



}