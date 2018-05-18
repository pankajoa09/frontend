
import React, { Component } from 'react';
import Blink from '../Blink';
import EntryCard from '../EntryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import styles from '../style';
import TimeAgo from 'react-native-timeago'
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';


import { SwipeListView } from 'react-native-swipe-list-view'






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
    TouchableOpacity, AppState, Dimensions
} from 'react-native';





class ViewEntries extends Component {






    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.paramName : 'A Nested Details Screen',
            _renderButton: () => <Button
                onPress={() => console.log("HIIIIE")}
            />,
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon size={24} name="home" color="white" />,


        }
    };



    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2})
        this.state={
            entries:[],
            refreshing:false, //do i need this? delete when can
            entriesToDelete:[],
        };
    }

    state = {
        entries: [],
        loading: true,
        refreshing:false,
        entriesToDelete: [],
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
        this._actuallyDeleteEntries();
    }

    _actuallyDeleteEntries(){
        if (!this.state.entriesToDelete.isEmpty){
            this.state.entriesToDelete.map(_=>this.handleDeleteEntry(_));
            this.setState({entriesToDelete:[]});
        }
    }


    _onRefresh() {
        this.setState({refreshing:true});
        this.fetchData().then(()=> {
            this.setState({refreshing: false});
        });
    }

    handleDeleteEntry(entryID) {
        console.log("delete Entry");

        console.log(entryID);
        fetch('http://localhost:8080/mobile/deleteEntry',{
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

    closeRow (rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    deleteRow(rowMap, rowKey) {
        console.log(rowKey);
        this.closeRow(rowMap,rowKey)
        const newData = [...this.state.entries]
        const prevIndex = this.state.entries.findIndex(item => item.EntryID === rowKey);
        this.setState({entriesToDelete: this.state.entriesToDelete.concat(rowKey)});
        newData.splice(prevIndex,1)
        this.setState({entries:newData})

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
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.deleteRow(rowMap, data.item.EntryID) }>
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


const styles = StyleSheet.create({
    bigtitle: {

        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'System',
        margin: 1,
        paddingTop: 2.5,
        paddingLeft: 20,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '100',
        fontFamily: 'System',
        margin: 1,
        paddingTop: 2.5,
        paddingLeft: 20,
    },

    cornertitle: {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: '100',
        fontFamily: 'System',
        color: 'grey',
        margin: 1,
        paddingTop: 2.5,
        paddingRight: 10,
        marginRight:10,

    },
    container: {
        backgroundColor: 'white',
        flex: 1,

    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: 'white',
        fontSize: 12,
        fontWeight: '200',
        fontFamily: 'System',
    },
    rowFront: {
        //flex:1,
        //alignItems: 'flex-start',
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'rgb(128, 0, 0)',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: '‎rgb(128, 0, 0)',

        right: 0
    },
    backRightBtnRight: {
        backgroundColor: '‎rgb(128, 0, 0)',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    }
});


module.exports = ViewEntries;