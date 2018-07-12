import React from 'react';
import {View, Text, TouchableOpacity, InteractionManager, TouchableHighlight, Button, AppState, EventEmitterListener} from 'react-native';
//import Overlay from 'react-native-overlay';
import t from 'tcomb-form-native';
import Autocomplete from 'react-native-autocomplete-input';
import CRUD from './CRUD';


const Component = t.form.Component;



class AutoInput extends Component {



    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            propForQuery: '',
            query: '',
            attribute: '',
            focused:true,
        };
        this.localsOnChange = null;
        this.getTemplate = this.getTemplate.bind(this);

        InteractionManager.runAfterInteractions(() => {
            const locals = super.getLocals();
            const { config: { attribute, propForQuery } } = locals;

            const query = this.props.value;
            //const elements = [{name: 'bob'},{name:'hermano'},{name:'esso'}];
            const elements = [];
            console.log('hi there');

            this.setState({ elements, propForQuery, query, attribute },this.fetchAutocompleteSuggestions);
            //this.setState({ elements, propForQuery, query });
            locals.onChange(query);
        });
    }




    async setAutoComplete(){
        const ledgers = await CRUD.getAllLedgers();


        console.log('eh');
        const eles = ledgers.map(x => ({'name': x.Ledger}));
        console.log(eles);
        this.setState({
            elements: eles
        });
    }








    async fetchAutocompleteSuggestions() {
        const attr = this.state.attribute;
        console.log(attr);
        switch (attr) {
            case "Ledger":
                const ledgers = await CRUD.getAllLedgers();
                const ledg =  ledgers.map(x => ({'name': x.Ledger}));
                this.setState({
                    elements: ledg
                });
                return;
            case "AccountID":
                const accountIDs = await CRUD.getAllAccountIDs();
                const acc = accountIDs.map(x => ({'name': x.AccountID}));
                this.setState({
                    elements: acc,
                });
                return;
            case "Currency":
                const currencies = await CRUD.getAllCurrencies();
                const curr = currencies.map(x => ({'name': x.Currency}));
                this.setState({
                    elements: curr
                });
                return;
            case "Amount":
                this.setState({
                    query: 5,
                    elements:5,
                });
                return;
            case "":
                return;
        }

    }




    getLocals() {

        return super.getLocals();
    }


    getTemplate() {



        return function(locals) {
            const { query } = this.state;
            const elements = this.findElement(query);
            const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

            return (
                <View style={styles.container}>
                    <Autocomplete
                        autoCapitalize="none"

                        hideResults={!this.state.focused}
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        listContainerStyle={{zIndex:40,backgroundColor:'#cccccc'}}
                        inputContainerStyle={styles.inputContainerStyle}
                        data={elements.length === 1 && comp(query, elements[0].name) ? [] : elements}
                        defaultValue={query}
                        onChangeText={text => {
                            this.setState({ query: text });
                            locals.onChange(text);
                        }}
                        placeholder={locals.label}
                        renderItem={({ name }) => (

                            <TouchableHighlight
                                onPress={() => {
                                    console.log('is it???AJKLDFKLKLJSDK');
                                    this.setState({ query: name });
                                    locals.onChange(name);
                                }} style={{zIndex:1}}
                            >
                                <Text style={styles.itemText}>
                                    {name}
                                </Text>
                            </TouchableHighlight>



                        )}

                    />
                    <View>

                    </View>
                </View>
            );
        }.bind(this);
    }

    findElement(query) {

        if (query === '' || !query) {
            return [];
        }

        const { elements } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log(elements);

        const ele = elements.filter(element => element.name.search(regex) >= 0);
        return ele.slice(0,2);
        //return ele;
        //return elements.filter(element => element.name.search(regex) >= 0);


    }
}

const styles = {
    container: {

        //backgroundColor: '#F5FCFF',
        paddingTop: 25,
        zIndex:2,
        marginTop:5,
        marginBottom:25

    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10,
        zIndex:1,
        shadowColor:'#cccccc'
    },
    itemText: {
        fontSize: 15,
        margin: 2,
        zIndex:10,
        flex:0,
        backgroundColor:'#ffffff',


    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8,
        //zIndex:1,
    },
    inputContainerStyle: {
        borderRadius: 4,
        //borderColor: '#cccccc',
        borderWidth: 1,
        marginBottom: 0,
        //zIndex:0,
    },
};

AutoInput.transformer = {
    format: value => {
        return value;
    },
    parse: value => {
        return value;
    },
};

module.exports = AutoInput;