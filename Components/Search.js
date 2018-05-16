
import React, { Component } from 'react';
import Blink from '../Blink';
import EntryCard from '../EntryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    TouchableOpacity
} from 'react-native';

import SearchBar from 'react-native-search-bar'





class Search extends Component {



    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.paramName : 'A Nested Details Screen',
            tabBarLabel: 'Search',
            tabBarIcon: () => <Icon size={24} name="search" color="white" />,


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
        query: "",
    };

    async fetchData() {
        try {
            //const ledgerName = this.props.navigation.state.params.paramName;
            const url = 'http://localhost:8080/mobile/ledgerList/test1.data';
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
        this._onRefresh()
    }


    _onRefresh() {
        this.setState({refreshing:true});
        this.fetchData().then(()=> {
            this.setState({refreshing: false});
        });
    }


    handleChangedText(){

    }



    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    ref='search'
                    placeholder='Search'
                    onChangeText={this.handleChangedText}
                />
                <FlatList
                    data={this.state.entries}
                    renderItem={({item}) => {

                        return (
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("ViewEntryDetails",{paramName:item})}>
                                <View>
                                    <Card containerStyle={{padding: 0}} >

                                        <ListItem
                                            title={item.AccountName}
                                            subtitle={new Intl.NumberFormat('en-GB', {
                                                style: 'currency',
                                                currency: item.Currency.toString()
                                            }).format(Number(item.Amount))}
                                            badge = {{value: item.Comment, textStyle: {color: 'white'}, containerStyle: {marginTop: -20}}}
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
        );
    }
}




module.exports = Search;