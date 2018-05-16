
import React, { Component } from 'react';
import Blink from '../Blink';
import EntryCard from '../EntryCard';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../style';


import { Card, ListItem, Button } from 'react-native-elements'



import {
    AppRegistry,
    FlatList,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ListView,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    RefreshControl,
    AppState
} from 'react-native';




class ViewLedgers extends Component {

    static navigationOptions = {
        title: 'Ledgers',
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon size={24} name="home" color="white" />
    };





    state = {
        ledgers: [],
        loading: true,
        refreshing: false,
        loaded: false,
        appState: AppState.currentState,
    };

    async fetchData() {
        try {
            let response = await fetch('http://localhost:8080/mobile/ledgerList');
            let responseJson = await response.json();
            console.log(responseJson);
            this.setState({
                loading: false,
                ledgers: responseJson,
            });

        } catch (error) {
            console.error(error);
        }
    }



    componentDidMount(){
        console.log("view ledgers");0
        AppState.addEventListener('change',this._handleAppStateChange);
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('didFocus',payload);
                this._onRefresh();
            }
        );
        //this._onRefresh();
    }

    componentWillUnmount(){
        AppState.removeEventListener('change',this._handleAppStateChange);
        //this.props.navigation.removeAllListeners();
        console.log("unmount");
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState == 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState})
    }



    _onRefresh() {
        this.setState({refreshing:true});
        this.fetchData().then(()=> {
            this.setState({refreshing: false, loaded: true});
        });
    }




    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (


            <View style={styles.container}>
                <FlatList

                    data={this.state.ledgers}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity  onPress={()=>this.props.navigation.navigate("ViewEntries",{paramName: item.LedgerName})}>
                                <View>
                                    <Card containerStyle={{padding: 0}}>
                                        <ListItem
                                            title={item.LedgerName}
                                        />
                                    </Card>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    //stupid piece of code to stop dumb warnings
                    keyExtractor={() => Math.random().toString(36).substr(2, 9)}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                />

            </View>

        )
    }
}




module.exports = ViewLedgers;