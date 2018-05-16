
import React, { Component } from 'react';
import Blink from '../Blink';
import EntryCard from '../EntryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../style';
import TimeAgo from 'react-native-timeago'

import {SwipeableFlatList} from 'react-native-swipeable-flat-list';





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
    TouchableOpacity, AppState
} from 'react-native';





class ViewEntries extends Component {






    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.paramName : 'A Nested Details Screen',
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon size={24} name="home" color="white" />,

        }
    };

    constructor(props){
        super(props);
        this.state={
            refreshing:false,
        };
    }

    state = {
        entries: [],
        loading: true,
        refreshing:false,
        isSwiping:false,
    };

    async fetchData() {
        try {
            const ledgerName = this.props.navigation.state.params.paramName;
            const url = 'http://localhost:8080/mobile/ledgerList/'+ledgerName;
            console.log(url);
            let response = await fetch(url);
            let responseJson = await response.json();
            console.log(responseJson);
            this.setState({
                loading: false,
                entries: responseJson,
            });

        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount(){
        console.log("view entries");
        AppState.addEventListener('change',this._handleAppStateChange);
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('didFocus',payload);
                this._onRefresh();
            }
        );
        //this._onRefresh()
    }

    componentWillUnmount() {
        //this.props.navigation.removeAllListeners();
        console.log("unmount");
    }


    _onRefresh() {
        this.setState({refreshing:true});
        this.fetchData().then(()=> {
            this.setState({refreshing: false});
        });
    }

    handleDeleteEntry(item) {
        console.log("delete Entry");
        console.log(item.EntryID);
        fetch('http://localhost:8080/mobile/deleteEntry',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EntryID: item.EntryID
            })

            }).then((response) => console.log(response));
            //this._onRefresh()
    }





    render() {

        const rightButts= [<TouchableHighlight onPress={console.log("damnit carl")}>
                <Icon size={64} name="delete" color="red" />
            </TouchableHighlight>];


        return (
            <View style={styles.container}>
                <FlatList
                    scrollEnabled={!this.state.isSwiping}
                    data={this.state.entries}
                    renderItem={({item}) => {

                        return (

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("ViewEntryDetails", {paramName: item})}>
                                <View>
                                    <Card containerStyle={{padding: 0}}>

                                        <ListItem
                                            title={item.AccountName}
                                            subtitle={new Intl.NumberFormat('en-GB', {
                                                style: 'currency',
                                                currency: item.Currency.toString()
                                            }).format(Number(item.Amount))}
                                            badge={{
                                                value: new Date(item.Date).toLocaleTimeString(),
                                                textStyle: {color: 'white'},
                                                containerStyle: {marginTop: -20}
                                            }}
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




module.exports = ViewEntries;