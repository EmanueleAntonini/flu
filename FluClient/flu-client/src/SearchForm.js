import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            twitterUsername: "",
            influencer: ""
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
        console.log(data);
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>
                        Ricerca un influencer:
                    </h2>
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
                <p>{this.state.influencer}</p>
            </div>
        );
    }
}
export default SearchForm;