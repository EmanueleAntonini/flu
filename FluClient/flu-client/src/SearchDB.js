import React from 'react';

class SearchDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numdoc: "",
            documenti: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.name,this.state.surname,this.state.twitterUsername);
        const response = await fetch("http://localhost:8080/getAllInfluencers");
        const data = await response.json();
        this.setState({ numdoc: JSON.stringify(data.total_rows) });
        var list = [];
        for (var i=0; i < data.total_rows; ++i){
            list.push("Documento:" + i);
            list.push("Twitter id: ");
            list.push(data.rows[i].id);
            list.push("Identificativo documento: ");
            list.push(data.rows[i].value);
        }
        this.setState({ documenti: JSON.stringify(list) });
        console.log(data);
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <br />
                    <br />
                    <br />
                    <input type="submit" value="View flu_database" />
                </form>
                <p><h2>Documenti presenti in flu_database</h2></p>
                <p><label><h5> Numero documenti presenti in flu_database : {this.state.numdoc}</h5></label></p>
                <p><label><h5> Documenti: </h5></label></p>
                <p>{this.state.documenti}</p>
            </div>
        );
    }
}
export default SearchDB;