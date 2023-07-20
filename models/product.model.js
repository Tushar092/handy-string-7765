const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
        name:String,
        title:String,
        type: String,
        description: String,
        rating: Number,
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