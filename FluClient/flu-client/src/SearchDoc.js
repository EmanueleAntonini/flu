import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom'



function SearchDoc() {
    const [user, setUser] = useState(null);
    const { twitterid } = useParams();
    useEffect(() => {
        async function retrieveUser() {

            const response = await fetch("http://localhost:8080/getInfluencer?id=" + twitterid);
            const data = await response.json();
            setUser(data);
        }

        retrieveUser();
    }, []);

    console.log(user);
    return (
        <div className="influencer_box">
            <br />
            <br />
            <br />
            <h2>Influencer: {twitterid} </h2>
            <br />
            <h5>Anagrafica:</h5>
            <p><label> Nome: </label> {user && user.name}</p>
            <p><label> Cognome: </label> {user && user.surname}</p>
            <p><label> Nome completo: </label> {user && user.fullName}</p>
            <p><label> Twitter username: </label> {user && user.twitterUsername}</p>

            <h5>Parametri twitter: </h5>
            <p><label> Likes: </label> {user && user.twitterParams.like}</p>
            <p><label> Replies: </label> {user && user.twitterParams.reply}</p>
            <p><label> Retweets: </label> {user && user.twitterParams.retweet}</p>
            <p><label> Followers: </label> {user && user.twitterParams.followers}</p>

            <h5>Punteggi parziali</h5>
            <p><label> gNews Score: </label> {user && user.gNewsScore}</p>
            <p><label> twitter Score: </label> {user && user.twitterScore}</p>

            <h5>Indicatore flu</h5>
            <p><label> flu Score: </label> {user && user.fluScore}</p>
        </div>
    );
}

export default withRouter(SearchDoc);

