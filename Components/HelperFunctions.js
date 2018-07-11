import CRUD from './CRUD';

class HelperFunctions {

    static getUniqueAndTally(entries, parameter){
        switch(parameter)
        {
            case "Ledger":
                const allLedger = entries.map(x=>x.Ledger).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
                totalAmountForLedger = (entries,params) => entries.filter(x=>(x.Ledger===params)).map(_=>_.Amount).reduce((a,b)=>a+b,0);
                return allLedger.map((param)=> ({key:param, value:totalAmountForLedger(entries,param)}));
            case "AccountID":
                const allAccountID = entries.map(x=>x.AccountID).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
                totalAmountForAccountID = (entries,params) => entries.filter(x=>(x.AccountID===params)).map(_=>_.Amount).reduce((a,b)=>a+b,0);
                return allAccountID.map((param)=> ({key:param, value:totalAmountForAccountID(entries,param)}));
            case "AccountName":
                const allAccountName = entries.map(x=>x.AccountName).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
                totalAmountForAccountName = (entries,params) => entries.filter(x=>(x.AccountName===params)).map(_=>_.Amount).reduce((a,b)=>a+b,0);
                return allAccountName.map((param)=> ({key:param, value:totalAmountForAccountName(entries,param)}));
            case "Amount":
                const allAmount = entries.map(x=>x.Amount).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
                totalAmountForAmount = (entries,params) => entries.filter(x=>(x.Amount===params)).map(_=>_.Amount).reduce((a,b)=>a+b,0);
                return allAmount.map((param)=> ({key:param, value:totalAmountForAmount(entries,param)}));
            case "Currency":
                const allCurrency = entries.map(x=>x.Currency).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
                totalAmountForCurrency = (entries,params) => entries.filter(x=>(x.Currency===params)).map(_=>_.Amount).reduce((a,b)=>a+b,0);
                return allCurrency.map((param)=> ({key:param, value:totalAmountForCurrency(entries,param)}));
            case "Date":
                const allDate = entries.map(x=>x.Date).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
                totalAmountForDate = (entries,params) => entries.filter(x=>(x.Date===params)).map(_=>_.Amount).reduce((a,b)=>a+b,0);
                return allDate.map((param)=> ({key:param, value:totalAmountForDate(entries,param)}));
            case "Comment":
                const allComment = entries.map(x=>x.Comment).filter((v,i,a)=>a.indexOf(v)===i); //get all unique currencies
                totalAmountForComment = (entries,params) => entries.filter(x=>(x.Comment===params)).map(_=>_.Amount).reduce((a,b)=>a+b,0);
                return allComment.map((param)=> ({key:param, value:totalAmountForComment(entries,param)}));
        }
    }

    static generateUniqueID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }


}

module.exports = HelperFunctions;
