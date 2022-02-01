import React from 'react';

class SearchDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            twitterUsername: "",
            documento: "",
        };
        this.onChangeTwitterUsername = this.onChangeTwitterUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeTwitterUsername = e => {
        this.setState({ twitterUsername: e.target.value });
    };

    async handleSubmit(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:8080/getInfluencer?id=" + this.state.twitterUsername);
        const data = await response.json();
        this.setState({ documento: JSON.stringify(data) });
        console.log(data);
        event.preventDefault()
    }


    render() {
        return (
            <div>
                <label>
                        Inserisci lo username di Twitter:
                    </label>
                    <input type="text" value={this.state.twitterUsername} onChange={this.onChangeTwitterUsername} />
                    <br />
                <p><h2>Documento di: {this.state.twitterUsername} </h2></p>
                <br />
                <p> {this.state.documento} </p>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="View document" />
                </form>
            </div>
        );
    }
}
export default SearchDoc;