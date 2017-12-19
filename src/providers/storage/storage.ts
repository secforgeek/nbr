import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {
  DB_KEY_TOKEN = 'token';
  DB_KEY_TOKEN_ISSET = 'tokenisset';

  constructor(public storage: Storage) { console.log("Storage Class");  }

  insert(key, value){
    return this.storage.set(key, value);
  }

  remove(key){
    return this.storage.remove(key);
  }

  setToken(token) {
    if(this.insert(this.DB_KEY_TOKEN, token)){
      this.insert(this.DB_KEY_TOKEN_ISSET, true);
      return true;
    }else{
      this.insert(this.DB_KEY_TOKEN_ISSET, false);
      return false;
    }
  }

  issetToken() : Promise<boolean>{
    return this.storage.get(this.DB_KEY_TOKEN_ISSET).then((value) => {
      return value === true;
    });
  }


}
