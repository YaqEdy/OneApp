import {ToastAndroid} from 'react-native';
import Axios from 'axios';
import * as Keychain from 'react-native-keychain';

import * as api from '../API';
import Ses from './index';


class runBack {
    constructor() {}

    static goRunBack(t) {
        getDataAll(t);
    }

}


export const getDataAll=(t)=>{
    if(Ses.getCurrentUser().islogin){
        // console.log("Rback");
        Axios({
        url: `${api.GetUrl()}/Users/getDataAll/${Ses.getCurrentUser().id_user}`,
        headers: {
            'Content-Type': 'application/json'
            ,'Token' :`${api.GetToken()}`
        },
        method: 'GET',
        })
        .then(res=>{
            if(Boolean(res.data.success)){
                const obj=JSON.parse(JSON.stringify(res.data.data[0]));
                Ses.setCurrentUser(obj);
                // console.log("OBJ: ",obj);
                if(t.state.device_id!=obj.device_id){
                    Keychain.resetGenericPassword();
                    t.props.navigation.push('Login');
                    if(obj.device_id!=null){
                    ToastAndroid.showWithGravity(res.data.msgDeviceId,ToastAndroid.LONG,ToastAndroid.CENTER);
                    }
                }
            }else{
                console.log("OBJ: 2");
                getDataAll(t);
                createLog("getDataAll false");
            }
        })
        .catch(error=>{
            console.log("log",error);
        })
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
export default runBack;