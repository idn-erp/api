require("dotenv").config();
const env = process.env;
class Util{
    static err(err, type='ERROR', msg=false){
        return {
            ok:false, 
            type: type, 
            msg: msg,
            error : (env.PRODUCTION=='1' ? {} : err)
        }
    }
    static ok( data ){
        return {ok:true, data:data}
    }
}

module.exports = Util;