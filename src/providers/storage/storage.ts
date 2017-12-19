import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {
  DB_KEY_TOKEN = 'token';
  DB_KEY_TOKEN_ISSET = 'tokenisset';

  constructor(public storage: Storage) { console.log("Storage Class");  }

  insert(key, value){
    this.storage.set(key, value);
    return true;
  }

  remove(key){
    this.storage.remove(key);
  }

  setToken(token){
    let val = this.insert(this.DB_KEY_TOKEN, token);
    console.log("val",val);
    if(val){
      if(this.insert(this.DB_KEY_TOKEN_ISSET, true)){
        console.log("Sucess ALL");
        return true;
      }else{
        console.log("Step 2 Failed");
        return false;
      }
    }else{
      this.insert(this.DB_KEY_TOKEN_ISSET, false);
      console.log("Failed");
      return false;
    }
  }

  issetToken(){
    this.storage.get(this.DB_KEY_TOKEN_ISSET).then(value => {
      if(value == true){
        console.log("Isset Token", true);
        return true;
      }else{
        console.log("Isset Token", false);
        return false;
      }
    });
  }

  resetAll(){
    this.storage.clear();
    console.log("clear all data");
  }


}
