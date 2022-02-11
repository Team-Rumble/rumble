import { MMKV } from "react-native-mmkv";

export const storage = (uid: string) => new MMKV({
    id: `user-${uid}-storage`,
  })


// storage: 
/*
 - userInfo
 - userID


* LOGIN
 - Once Login button has been pressed, storage.set("userInfo", user), storage.set("userId", uid);

* Sign Up
 - Once sign up button has been pressed, storage.set("userInfo", user), storage.set("userId", uid);

 */

