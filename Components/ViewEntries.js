
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styleSheets/General_style';
import { FormLabel, FormInput, FormValidationMessage, Divider, ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view'
import * as Animatable from 'react-native-animatable';
//import RNShakeEvent from 'react-native-shake-event';
import helperFunctions from './HelperFunctions';


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
    RefreshControl
} from 'react-native';





class ViewEntries extends Component {

    constructor(props){
        super(props);
        this.state={
            entries:[],
            refreshing:false,
            entriesToDelete:[],
        };
    }

    state = {
        entries: [],
        loading: true,
        refreshing:false,
        entriesToDelete: [],
    };





    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params ? params.paramName : 'A Nested Details Screen',
            //headerRight:  params.nothingToUndo ? "" : <Button style={entry_details.button} title={"Undo"} onPress={()=>params.handleThis()}/>,
            headerRight: params ? params.headerRight : undefined,
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon size={24} name="home" color="white" />,

        }
    };

    componentDidMount(){
        console.log("view entries");
        console.log(this.props.navigation.state.params.paramName);

        this.props.navigation.setParams({
            handleThis: this.refreshHandler,
            nothingToUndo: this.ifEntriesToDelete(),
            headerRight: null,
        });

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('didFocus', payload);
                this._onRefresh();
            }
        );
    }

    refreshHandler = () => {
        this.setState({
            entriesToDelete:[],
        });
        this._onRefresh();

    };

    ifEntriesToDelete = () => {
        console.log("if no entires to delete");
        console.log(this.state.entriesToDelete);
        //what the dick is this warning
        console.log(this.state.entriesToDelete.length);
        //dunno why -1 but yolo, tried indexing from 0.
        if (this.state.entriesToDelete.length > 0){
            this.addHeaderRightButton();
        }
        else{
            this.removeHeaderRightButton();
        }
    };

    addHeaderRightButton = () => {
        console.log("add header right button");
        this.props.navigation.setParams({
            headerRight: <Button style={styles.button} title={"Confirm"} onPress={()=>this._actuallyDeleteEntries()}/>,
        })
    };

    removeHeaderRightButton = () => {
        console.log("remove right header");
        this.props.navigation.setParams({
            headerRight: undefined
        });
    };


    async fetchData() {
        try {
            const Ledger = this.props.navigation.state.params.paramName;
            const url = address+':8080/mobile/ledgerList/'+Ledger;
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



    componentWillMount() {
        //RNShakeEvent.addEventListener('shake',() => {
//            console.log("Device Shook: Undo Delete");
//            this.refreshHandler();
//        })
    }

    componentWillUnmount() {
        //this.props.navigation.removeAllListeners();
        console.log("unmount");
        this._actuallyDeleteEntries();
        //RNShakeEvent.removeEventListener('shake');

    }

    _actuallyDeleteEntries(){
        if (!this.state.entriesToDelete.isEmpty){
            this.state.entriesToDelete.map(_=>this.deleteEntry(_));
            this.setState({entriesToDelete:[]});
        }
    }


    _onRefresh() {
        this.setState({refreshing:true});
        this.fetchData().then(()=> {
            this.setState({
                refreshing: false,
            });
            this.ifEntriesToDelete();
        });

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
        this.setState({entriesToDelete: this.state.entriesToDelete.concat(rowKey)},
            () => {
                newData.splice(prevIndex,1);
                this.setState({entries:newData});
                this.ifEntriesToDelete();
            });


    }

    onRowDidOpen = (rowKey, rowMap) => {
        console.log('This row opened', rowKey);
        setTimeout(()=> {
            this.closeRow(rowMap,rowKey)
        },2000);
    };



    totalAmountForCurrency(ent,curr){
        return ent.filter(x=>(x.Currency===curr)).map(_=>_.Amount).reduce((a,b)=>a+b,0)
    }

    totalPart(entries){


        const currTuple = helperFunctions.getUniqueAndTally(entries,'Currency');
        const sumZero = currTuple.map(_=>_.value).reduce((a,b)=>a+b,0)===0;
        const red = 'rgb(255, 204, 204)';
        const blue = 'rgb(200, 221, 247)';
        const chosenColor =(sumZero ? blue : red); //if tallied blue else red
        const comment = (sumZero ? "" : "TO BALANCE");
        return(
            <View style={{backgroundColor:chosenColor,height:currTuple.length*30}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1}}>
                            <FlatList
                                data={currTuple}
                                renderItem={({item}) =>
                                    <Text style={styles.bigtitle}>{new Intl.NumberFormat('en-GB', {
                                    style: 'currency',
                                    currency: item.key,
                                }).format(item.value)}
                                </Text>}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.cornertitle}> {comment} </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }




    render() {

        return (
            <View>
            <SwipeListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }

                useFlatList
                disableRightSwipe={true}
                data={this.state.entries}
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
                                        <Text style={styles.bigtitle}>{data.item.AccountName} </Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={styles.cornertitle}> {new Date(data.item.Date).toLocaleTimeString()} ></Text>
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


                {this.totalPart(this.state.entries)}






            </View>

        )
    }




}





module.exports = ViewEntries;