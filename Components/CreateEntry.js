
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'



import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';


const Form = t.form.Form;

const Ledger = t.struct({
    LedgerName: t.String,
    AccountId: t.String,
    Amount: t.Number,
    Currency: t.String,
    Date: t.Date,
    Comment: t.String
});

const options = {
    fields: {
        terms: {
            label: 'Agree to Terms',
        },
    },
};

class CreateEntry extends Component {

    static navigationOptions = {
        tabBarLabel: 'Create Entry',
        tabBarIcon: () => <Icon size={24} name="add-circle-outline" color="white" />
    };

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
        fetch('http://localhost:8080/mobile/createEntry', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                LedgerName: value.ledger
            })
        });
        this.props.navigation.navigate("ViewEntries", {paramName: value.ledger})

    };

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref={component => this._form = component} //wtf is this shit pls dont delete it works
                    type={Ledger}
                    options={options} // pass the options via props
                />
                <Button
                    title="Create Entry!"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});


module.exports = CreateEntry;