import React from 'react';

class SearchDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numdoc: "",
            influencer: "",
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
        this.setState({ influencer: JSON.stringify(data.rows) });
        for (var i=0; i < data.total_rows; ++i){
            this.setState({ documenti: JSON.stringify(data.rows[i]) });
        }

        console.log(data);
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>
                        Documenti presenti in flu_database
                    </h2>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <p><label> Numero documenti presenti in flu_database : </label>{this.state.numdoc}</p>
                <p><label> Documenti: </label>{this.state.influencer}</p>
                <p><label> Documento: </label>{this.state.documenti}</p>
            </div>
        );
    }
}
export default SearchDB;