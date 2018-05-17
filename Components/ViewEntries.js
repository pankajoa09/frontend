
import React, { Component } from 'react';
import Blink from '../Blink';
import EntryCard from '../EntryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import styles from '../style';
import TimeAgo from 'react-native-timeago'


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
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon size={24} name="home" color="white" />,

        }
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2})
        this.state={
            refreshing:false, //do i need this? delete when can
        };
    }

    state = {
        entries: [],
        loading: true,
        refreshing:false,
        listViewData: Array(20).fill('').map((_,i) => ({key: `${i}`, text: `item #${i}`})),
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

    closeRow (rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    deleteRow(rowMap, rowKey) {
        this.closeRow(rowMap,rowKey)
        const newData = [...this.state.entries]
        const prevIndex = this.state.entries.findIndex(item => item.key === rowKey);
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

        const rightButts= [<TouchableHighlight onPress={console.log("damnit carl")}>
                <Icon size={64} name="delete" color="red" />

            </TouchableHighlight>];


        return (
            /*
            <View style={styles.container}>


                <FlatList

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
            */
/*
            <SwipeListView
                useFlatList
                disableRightSwipe={true}
                data={this.state.listViewData}
                renderItem={ (data, rowMap) => (
                    <View>

                        <TouchableHighlight
                            onPress={ _ => console.log('You touched me') }
                            style={styles.rowFront}
                            underlayColor={'#CCC'}
                        >
                            <View style={{flex:1}}>
                                <View style={{flexDirection: 'row',flex:1}}>
                                    <View style={{flex:1}}>
                                        <Text style={styles.bigtitle}>{data.item.text} </Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={styles.cornertitle}> 10/24/17 ></Text>
                                    </View>
                                </View>
                                <Text style={styles.subtitle}>I am not you tho niggaaaa ggggggggggggggg</Text>
                            </View>
                        </TouchableHighlight>
                        <Divider style={{ backgroundColor: 'lightgrey', }} />
                    </View>


                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text>Left</Text>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
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
            />
            */
            <SwipeListView
                useFlatList
                data={this.state.entries}
                renderItem={ (data, rowMap) => (

                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("ViewEntryDetails", {paramName: data.item.LedgerName})}>
                    <View>
                        <Text style={styles.bigtitle}> {data.item.AccountName}</Text>
                        <Text style={styles.subtitle}> {new Date(data.item.Date).toLocaleTimeString()} </Text>
                    </View>
                    </TouchableOpacity>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                            <Text style={styles.backTextWhite}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
                            <Text style={styles.backTextWhite}>Not Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={this.onRowDidOpen}
            />
        )
    }
}


const styles = StyleSheet.create({
    bigtitle: {
        fontSize: 18,
        textAlign: 'left',
        margin: 7,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'left',
        margin: 7,
    },
    container: {
        backgroundColor: 'white',
        flex: 1
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
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#CCC',
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
        backgroundColor: '#CCC',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: '#CCC',
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