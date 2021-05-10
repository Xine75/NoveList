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
                        <h4>UserName: {friendSearchResult.userName}</h4>
                    </Card.Title>
                    <h5 className="searchResult__name"><i>{friendSearchResult.firstName} {friendSearchResult.lastName}</i></h5>
                </Card.Body>
                <Button variant="primary" className="add_Friend" id="bootstrap" >
                    Add Friend</Button>


            </Card>
        </div>

    )



}