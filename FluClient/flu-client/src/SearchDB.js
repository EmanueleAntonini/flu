import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';


class SearchDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numdoc: "",
            documenti: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.name, this.state.surname, this.state.twitterUsername);
        const response = await fetch("http://localhost:8080/getAllInfluencers");
        const data = await response.json();
        this.setState({ numdoc: JSON.stringify(data.total_rows) });
        var list = [];
        for (var i = 0; i < data.total_rows; ++i) {
            list.push(data.rows[i].id);
        }
        this.setState({ documenti: list });
        console.log(data);
        event.preventDefault()
    }

    render() {

        return (
            <div className="influencer_box">
                <br />
                <br />
                <br />
                <h2>Documenti presenti in flu_database</h2>
                <h5> Numero documenti presenti in flu_database : {this.state.numdoc}</h5>
                <h5> Documenti: </h5>
                <BrowserRouter>
                    <div>
                        {this.state.documenti.map(id => {
                            return (<div>
                                <Link target="_blank" to={{ pathname: "/searchdoc/" + id }}>{id}</Link>
                                <br />
                                <br />
                            </div>)
                        }
                        )}
                    </div>
                </BrowserRouter>
                <br />
                <form onSubmit={this.handleSubmit}>

                    <input type="submit" value="View flu_database" />
                </form>
            </div>
        );
    }
}
export default SearchDB;