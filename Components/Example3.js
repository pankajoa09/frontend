import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image,
    PixelRatio, TouchableOpacity
} from 'react-native';

import RNFetchBlob from "react-native-fetch-blob";
import HelperFunctions from "./HelperFunctions";
import entry_details from "../styleSheets/EntryDetails_style";
import currentServerAddress from '../currentServerAddress'

const address= currentServerAddress.address();



class Example3 extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            source:null,
            data: null,
        }
    }

    componentDidMount(){
        this.setState({
           source:null,
           data: null
        });

    }


    fetchData(){
        console.log("fetching the photo");

        const url = address+':8080/image';
        console.log(url);
        const photoID = HelperFunctions.generateUniqueID();
        const photoName = photoID+'.png';

        RNFetchBlob.fetch('GET', url, {
            Authorization : 'Bearer access-token',
            "Content-Type": 'image/png'
        })
            .then((res) => {
                console.log(res);
                let status = res.info().status;


                if(status === 200) {
                    console.log("was the response 200? mah boiii");


                    // the conversion is done in native code

                    let base64Str = res.base64();
                    // the following conversions are done in js, it's SYNC
                    let text = res.text();
                    let json = res.json();
                    this.setState({
                        source: {uri: url},
                        data: res.data,
                        },this.render
                    );
                } else {
                    // handle other status codes
                }
            })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                console.log("errorMessage: "+errorMessage);
                console.log("statusMessage: "+statusCode);
                // error handling
            })

    }



    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={this.fetchData.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                            <Image style={styles.avatar} source={{uri:'http://localhost:8080/image'}} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
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

module.exports = Example3;
