import * as Keychain from 'react-native-keychain';

class User {
    constructor() {}

    static currentUser = {
      username: '',
      nama: '',
      password: '',
      islogin: false,
      load: false
    };
    static setCurrentUser(obj) {
        this.currentUser.username=obj.username;
        this.currentUser.nama=obj.nama;
        this.currentUser.islogin=true;
    }
    static setResetCurrentUser() {
        this.currentUser.username="";
        this.currentUser.nama="";
        this.currentUser.islogin=false;
    }
    static getCurrentUser() {
      return this.currentUser;
    }

    static async getSes(p) {
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

export default User;