const mongoose=require('mongoose');

const UsuarioSchema=mongoose.Schema({
    userName:{
        type:String,
        trim:true
    }
});

module.exports=mongoose.model('users',UsuarioSchema);