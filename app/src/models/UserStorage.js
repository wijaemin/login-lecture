"use strict"

const db = require("../config/db");

class UserStorage {

    static getUsers(isAll, ...fields) {

    }

    static getUserInfo(id){
       return new Promise((resolve,reject)=>{
            db.query("select * from users where id = ?",[id],(err,data)=>{
                if(err) reject(err);
                resolve(data[0]);
            });
        });
    };



    static async save(userInfo){

    }
}

module.exports = UserStorage;