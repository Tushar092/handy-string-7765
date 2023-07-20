const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
        name:String,
        title:String,
        price:Number,
        image:String

      },
    {
        versionKey:false
    }
)

const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}


// {
//     "name":"LAMP",
//     "title":"3D Night LED Lamp",
//     "price":299
//  }