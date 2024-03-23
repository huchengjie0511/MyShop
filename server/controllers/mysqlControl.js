//数据库连接相关

const mysql = require('mysql');
const config = require('../config/index.js');
const { connection } = require('mongoose');

//创建线程池
const pool = mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT
})


//连接mysql
const allServices = {
    query:function(sql,values){//自己定义的查询方法  数据库异步操作
        //pool 连接
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{//err有值证明连接不成功
                if(err){
                    reject(err)
                }else{
                    //执行sql语句
                    connection.query(sql,values,(err,results)=>{//sql代表自动执行sql语句  values指传入值
                        if(err){
                            reject(err)//失败返回错误
                        }
                        else{
                            resolve(results)//成功返回结果
                        }
                        connection.release()//释放连接
                    })//自带的query
                }
            })
        })
    }
}


//登录
const userLogin = function(username,password){
    let _sql = `select * from users where username="${username}" and password="${password}"`;
    return allServices.query(_sql)
}

module.exports={
    userLogin
}
