import RNFetchBlob from "react-native-fetch-blob";
import HelperFunctions from "./HelperFunctions";

import currentServerAddress from '../currentServerAddress'
const address = currentServerAddress.address();

class CRUD {

    static getImageDataFromImageURI(URI){
            console.log("getImageDataFromURI");
            console.log(URI);
            var DATA = '';
            RNFetchBlob.fetch('GET', URI, {
                Authorization : 'Bearer access-token',
                "Content-Type": 'image/png'
            })
                .then((res) => {
                    console.log(res);
                    let status = res.info().status;
                    if(status === 200) {
                        console.log('we gettin it');
                        // the conversion is done in native code
                        let base64Str = res.base64();
                        // the following conversions are done in js, it's SYNC
                        let text = res.text();
                        let json = res.json();
                        console.log(res.data);
                        DATA = res.data;

                    } else {
                        console.log('we aint');

                        // handle other status codes
                    }
                })
                // Something went wrong:
                .catch((errorMessage, statusCode) => {
                    console.log("errorMessage: "+errorMessage);
                    console.log("statusMessage: "+statusCode);
                    // error handling
                });
        return DATA;
        }

    static deleteEntry(entryID) {
        console.log("deleteEntry");

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

    }

    static getURIFromPhotoName(photoName){
        return address+':8080/downloadImage/'+ photoName
    }


    static uploadPhotoFromData(localPhotoData){
        console.log("uploadPhotoFromData");
        const photoID = HelperFunctions.generateUniqueID();
        const photoName = photoID+'.png';
        this.uploadPhotoFromDataUsingProvidedName(localPhotoData,photoName,photoID);
        return photoName;
    };

    static uploadPhotoFromDataUsingProvidedName(localPhotoData,photoName,photoID){
        const url = address+':8080/mobile/uploadPhotoEntry';
        RNFetchBlob.fetch('POST',url, {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            "Content-Type": 'multipart/form-data',
        }, [
            { name: photoID, filename: photoName, type: 'image/png', data: localPhotoData}
        ]).then((response) => {
            console.log("SUCCESS: "+response);
        }).catch((response) => {
            console.log("FAIL: "+response)

        });
    }


    static uploadEntry(value){
        console.log("uploadEntry");
        console.log(value);
        fetch(address+':8080/mobile/createEntry', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Ledger: value.Ledger,
                AccountID: value.AccountID,
                Amount: value.Amount,
                Currency: value.Currency,
                Date: value.Date,
                Comment: value.Comment,
                PhotoName: value.PhotoName
            })
        }).then((response) => console.log(response));

    }

    static async getAnything(url){
        try {
            console.log(url);
            let response = await fetch(url);
            let responseJson = await response.json();
            let something = await responseJson;
            return something
        } catch (error) {
            console.error(error);
        }
    }

    static getAllLedgers(){
        const url = address+':8080/mobile/ledgerList';
        return this.getAnything(url)
    }


    static getAllCurrencies(){
        const url = address+':8080/mobile/getAllCurrencies';
        return this.getAnything(url);
    }

    static getCurrenciesForLedger(ledger){
        const url = address+':8080/mobile/getCurrencies/'+ledger;
        return this.getAnything(url);
    }

    static getAllAccountIDs(){
        const url = address+':8080/mobile/getAllAccountIDs';
        return this.getAnything(url);

    }

    static getAccountIDsForLedger(ledger){
        const url = address+':8080/mobile/getAccountIDs/'+ledger;
        return this.getAnything(url);
    }


    static getAllEntries(){
        const url = address+':8080/mobile/getAllEntries';
        return this.getAnything(url);
    }

    static getEntriesForLedger(ledger){
        const url = address+':8080/mobile/ledgerList/ledgerName/'+ledger;
        return this.getAnything(url)

    }



}

module.exports = CRUD;
