const mongoose = require('mongoose');
require('dotenv').config()
function Dbconnect(){
mongoose.connect(process.env.URL)
  .then(() => console.log('database Connected! successfully')).catch((err)=>{
    console.log(err)
  })
}
module.exports=Dbconnect