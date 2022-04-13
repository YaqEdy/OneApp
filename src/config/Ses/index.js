import * as Keychain from 'react-native-keychain';

class Models {
    constructor() {}

    static currentBtn = {
      id: 1,
      color_default:"black",
      color_change:"green"
    }
    static setBtn(a) {
        this.currentBtn.id=a;
    }
    static getBtn() {
        return this.currentBtn;
    }

    static currentUser = {
      id_user: 0,
      nik: '',
      username: '',
      nama: '',
      password: '',
      device_id:'',
      islogin: false,
      device_id:'',
      fg_location:'',
      title:'destination',
      latitude:'-6.175392',
      longitude:'106.827153',
      radius:'',
      pin_color:'',
      isOTP: false
    };
    static setCurrentUser(obj) {
        this.currentUser.id_user=obj.id_user;
        this.currentUser.nik=obj.nik;
        this.currentUser.username=obj.username;
        this.currentUser.nama=obj.nama;
        this.currentUser.islogin=true;
        this.currentUser.device_id=obj.device_id;
        this.currentUser.fg_location=obj.fg_location;
        this.currentUser.title=obj.title;
        this.currentUser.latitude=obj.latitude;
        this.currentUser.longitude=obj.longitude;
        this.currentUser.radius=obj.radius;
        this.currentUser.pin_color=obj.pin_color;
    }
    static setResetCurrentUser() {
        this.currentUser.id_user=0;
        this.currentUser.nik="";
        this.currentUser.username="";
        this.currentUser.nama="";
        this.currentUser.islogin=false;
        this.currentUser.device_id="";
        this.currentUser.fg_location="";
        this.currentUser.title="";
        this.currentUser.latitude="";
        this.currentUser.longitude="";
        this.currentUser.radius="";
        this.currentUser.pin_color="";
        this.currentUser.isOTP=false;
    }
    static setOTP(tf) {
        this.currentUser.isOTP=tf;
    }
    static getCurrentUser() {
      return this.currentUser;
    }

    static async getSes() {
        try {
            // Retrieve the credentials
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                const obj=JSON.parse(credentials.password);
                this.setCurrentUser(obj);
                // console.log("ses "+p+"- ", credentials.username,this.getCurrentUser());
                return true;
            }else {
                console.log('ses: No credentials stored '+credentials);
                return false;
            }
        } catch (error) {
            console.log("Keychain couldn't be accessed!", error);
                return false;
        }
    }


}

export default Models;