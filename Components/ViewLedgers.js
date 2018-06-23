
import React, { Component } from 'react';
import Blink from '../Blink';
import EntryCard from '../EntryCard';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../styleSheets/General_style';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';

import { Card, ListItem, Button } from 'react-native-elements'

import { SwipeListView } from 'react-native-swipe-list-view'



import currentServerAddress from '../currentServerAddress'
const address= currentServerAddress.address();

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
    AppState,
    Dimensions,
    ScrollView
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
        ledgersToDelete: []
    };

    async fetchData() {
        try {
            let response = await fetch(address+':8080/mobile/ledgerList');
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
        console.log("view ledgers");
        AppState.addEventListener('change',this._handleAppStateChange);
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('didFocus on ledger page',payload);
                this._onRefresh();
            }
        );
        this.props.navigation.addListener(
            'didBlur',
            payload => {
                console.log('didBlur on ledger page',payload);
                this._actuallyDeleteLedgers();
            }
        );

        //this._onRefresh();
    }

    componentWillUnmount(){
        AppState.removeEventListener('change',this._handleAppStateChange);
        //this.props.navigation.removeAllListeners();
        console.log("unmount on ledger");
        this._actuallyDeleteLedgers();
    }


    _actuallyDeleteLedgers(){
        console.log("in actually delete ledgeres");
        if (!this.state.ledgersToDelete.isEmpty){
            this.state.ledgersToDelete.map(_=>this.handleDeleteLedger(_));
            this.setState({ledgersToDelete:[]});
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState == 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState})
    }


    handleDeleteLedger(Ledger){
        console.log("delete Ledger");
        console.log(Ledger);
        fetch('http://localhost:8080/mobile/deleteLedger',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Ledger: Ledger
            })

        }).then((response) => console.log(response));
        //this._onRefresh()
    }


    _onRefresh() {
        this.setState({refreshing:true});
        this.fetchData().then(()=> {
            this.setState({refreshing: false, loaded: true});
        });
    }


    closeRow (rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    deleteRow(rowMap, rowKey) {

        console.log(rowKey);
        this.closeRow(rowMap,rowKey);

        const newData = [...this.state.ledgers];
        const prevIndex = this.state.ledgers.findIndex(item => item.Ledger === rowKey);
        this.setState({ledgersToDelete: this.state.ledgersToDelete.concat(rowKey)});
        newData.splice(prevIndex,1);
        this.setState({ledgers:newData});
        this.handleDeleteLedger(rowKey);

    }

    onRowDidOpen = (rowKey, rowMap) => {
        console.log('This row opened', rowKey);
        setTimeout(()=> {
            this.closeRow(rowMap,rowKey)
        },2000);
    };




    render() {
        return (

            <SwipeListView
                    refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    />
                }


                useFlatList
                disableRightSwipe={true}
                data={this.state.ledgers}
                renderItem={ (data, rowMap) => (

                    <View>
                        <TouchableHighlight
                            onPress={()=>this.props.navigation.navigate("ViewEntries",{paramName: data.item.Ledger})}
                            style={styles.rowFront}
                            underlayColor={'#CCC'}
                        >
                            <View style={{flex:1}}>
                                <View style={{flexDirection: 'row',flex:1}}>
                                    <View style={{flex:1}}>
                                        <Text style={styles.bigtitle}>{data.item.Ledger} </Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={styles.cornertitle}> ></Text>
                                    </View>
                                </View>
                                <Text style={styles.subtitle}>
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <Divider style={{ backgroundColor: 'lightgrey', }} />
                    </View>
                )}
                //stupid piece of code to stop dumb warnings
                keyExtractor={() => Math.random().toString(36).substr(2, 9)}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text>Left</Text>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.deleteRow(rowMap, data.item.Ledger) }>
                            <View>
                                <Icon size={34} name="delete" color="white" />
                                <Text style={styles.backTextWhite}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-75}
                onRowDidOpen={this.onRowDidOpen}
                //stupid piece of code to stop dumb warnings
                keyExtractor={() => Math.random().toString(36).substr(2, 9)}
            />

        )
    }
}




module.exports = ViewLedgers;


