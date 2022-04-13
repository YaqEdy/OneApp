import {ToastAndroid} from 'react-native';
import Axios from 'axios';
import * as Keychain from 'react-native-keychain';

import * as api from '../../../config/API';
import Ses from '../../../config/Ses';


class global {
    constructor() {}

    static goToScreen(t,a) {
        goScreen(t,a);
    }

}


export const goScreen=(t,a)=>{
    Ses.setBtn(a);
    if(a==1){
        t.props.navigation.push('Home');
    }else if(a==2){
        t.props.navigation.push('ListAbsensi')
    }else if(a==3){
        t.props.navigation.push('Location');
    }else if(a==4){
        t.props.navigation.push('ScanQR');
    }
}

  export const createLog=(note)=>{
    var data={
        'id_user': Ses.getCurrentUser().id_user,
        'note': note
    }
    Axios({
        url: `${api.GetUrl()}/Users/createLog`,
        headers: {
            'Content-Type': 'application/json'
            ,'Token' :`${api.GetToken()}`
        },
        method: 'Post',
        data: JSON.stringify(data),
    })
    .then(res2=>{
        if(Boolean(res2.data.success)){
        console.log("create log success.");
        }
    })
    .catch(error=>{
        console.log("create log error.");
    })
}
export default global;