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

import CreateEntry from './Components/CreateEntry';
//import EditEntry from './Components/EditEntry';
//import DeleteEntry from './Components/DeleteEntry';
import ViewEntries from './Components/ViewEntries';
import ViewEntryDetails from './Components/ViewEntryDetails';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationComponent } from 'react-native-material-bottom-navigation'





import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

const RootStack = StackNavigator({
        Home: {screen: Home},
        CreateLedger: {screen: CreateLedger},
        //DeleteLedger: {screen: DeleteLedger},
        //ViewLedgers: {screen: ViewLedgers},

        CreateEntry: {screen: CreateEntry},
        //EditEntry: {screen: EditEntry},
        //DeleteEntry: {screen: DeleteEntry},
        ViewEntries: {screen: ViewEntries},
        ViewEntryDetails: {screen: ViewEntryDetails}
    },
    {
        initialRouteName: 'Home',
    }
);


const TabNav = TabNavigator(
    {
        Home: {screen: Home},
        //CreateLedger: {screen: CreateLedger},
        //DeleteLedger: {screen: DeleteLedger},
        //ViewLedgers: {screen: ViewLedgers},

        CreateEntry: {screen: CreateEntry},
        //EditEntry: {screen: EditEntry},
        //DeleteEntry: {screen: DeleteEntry},
        //ViewEntries: {screen: ViewEntries},
        //ViewEntryDetails: {screen: ViewEntryDetails}

    },
    {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                labelColor: 'white',
                backgroundColor: 'red',
                rippleColor: 'white',
                tabs: {
                    Home: {
                        barBackgroundColor: 'dimgrey',
                        label: 'Home',

                    },
                    ViewEntries: {
                        barBackgroundColor: 'dimgrey',
                        label: 'View Entries'
                    },
                    CreateEntry: {
                        barBackgroundColor: 'dimgrey',
                        label: 'Create Entry'
                    },

                }
            }
        }
    }
);





export default class App extends Component {
    render() {
        return <TabNav/>;
    }
}





