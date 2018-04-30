
import React, { Component } from 'react';
import Button from '../Button';
import Blink from '../Blink';


import {
    AppRegistry,
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';

class ViewEntries extends Component {

    state = {
        entries: [],
        loading: true,
    };

    handleLoad = () => {
        console.log("view entries")
        const ledgerName = this.props.navigation.state.params.paramName;
        this.ehh('http://localhost:8080/mobile/ledgerList/test1.data')

        //fetch("http://localhost:8080/mobile/ledgerList/'+ledgerName")

    };

    cb = (data) => {
        console.log(data);
        this.setState({
            entries: data,
            loading: false,
        });
    };

  


    async ehh(ledgerName) {
        try {
            let response = await fetch(
                'http://localhost:8080/mobile/ledgerList/test1.data'
                //'https://facebook.github.io/react-native/movies.json'

            );
            let responseJson = await response.json();
            this.cb(responseJson);

        } catch (error) {
            console.error(error);
        }

    }

    componentDidMount(){
        this.handleLoad();
    }


    render() {
        const {entries, loading} = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                />
                {loading ? <Text>loading</Text> : <Text>{entries[0].AccountName}</Text>}
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