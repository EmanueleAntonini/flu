import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            twitterUsername: "",
            nome: "",
            cognome: "",
            nomeCompleto: "",
            nomeTwitter: "",
            twitterParams: "",
            gNewsScore: "",
            twitterScore: "",
            fluScore: "",
            influencer: "",
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
        console.log(this.state.name,this.state.surname,this.state.twitterUsername);
        const response = await fetch("http://localhost:8080/influencer?name=" + this.state.name + "&surname=" + this.state.surname + "&twitter_username=" + this.state.twitterUsername);
        const data = await response.json();
        this.setState({ influencer: JSON.stringify(data) });
        this.setState({ nome: JSON.stringify(data.name) });
        this.setState({ cognome: JSON.stringify(data.surname) });
        this.setState({ nomeCompleto: JSON.stringify(data.fullName) });
        this.setState({ nomeTwitter: JSON.stringify(data.twitterUsername) });
        this.setState({ twitterParams: JSON.stringify(data.twitterParams) });
        this.setState({ gNewsScore: JSON.stringify(data.gNewsScore) });
        this.setState({ twitterScore: JSON.stringify(data.twitterScore) });
        this.setState({ fluScore: JSON.stringify(data.fluScore) });
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
                    <input type="submit" value="Submit" />
                </form>
                <h2>Influencer Page</h2>
                <p><label> Nome: </label>{this.state.nome}</p>
                <p><label> Cognome: </label>{this.state.cognome}</p>
                <p><label> Nome completo: </label>{this.state.nomeCompleto}</p>
                <p><label> Twitter username: </label>{this.state.nomeTwitter}</p>
                <p><label> Valori parametri twitter: </label>{this.state.twitterParams}</p>
                <p><label> gNews Score: </label>{this.state.gNewsScore}</p>
                <p><label> twitter Score: </label>{this.state.twitterScore}</p>
                <p><label> flu Score: </label>{this.state.fluScore}</p>
            </div>
        );
    }
}
export default SearchForm;