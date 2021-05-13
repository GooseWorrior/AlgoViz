import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SortingAlgorithm } from "../Sorting/sortingAlgorithm";
import { GraphAlgorithm } from "../Graph/graphAlgorithm";
import { HomePage } from '../Home/homePage';
import { Workshop } from '../Workshop/workshop';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import './mainPage.css';

export default function MainPage() {
  return (
    <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">AlgoViz</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/sort">Sort</Nav.Link>
            <Nav.Link href="/graph">Graph</Nav.Link>
            <Nav.Link href='/workshop'>Workshop</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/sort">
            <SortingAlgorithm />
          </Route>
          <Route path="/graph">
            <GraphAlgorithm />
          </Route>
          <Route path='/workshop'>
            <Workshop />
          </Route>
        </Switch>
    </Router>
  );
}