import React from 'react';

class SearchDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documento: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.name, this.state.surname, this.state.twitterUsername);
        const response = await fetch("http://localhost:8080/getInfluencer?id=" + this.state.twitterUsername);
        const data = await response.json();
        this.setState({ documento: JSON.stringify(data) });
        console.log(data);
        event.preventDefault()
    }

    render() {
        return (
            <div>

                <p><h2>Documento di: {this.state.twitterUsername} </h2></p>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="View document" />
                </form>
            </div>
        );
    }
}
export default SearchDoc;