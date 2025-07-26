const exp=require('express')
const { foodgetdata, foodinsertdata, fooddelete, foodupdate, fooddatabyid } = require('../../controller/web/foodcontroller')
const upload = require('../../controller/web/multer')

const foodrt=exp.Router()

foodrt.get("/foodapi/foodview",foodgetdata)
foodrt.post("/foodapi/foodinsert",upload.fields([{ name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),foodinsertdata)
foodrt.delete("/foodapi/fooddelete/:id",fooddelete)
foodrt.put("/foodapi/foodupdate/:id",upload.fields([{ name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),foodupdate)
foodrt.get("/foodapi/fooddatabyid/:id",fooddatabyid)

module.exports={foodrt}