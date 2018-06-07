
import React, { Component } from 'react';

import SearchBar from 'react-native-searchbar';
import styles from "../style";




import Icon from 'react-native-vector-icons/MaterialIcons';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view'


import currentServerAddress from '../currentServerAddress'
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
    TouchableOpacity, AppState, Dimensions,
    Animated,
    LayoutAnimation,
} from 'react-native';











class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries:[],
            entriesToDelete:[],
            loading: true,
            refreshing: false,
            results: [],


        };
        this._handleResults = this._handleResults.bind(this);
    }

    state = {
        entries:[],
        loading: true,
        refreshing:false,
        entriesToDelete:[],
    };





    _handleResults(results) {
        this.setState({ results });
    }


    async fetchData() {
        try {

            const url = address+':8080/mobile/getAllLedgers';
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

    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    //All this is lifted straight from ViewEntries

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params ? params.paramName : 'A Nested Details Screen',
            //headerRight:  params.nothingToUndo ? "" : <Button style={styles.button} title={"Undo"} onPress={()=>params.handleThis()}/>,
            headerRight: params ? params.headerRight : undefined,
            tabBarLabel: 'Search',
            tabBarIcon: () => <Icon size={24} name="search" color="white" />,
        }
    };

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

    ifEntriesToDelete = () => {
        console.log("fi no entires to delete");
        console.log(this.state.entriesToDelete);

        console.log(this.state.entriesToDelete.length);
        //dunno why -1 but yolo, tried indexing from 0.
        if (this.state.entriesToDelete.length > -1){
            this.addHeaderRightButton();
        }
    };


    addHeaderRightButton = () => {
        console.log("remove header right button");
        this.props.navigation.setParams({
            headerRight: <Button style={styles.button} title={"Undo"} onPress={()=>this.refreshHandler()}/>,
        })
    };

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

    /*
        ifEntriesToDelete = () => {
            console.log("fi no entires to delete");
            console.log(this.state.entriesToDelete);

            console.log(this.state.entriesToDelete.length);
        //dunno why -1 but yolo, tried indexing from 0.
            if (this.state.entriesToDelete.length > -1){
                this.addHeaderRightButton();
        }
    };

        refreshHandler = () => {
            this.setState({
                entriesToDelete:[],
            });
            this._onRefresh();
        };


        componentWillUnmount() {
            //this.props.navigation.removeAllListeners();
            console.log("unmount");
            this._actuallyDeleteEntries();

        }

        _actuallyDeleteEntries(){
            if (!this.state.entriesToDelete.isEmpty){
                this.state.entriesToDelete.map(_=>this.deleteEntry(_));
                this.setState({entriesToDelete:[]});
            }
        }


        deleteEntry(entryID) {
            console.log("delete Entry");

            console.log(entryID);
            fetch(address+':8080/mobile/deleteEntry',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    EntryID: entryID
                })

            }).then((response) => console.log(response));
            //this._onRefresh()
        }

        closeRow(rowMap, rowKey) {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
            }
        }

        _handleDeleteRow(rowMap, rowKey) {
            console.log(rowKey);
            this.closeRow(rowMap,rowKey);
            const newData = [...this.state.entries];
            const prevIndex = this.state.entries.findIndex(item => item.EntryID === rowKey);
            this.setState({entriesToDelete: this.state.entriesToDelete.concat(rowKey)});
            newData.splice(prevIndex,1);
            this.setState({entries:newData});
            this.ifEntriesToDelete();

        }

        onRowDidOpen = (rowKey, rowMap) => {
            console.log('This row opened', rowKey);
            setTimeout(()=> {
                this.closeRow(rowMap,rowKey)
            },2000);
        };
        //All that was lifted from View Entries ends here
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////

*/



    totalAmountForCurrency(ent,curr){
        return ent.filter(x=>(x.Currency===curr)).map(_=>_.Amount).reduce((a,b)=>a+b,0)
    }
    totalPart(entries){
        const allCurrencies = entries.map(x=>x.Currency).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
        const currTuple = allCurrencies.map((curr)=> ({key:curr, totalForCurrency:this.totalAmountForCurrency(entries,curr)}))
        const red = 'rgb(184, 199, 211)';
        const blue = 'rgb(76,232,76)';
        return(
            <View style={{backgroundColor:red,height:currTuple.length*30}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1}}>
                            <FlatList
                                data={currTuple}
                                renderItem={({item}) =>
                                    <Text style={styles.bigtitle}>{new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: item.key,
                                    }).format(item.totalForCurrency)}
                                    </Text>}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.cornertitle}> TOTAL </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    render() {
        //const items = this.fetchData();
        /*
{
    this.state.results.map((result, i) => {
        return (
    <Text key={i}>
        {typeof result === 'object' && !(result instanceof Array) ? 'gold object!' : result.toString()}
    </Text>
);
})
}
*/

        return (
            <View>
                <View style={{ marginTop: 110 }}>
                    <TouchableOpacity onPress={() => this.searchBar.show()}>
                        <View style={{ backgroundColor: 'transparent', height: 50, marginTop: -110 }}/>
                    </TouchableOpacity>

                    <SwipeListView
                        useFlatList
                        disableRightSwipe={true}
                        data={this.state.results}
                        renderItem={ (data, rowMap) => (
                            <View>
                                <TouchableHighlight
                                    onPress={ _ => this.props.navigation.navigate('ViewEntryDetails',{paramName: data.item}) }
                                    style={styles.rowFront}
                                    underlayColor={'#CCC'}
                                >
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection: 'row',flex:1}}>
                                            <View style={{flex:1}}>
                                                <Text style={styles.bigtitle}>{data.item.AccountID} </Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text style={styles.cornertitle}> {new Date(data.item.Date).toLocaleDateString()} ></Text>
                                            </View>
                                        </View>
                                        <Text style={styles.subtitle}>{new Intl.NumberFormat('en-GB', {
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
                            <View style={styles.rowBack}>
                                <Text>Left</Text>
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this._handleDeleteRow(rowMap, data.item.EntryID) }>
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


                </View>
                {this.totalPart(this.state.results)}
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