
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styleSheets/General_style';
import { FormLabel, FormInput, FormValidationMessage, Divider, ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view'
import * as Animatable from 'react-native-animatable';
//import RNShakeEvent from 'react-native-shake-event';
import helperFunctions from './HelperFunctions';
import CRUD from './CRUD';


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

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params ? params.paramName : 'A Nested Details Screen',
            headerRight: params ? params.headerRight : undefined,
            headerLeft: params ? params.headerLeft : undefined,
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon size={24} name="home" color="white" />,

        }
    };

    constructor(props){
        super(props);
        this.state={
            entries:[],
            refreshing:false,
            entriesToDelete:[],
        };
    }


    componentDidMount(){
        console.log("view entries");
        console.log(this.props.navigation.state.params.paramName);

        console.log(CRUD.getAccountIDsForLedger(this.props.navigation.state.params.paramName));
        this.props.navigation.setParams({
            nothingToUndo: this.ifEntriesToDelete(),
            headerRight: null,
            headerLeft: null,
        });

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('didFocus', payload);
                this._onRefresh();
            }
        );
    }



    ifEntriesToDelete = () => {
        console.log("if no entires to delete");
        console.log(this.state.entriesToDelete);
        //what the dick is this warning
        console.log(this.state.entriesToDelete.length);
        //dunno why -1 but yolo, tried indexing from 0.
        if (this.state.entriesToDelete.length > 0){
            this.addHeaderButtons();
        }
        else{
            this.removeHeaderButtons();
        }
    };

    addHeaderButtons = () => {
        console.log("add header right button");
        this.props.navigation.setParams({
            headerRight: <Button style={styles.button} title={"Confirm"} onPress={()=>this._clickConfirm()}/>,
            headerLeft: <Button style={styles.button} title={"Cancel"} onPress={()=>this._clickCancel()}/>,
        })
    };

    _clickCancel=() =>{
        this.setState({entriesToDelete: []},this._onRefresh());
    };

    _clickConfirm(){
        if (!this.state.entriesToDelete.isEmpty){
            this.state.entriesToDelete.map(_=>CRUD.deleteEntry(_));
            this.setState({entriesToDelete:[]},this._onRefresh());
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

    removeHeaderButtons = () => {
        console.log("remove right header");
        this.props.navigation.setParams({
            headerRight: undefined,
            headerLeft: undefined
        });
    };


    async fetchData() {
        const entries = await CRUD.getEntriesForLedger(this.props.navigation.state.params.paramName);
        this.setState({
            loading: false,
            entries: entries,
        });
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