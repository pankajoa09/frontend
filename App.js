/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Button from './Button';
import Blink from './Blink';
import Home from './Components/Home';

import CreateLedger from './Components/CreateLedger';
//import DeleteLedger from './Components/DeleteLedger';
//import ViewLedgers from './Components/ViewLedgers';

//import CreateEntry from './Components/CreateEntry';
//import EditEntry from './Components/EditEntry';
//import DeleteEntry from './Components/DeleteEntry';
import ViewEntries from './Components/ViewEntries';



import {
    StackNavigator,
} from 'react-navigation';




const RootStack = StackNavigator({
    Home: {screen: Home},
    CreateLedger: {screen: CreateLedger},
    //DeleteLedger: {screen: DeleteLedger},
    //ViewLedgers: {screen: ViewLedgers},

    //CreateEntry: {screen: CreateEntry},
    //EditEntry: {screen: EditEntry},
    //DeleteEntry: {screen: DeleteEntry},
    ViewEntries: {screen: ViewEntries},
},
    {
        initialRouteName: 'Home',
    }
);

export default class App extends Component {
    render() {
        return <RootStack />;
    }
}





