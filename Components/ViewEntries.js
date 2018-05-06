
import React, { Component } from 'react';
import Blink from '../Blink';
import EntryCard from '../EntryCard';
import Icon from 'react-native-vector-icons/MaterialIcons'



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



const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },

]

class ViewEntries extends Component {



    static navigationOptions = {
        tabBarLabel: 'View Entries',
        tabBarIcon: () => <Icon size={24} name="book" color="white" />
    };




    state = {
        entries: [],
        loading: true,
    };

    async getJSON(ledgerName) {
        try {
            let response = await fetch('http://localhost:8080/mobile/ledgerList/test1.data');
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
        //const ledgerName = this.props.navigation.state.params.paramName;
        this.getJSON('http://localhost:8080/mobile/ledgerList/test1.data')
        //this.getJSON('http://localhost:8080/mobile/ledgerList/'+ledgerName)
    }

    handleClick=()=>{
        console.log("never go blonde like kanye")
        this.props.navigation.navigate("ViewEntryDetails", {paramName: this.state.entries[0]})
    }


    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.entries}
                    renderItem={({item}) => {

                        return (
                            <TouchableOpacity onPress={this.handleClick}>
                                <View>
                            <Card containerStyle={{padding: 0}} >
                                {
                                    users.map((u, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                title={item.AccountName}
                                                subtitle={new Intl.NumberFormat('en-GB', {
                                                     style: 'currency',
                                                    currency: item.Currency.toString()
                                                }).format(Number(item.Amount))}
                                                badge = {{value: item.Comment, textStyle: {color: 'white'}, containerStyle: {marginTop: -20}}}
                                            />
                                        );
                                    })
                                }
                            </Card>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    //stupid piece of code to stop dumb warnings
                    keyExtractor={() => Math.random().toString(36).substr(2, 9)}


            />
                {/*{loading ? <Text>loading</Text> : <Text>{entries[0].AccountName}</Text>}*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});


module.exports = ViewEntries;