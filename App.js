/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Home from './Components/Home';
import ViewLedgers from './Components/ViewLedgers';
import CreateEntry from './Components/CreateEntry';
//import EditEntry from './Components/EditEntry';
//import DeleteEntry from './Components/DeleteEntry';

import Search from './Components/Search';

import ViewEntries from './Components/ViewEntries';
import ViewEntryDetails from './Components/ViewEntryDetails';
//import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationComponent } from 'react-native-material-bottom-navigation'

import Example from './Components/Example';





import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';




const HomeStack = StackNavigator({
        //CreateEntry: {screen: CreateEntry},
        ViewLedgers: {screen: ViewLedgers},
        ViewEntries: {screen: ViewEntries},
        ViewEntryDetails: {screen: ViewEntryDetails},
    },
    {
        initialRouteName: 'ViewLedgers',
    }
);




const TabNav = TabNavigator(
    {
        Home: {screen: HomeStack},
        CreateEntry: {screen: CreateEntry},
        Search: {screen: Search},
        Example: {screen: Example}
    },
    {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                labelColor: 'white',
                backgroundColor: 'dimgrey',
                rippleColor: 'white',
                tabs: {
                    Home: {
                        barBackgroundColor: 'dimgrey',
                        label: 'Home',

                    },
                    CreateEntry: {
                        barBackgroundColor: 'dimgrey',
                        label: 'Create Entry'
                    },
                    Search: {
                        barBackgroundColor: 'dimgrey',
                        label: 'Search'
                    }

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





