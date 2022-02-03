import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            twitterUsername: "",
            user: null
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeTwitterUsername = this.onChangeTwitterUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeName = e => {
        this.setState({ name: e.target.value });
    };

    onChangeSurname = e => {
        this.setState({ surname: e.target.value });
    };

    onChangeTwitterUsername = e => {
        this.setState({ twitterUsername: e.target.value });
    };

    async handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.name, this.state.surname, this.state.twitterUsername);
        const response = await fetch("http://localhost:8080/influencer?name=" + this.state.name + "&surname=" + this.state.surname + "&twitter_username=" + this.state.twitterUsername);
        const data = await response.json();
        this.setState({ user: data });
        console.log(data);
        event.preventDefault()
    }

    render() {
        return (
            <div className="influencer_box">
                <form onSubmit={this.handleSubmit}>
                    <br />
                    <br />
                    <br />
                    <h2>Ricerca influencer</h2>
                    <br />
                    <label>
                        Inserisci il nome:
                    </label>
                    <input type="text" value={this.state.name} onChange={this.onChangeName} />
                    <br />
                    <label>
                        Inserisci il cognome:
                    </label>
                    <input type="text" value={this.state.surname} onChange={this.onChangeSurname} />
                    <br />
                    <label>
                        Inserisci lo username di Twitter:
                    </label>
                    <input type="text" value={this.state.twitterUsername} onChange={this.onChangeTwitterUsername} />
                    <br />
                    <input type="submit" value="Cerca" />
                </form>
                <br />
                <br />
                <br />
                <h2>Influencer: {this.state.user && this.state.user.twitterUsername} </h2>
                <br />
                <h5>Anagrafica:</h5>
                <p><label> Nome: </label> {this.state.user && this.state.user.name}</p>
                <p><label> Cognome: </label> {this.state.user && this.state.user.surname}</p>
                <p><label> Nome completo: </label> {this.state.user && this.state.user.fullName}</p>
                <p><label> Twitter Username: </label> {this.state.user && this.state.user.twitterUsername}</p>

                <h5>Parametri twitter: </h5>
                <p><label> Likes: </label> {this.state.user && this.state.user.twitterParams.like}</p>
                <p><label> Replies: </label> {this.state.user && this.state.user.twitterParams.reply}</p>
                <p><label> Retweets: </label> {this.state.user && this.state.user.twitterParams.retweet}</p>
                <p><label> Followers: </label> {this.state.user && this.state.user.twitterParams.followers}</p>

                <h5>Punteggi parziali</h5>
                <p><label> gNews Score: </label> {this.state.user && this.state.user.gNewsScore}</p>
                <p><label> twitter Score: </label> {this.state.user && this.state.user.twitterScore}</p>

                <h5>Indicatore flu</h5>
                <p><label> flu Score: </label> {this.state.user && this.state.user.fluScore}</p>

            </div>
        );
    }
}
export default SearchForm;