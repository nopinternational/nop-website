import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Firebase, { FirebaseContext } from '../Firebase';
import AppRoutes from '../../views/Components/AppRoutes'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    render() {
        return (
            <FirebaseContext.Provider value={new Firebase()}>
                <AppRoutes authUser={this.state.authUser}/>
            </FirebaseContext.Provider>
        );
    }
}

export default App;