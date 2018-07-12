
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';

import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import entry_details from '../styleSheets/EntryDetails_style';

import currentServerAddress from '../currentServerAddress'
const address= currentServerAddress.address();
import HelperFunctions from './HelperFunctions';



import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    Image,
    PixelRatio

} from 'react-native';




class ViewEntryDetails extends Component {





    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Entry Details',
            headerRight: <Button style={entry_details.button} title={"Edit"} onPress={()=>params.handleThis()}/>,
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

    goToEditPage=()=>this.props.navigation.navigate('EditEntryDetails', {paramName: this.props.navigation.state.params.paramName});


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
        console.log(this.props.navigation.state);
        const entry = this.props.navigation.state.params.paramName;
        const datee = new Date(String(entry.Date));
        const photoURI = {uri:address+':8080/downloadImage/'+entry.PhotoName};


        console.log(photoURI);

        return (



            <View style={entry_details.container}>
                <View style={styles.avatar}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 300}]}>
                        <Image style={styles.avatar} source={photoURI} />
                    </View>
                </View>
                <Text style={entry_details.label}>Ledger</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={entry_details.data}>{entry.Ledger}</Text>

                <Text style={entry_details.label}>Account Path</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={entry_details.data}>{entry.AccountID}</Text>

                <Text style={entry_details.label}>Amount</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={entry_details.data}>{new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: entry.Currency.toString()
                }).format(Number(entry.Amount))}</Text>
                <Text style={entry_details.data}>{HelperFunctions.displayCurrency(entry.Amount,entry.Currency)}</Text>


                <Text style={entry_details.label}>Date</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={entry_details.data}>{new Intl.DateTimeFormat('en-US').format(datee)}</Text>

                <Text style={entry_details.label}>Comment</Text>

                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={entry_details.data}>{entry.Comment}</Text>

                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <TouchableHighlight style={entry_details.redButton} onPress={()=> this._onClickDelete(entry)} underlayColor='#db0404'>
                    <Text style={entry_details.buttonText}>Delete</Text>
                </TouchableHighlight>
            </View>

        );

}

}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 10,
        width: 200,
        height: 200
    }
});



module.exports = ViewEntryDetails;