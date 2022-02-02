import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import SearchForm from './SearchForm';
import SearchDB from './SearchDB';
import SearchDoc from './SearchDoc';
import Home from './Home';
import Error from './Error';
import Navigation from './Navigation';

class App extends Component {

  render() {
    return (
      <BrowserRouter>

        <Navigation />
        <Container fluid="true">
          <Row>
            <Col>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/searchform" component={SearchForm} />
                <Route path="/searchdb" component={SearchDB} />
                <Route path="/searchdoc/:twitterid" children={<SearchDoc />} />
                <Route component={Error} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
