
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
import t from 'tcomb-form-native';



import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,

} from 'react-native';




class ViewEntryDetails extends Component {


    componentWillMount(){

    }


    render() {
        const entry = this.props.navigation.state.params.paramName;
        console.log(entry.Date);
        const datee = new Date(String(entry.Date));
        console.log("here look");
        console.log(datee);
        console.log("---thats it");


        //console.log(new Intl.DateTimeFormat('en-US').format(Date(entry.Date.toString())));


        return (
            <View style={styles.container}>

                <Text style={styles.label}>Account Path</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{entry.AccountID}</Text>

                <Text style={styles.  label}>Amount</Text>
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


            </View>
        );

}

}

const styles = StyleSheet.create({
    container: {
        //justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        flex: 1,
        paddingTop: 100,
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
    },


    label: {
        fontSize: 16,
        textAlign: 'left',
        margin: 0,
        color: 'darkslategrey',

    },
    data: {
        fontSize: 20,
        textAlign: 'left',
        margin: 7,
    }

});


module.exports = ViewEntryDetails;