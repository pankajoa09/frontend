import React, { Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';


class Example extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listType: 'FlatList',
            listViewData: Array(20).fill('').map((_,i) => ({key: `${i}`, text: `item #${i}`})),
        };
    }

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    deleteRow(rowMap, rowKey) {
        this.closeRow(rowMap, rowKey);
        const newData = [...this.state.listViewData];
        const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        this.setState({listViewData: newData});
    }

    onRowDidOpen = (rowKey, rowMap) => {
        console.log('This row opened', rowKey);
        setTimeout(() => {
            this.closeRow(rowMap, rowKey);
        }, 2000);
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.standalone}>
                    <SwipeRow
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    >
                        <View style={styles.standaloneRowBack}>
                            <Text style={styles.backTextWhite}>Left</Text>
                            <Text style={styles.backTextWhite}>Right</Text>
                        </View>
                        <View style={styles.standaloneRowFront}>
                            <Text>I am a standalone SwipeRow</Text>
                        </View>
                    </SwipeRow>
                </View>

                <View style={styles.controls}>
                    <View style={styles.switchContainer}>
                        { ['Basic', 'Advanced', 'FlatList', 'SectionList'].map( type => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.switch,
                                    {backgroundColor: this.state.listType === type ? 'grey' : 'white'}
                                ]}
                                onPress={ _ => this.setState({listType: type}) }
                            >
                                <Text>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {
                        this.state.listType === 'Advanced' &&
                        <Text>per row behavior</Text>
                    }
                </View>

                {
                    this.state.listType === 'Basic' &&

                    <SwipeListView
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={ data => (
                            <TouchableHighlight
                                onPress={ _ => console.log('You touched me') }
                                style={styles.rowFront}
                                underlayColor={'#AAA'}
                            >
                                <View>
                                    <Text>I am {data.text} in a SwipeListView</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenRow={ (data, secId, rowId, rowMap) => (
                            <View style={styles.rowBack}>
                                <Text>Left</Text>
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, `${secId}${rowId}`) }>
                                    <Text style={styles.backTextWhite}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, `${secId}${rowId}`) }>
                                    <Text style={styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                    />
                }

                {
                    this.state.listType === 'Advanced' &&

                    <SwipeListView
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={ (data, secId, rowId, rowMap) => (
                            <SwipeRow
                                disableLeftSwipe={parseInt(rowId) % 2 === 0}
                                leftOpenValue={20 + Math.random() * 150}
                                rightOpenValue={-150}
                            >
                                <View style={styles.rowBack}>
                                    <Text>Left</Text>
                                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, `${secId}${rowId}`) }>
                                        <Text style={styles.backTextWhite}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, `${secId}${rowId}`) }>
                                        <Text style={styles.backTextWhite}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableHighlight
                                    onPress={ _ => console.log('You touched me') }
                                    style={styles.rowFront}
                                    underlayColor={'#AAA'}
                                >
                                    <View>
                                        <Text>I am {data.text} in a SwipeListView</Text>
                                    </View>
                                </TouchableHighlight>
                            </SwipeRow>
                        )}
                    />
                }

                {
                    this.state.listType === 'FlatList' &&

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
                }

                {
                    this.state.listType === 'SectionList' &&

                    <Text>Coming soon...</Text>
                }

            </View>
        );
    }
}

module.exports = Example;


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

