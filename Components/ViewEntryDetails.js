
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';

import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../styleForEntryDetails';

import currentServerAddress from '../currentServerAddress'
const address= currentServerAddress.address();



import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,

} from 'react-native';




class ViewEntryDetails extends Component {





    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Entry Details',
            headerRight: <Button style={styles.button} title={"Edit"} onPress={()=>params.handleThis()}/>,
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon size={24} name="home" color="white" />,

        }
    };

    componentDidMount(){
        console.log('view entry details')
        this.props.navigation.setParams({
            handleThis: this.goToEditPage
        })
    }

    goToEditPage=()=>this.props.navigation.navigate('EditEntryDetails', {paramName: this.props.navigation.state.params.paramName})


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

    _onClickDelete(entry){
        console.log("deleting entry");
        this.deleteEntry(entry.EntryID);
        console.log(entry.Ledger);
        this.props.navigation.navigate('ViewEntries',{paramName: entry.Ledger});
    }

    render() {
        const entry = this.props.navigation.state.params.paramName;
        const datee = new Date(String(entry.Date));


        return (
            <View style={styles.container}>
                <Text style={styles.label}>Ledger</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{entry.Ledger}</Text>

                <Text style={styles.label}>Account Path</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{entry.AccountID}</Text>

                <Text style={styles.label}>Amount</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: entry.Currency.toString()
                }).format(Number(entry.Amount))}</Text>


                <Text style={styles.label}>Date</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{new Intl.DateTimeFormat('en-US').format(datee)}</Text>

                <Text style={styles.label}>Comment</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{entry.Comment}</Text>

                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <TouchableHighlight style={styles.redButton} onPress={()=> this._onClickDelete(entry)} underlayColor='#db0404'>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableHighlight>


            </View>
        );

}

}





module.exports = ViewEntryDetails;