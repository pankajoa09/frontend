/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Home from './Components/Home';
import ViewLedgers from './Components/ViewLedgers';
import CreateEntry from './Components/CreateEntry';
import EditEntryDetails from './Components/EditEntryDetails';
//import DeleteEntry from './Components/DeleteEntry';
import Search from './Components/Search';
import ViewEntries from './Components/ViewEntries';
import ViewEntryDetails from './Components/ViewEntryDetails';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Example from './Components/Example2';
//import Example2 from './Components/Example';
//import Example2 from './Components/PieChartMultipleView';







import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';




const HomeStack = StackNavigator({

        ViewLedgers: {screen: ViewLedgers},
        ViewEntries: {screen: ViewEntries},
        ViewEntryDetails: {screen: ViewEntryDetails},
        EditEntryDetails: {screen: EditEntryDetails},
    },
    {
        initialRouteName: 'ViewLedgers',
    }
);

const CreateEntryStack = StackNavigator({
    CreateEntry: {screen: CreateEntry}
});

const ExampleStack = StackNavigator({
    Example: {screen: Example},
    CreateEntry: {screen: CreateEntry}
})




const TabNav = TabNavigator(
    {
        Home: {screen: HomeStack},
        CreateEntry: {screen: CreateEntryStack},
        Search: {screen: Search},
        Example: {screen: ExampleStack}
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





