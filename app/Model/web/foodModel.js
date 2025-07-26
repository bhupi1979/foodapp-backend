const mng=require('mongoose')
let foodtable=mng.Schema({
    imagename:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    videoname:{
        type:String,
        required:true
    },
    videoURL:{
        type:String,
        required:true
    },
    audioname:{
        type:String,
        required:true
    },
    audioURL:{
        type:String,
        required:true
    }
})
let foodtableschema=mng.model("foodtablenew",foodtable)
module.exports=foodtableschema