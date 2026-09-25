const methods=require('./general');
methods.getAll((err,b)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(b);
})

