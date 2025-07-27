const foodtableschema = require("../../Model/web/foodModel")
const cloudinary1=require('./cloudinarynew')
const fs = require('fs')
const path = require('path')
//getting imag data of food
let foodgetdata= async(req,res)=>{
await foodtableschema.find().then((response)=>{
res.send({status:1,msg:"data found successfully",data:response})
}).catch((err)=>{
res.send({status:0,msg:"no data found successfully",data:err})
})
}
//insetting the food api data
let foodinsertdata= async(req,res)=>{
  let imagepath,videopath,audiopath
  
   const uploadToCloudinary = (fileBuffer, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
      cloudinary1.uploader.upload_stream(
        { resource_type: resourceType },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      ).end(fileBuffer)
    });
  };
  
  if (req.files['image']?.[0]?.buffer?.length > 0) {
      imagepath = await uploadToCloudinary(req.files['image'][0].buffer, 'image');
    }

    // Video
    if (req.files['video']?.[0]?.buffer?.length > 0) {
      videopath = await uploadToCloudinary(req.files['video'][0].buffer, 'video');
    }

    // Audio
    if (req.files['audio']?.[0]?.buffer?.length > 0) {
      audiopath = await uploadToCloudinary(req.files['audio'][0].buffer, 'auto');
    }

    // Debug logs
    console.log("Uploaded Image URL:", imagepath);
    console.log("Uploaded Video URL:", videopath);
    console.log("Uploaded Audio URL:", audiopath);
    console.log("Form Data:", req.body);
  let obj=new foodtableschema({
        imagename:req.body.imagename,
        //this is only for uploadin data on local machin
        //imageURL:req.files['image'][0].filename,
        imageURL:imagepath,
         videoname:req.body.videoname,
         videoURL:videopath,
        //videoURL:req.files['video'][0].filename,
         audioname:req.body.audioname,
         audioURL:audiopath
        //audioURL:req.files['audio'][0].filename
    })
    
    await obj.save().then((response)=>{
        res.send({status:1,msg:"data inserted successfully",data:response})
        
        }).catch((err)=>{

res.send({status:0,msg:"data not inserted successfully",data:err})
        
    })
}
//delet controller 
let fooddelete= async(req,res)=>{
    let{id}=req.params 
    //the under code is required only on localmachine if required
//     let filename
//     let data=await foodtableschema.find({_id:id})
//     if(data.length>0)
//     {
//         console.log(data[0].imageURL)
//         imagefilename=data[0].imageURL
//         console.log(data[0].videoURL)
//         videofilename=data[0].videoURL
//         console.log(data[0].audioURL)
//         audiofilename=data[0].audioURL
//     }
//     else{
//          return res.send("no data found to be deleted")
//     }
//    // const fileName = req.file.filename; // Replace with file name from user/request
//  const imagefilePath = path.join('uploads', imagefilename);
//  const videofilePath = path.join('uploads', videofilename);
//  const audiofilePath = path.join('uploads', audiofilename);
//  let deletion=true
// //let )
// if (fs.existsSync(imagefilePath))
//  { fs.unlink(imagefilePath, (err) => {
//     if (err) {
//       console.error('File deletion error:', err);
//       deletion=false
//       return res.status(500).json({ message: 'File deletion failed' });
//     }

//   })
// }
// if (fs.existsSync(videofilePath))
//  { 
//  fs.unlink(videofilePath, (err) => {
//     if (err) {
//       console.error('File deletion error:', err);
//       deletion=false
//       return res.status(500).json({ message: 'File deletion failed' });
//     }

//   })
// }
// if (fs.existsSync(audiofilePath))
//  { 
//   fs.unlink(audiofilePath, (err) => {
//     if (err) {
//       deletion=false
//       console.error('File deletion error:', err);
//       return res.status(500).json({ message: 'File deletion failed' });
//     }

//   })
// }
  = await foodtableschema.deleteOne({_id:id}).then((res)=>{
res.send({status:1,msg:"data deleted succesfully",data:res})
  }).catch((err)=>{
res.send({status:1,msg:"data did not deleted succesfully",data:err})
  })
    
    

}
//**********edit api */
let foodupdate= async(req,res)=>{
  let obj={}
  let imagefilename,videofilename,audiofilename
  if (req.body.imagename!=undefined||req.body.imagename!=null ) 
    obj.imagename=req.body.imagename
    if (req.body.videoname!=undefined||req.body.videoname!=null ) 
    obj.videoname=req.body.videoname
    if (req.body.audioname!=undefined||req.body.audioname!=null ) 
    obj.audioname=req.body.audioname
  let{id}=req.params 
  
    let data=await foodtableschema.find({_id:id})
    if(data.length>0)
    {
        console.log(data[0].imageURL)
        imagefilename=data[0].imageURL
        videofilename=data[0].videoURL
        audiofilename=data[0].audioURL
    }
    else{
         return res.send("no file to be updated")
    }
  const uploadToCloudinary = (fileBuffer, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
      cloudinary1.uploader.upload_stream(
        { resource_type: resourceType },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      ).end(fileBuffer)
    })
  }
    //const filePath = [path.join('uploads', imagefilename),path.join('uploads',videofilename,path.join('uploads',audiofilename))];
   if(req.files['image']) 
    { 
      //this code is used when upload folder is local machin
      //obj.imageURL=req.files['image'][0].filename 
  //     fs.unlink(path.join('uploads', imagefilename), (err) => {
  //   if (err) {
  //     console.error('File deletion error:', err);
  //     //return res.status(500).json({ message: 'File deletion failed' });
  //   }
  // })
        obj.imageURL = await uploadToCloudinary(req.files['image'][0].buffer, 'image');

    }// Example path
    
    if(req.files['video'])
     { 
      obj.videoURL = await uploadToCloudinary(req.files['video'][0].buffer, 'video');

      //obj.videoURL=req.files['video'][0].filename
  //     fs.unlink(path.join('uploads', videofilename), (err) => {
  //   if (err) {
  //     console.error('File deletion error:', err);
  //     //return res.status(500).json({ message: 'File deletion failed' });
  //   }
  // })
     }
    if(req.files['audio'])
     {
    obj.audioURL= await uploadToCloudinary(req.files['audio'][0].buffer, 'auto');

  //      obj.audioURL=req.files['audio'][0].filename
  //      fs.unlink(path.join('uploads', audiofilename), (err) => {
  //   if (err) {
  //     console.error('File deletion error:', err);
  //     //return res.status(500).json({ message: 'File deletion failed' });
  //   }
  // })
 
     }
     await foodtableschema.updateOne({_id:id},obj).then(()=>{
 res.send({status:1,msg:"data updated successfully"})
   }).catch((err)=>{
 res.send({status:0,msg:"data did not save there is some error ",Error:err})
   })
 

 
 
 
//  else{
//           await foodtableschema.updateOne({_id:id},obj).then(()=>{
//  res.send({status:1,msg:"data updated successfully"})
//    }).catch((err)=>{
//  res.send({status:0,msg:"data did not save there is some error ",Error:err})
//    })
//  }
 
}
let fooddatabyid=async(req,res)=>{
    let id=req.params.id
let ss= await foodtableschema.findById(id)
   if(ss!=null||ss!=""||ss!=undefined||ss!={})
   {
    res.send({status:1,data:ss})
   }
   else{
    res.send({status:0,msg:"there is no data to display"})
   }}
module.exports={foodgetdata,foodinsertdata,fooddelete,foodupdate,fooddatabyid}