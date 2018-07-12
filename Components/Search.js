
import React, { Component } from 'react';

import SearchBar from 'react-native-searchbar';
import general from "../styleSheets/General_style";
import entry_details from "../styleSheets/EntryDetails_style";
import pie_chart from "../styleSheets/PieChart_style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view'
import currentServerAddress from '../currentServerAddress'
import helperFunctions from './HelperFunctions'

const address= currentServerAddress.address();



import {
    AppRegistry,
    FlatList,
    StyleSheet,
    Button,
    Text,
    View,
    ActivityIndicator,
    ListView,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    AppState,
    Dimensions,
    Animated,
    LayoutAnimation,
    ScrollView
} from 'react-native';

import PieChartMultipleView from './PieChartMultipleView';
import CRUD from "./CRUD";











class Search extends Component {




    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params ? params.paramName : 'A Nested Details Screen',
            headerRight: params ? params.headerRight : undefined,
            headerLeft: params ? params.headerLeft : undefined,
            tabBarLabel: 'Search',
            tabBarIcon: () => <Icon size={24} name="search" color="white" />,

        }
    };



    constructor(props) {
        super(props);
        this.state = {
            entries:[],
            entriesToDelete:[],
            loading: true,
            refreshing: false,
            results: [],
            listType: 'Ledger'
        };
        this._handleResults = this._handleResults.bind(this);
    }







    _handleResults(results) {
        this.setState({ results });

    }


    async fetchData() {
        const entries = await CRUD.getAllEntries();
        this.setState({
            loading: false,
            entries: entries,
        });
    }

    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    //All this is lifted straight from ViewEntries



    componentDidMount(){

        console.log("view entries");


        /*
        // This is for deleting entries within search, might not implement
        this.props.navigation.setParams({
            handleThis: this.refreshHandler,
            nothingToUndo: this.ifEntriesToDelete(),
            headerRight: null,
        });
        */

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('didFocus', payload);
                this._onRefresh();
            }
        );

        this.searchBar._clearInput();

    }


    _onRefresh() {
        console.log("refreshed");
        this.setState({refreshing:true});
        this.fetchData().then(()=> {
            var ent = this.state.entries;
            this.setState({
                refreshing: false,
                item: ent
            });
        });
    }


    pieChartPart(entries){
        return(<PieChartMultipleView entries = {this.state.results}/>)
    }

    listPart(entries){
        console.log(this.state.results);
        console.log(entries);
        return(
        <SwipeListView
            useFlatList
            disableRightSwipe={true}
            data={entries}
            renderItem={ (data, rowMap) => (
                <View>
                    <TouchableHighlight
                        onPress={ _ => this.props.navigation.navigate('ViewEntryDetails',{paramName: data.item}) }
                        style={general.rowFront}
                        underlayColor={'#CCC'}
                    >
                        <View style={{flex:1}}>
                            <View style={{flexDirection: 'row',flex:1}}>
                                <View style={{flex:1}}>
                                    <Text style={general.bigtitle}>{data.item.AccountID} </Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={general.cornertitle}> {new Date(data.item.Date).toLocaleDateString()} ></Text>
                                </View>
                            </View>
                            <Text style={general.subtitle}>{new Intl.NumberFormat('en-GB', {
                                style: 'currency',
                                currency: data.item.Currency.toString()
                            }).format(Number(data.item.Amount))}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <Divider style={{ backgroundColor: 'lightgrey', }} />
                </View>
            )}
            //stupid piece of code to stop dumb warnings
            keyExtractor={() => Math.random().toString(36).substr(2, 9)}
            renderHiddenItem={ (data, rowMap) => (
                <View style={general.rowBack}>
                    <Text>Left</Text>
                    <TouchableOpacity style={[general.backRightBtn, general.backRightBtnLeft]} onPress={_ => this._handleDeleteRow(rowMap, data.item.EntryID) }>
                        <View>
                            <Icon size={34} name="delete" color="white" />
                            <Text style={general.backTextWhite}>Delete</Text>
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



    totalPart(entries){
        const currTuple = helperFunctions.getUniqueAndTally(entries,"Currency");
        const sumZero = currTuple.map(_=>_.value).reduce((a,b)=>a+b,0)===0;
        const red = 'rgb(255, 204, 204)';
        const blue = 'rgb(200, 221, 247)';
        const chosenColor =(sumZero ? blue : red); //if tallied blue else red
        return(
            <View style={{backgroundColor:blue,height:currTuple.length*30}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1}}>
                            <FlatList
                                data={currTuple}
                                renderItem={({item}) =>
                                    <Text style={general.bigtitle}>{new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: item.key,
                                    }).format(item.value)}
                                    </Text>}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={general.cornertitle}> {sumZero}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    render() {

        return (
            <View>

                <View style={{ marginTop: 110 }}>
                    <TouchableOpacity onPress={() => this.searchBar.show()}>
                        <View style={{ backgroundColor: 'transparent', height: 50, marginTop: -110 }}/>
                    </TouchableOpacity>
                    {this.listPart(this.state.results)}

                </View>



                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={this.state.entries}
                    handleResults={this._handleResults}
                    showOnLoad
                    clearOnShow
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    backButton={undefined}
                    allDataOnEmptySearch={true}

                />




            </View>

        );
    }
}

module.exports = Search;