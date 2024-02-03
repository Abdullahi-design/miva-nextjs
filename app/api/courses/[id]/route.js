
import Courses from "@models/courses";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const course = await Courses.findById(params.id)
        if (!course) {
            return new Response(JSON.stringify({ error: "Course not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify(course), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

// export const PATCH = async (request, { params }) => {
//     const { 
//         product, 
//         productName, 
//         description,  
//         metaData, 
//         price, 
//         coverImage, 
//         thumbnail, 
//         category, 
//         cta 
//     } = await request.json();

//     try {
//         await connectToDB();

//         // Find the existing product by ID
//         const existingProduct = await Courses.findById(params.id);

//         if (!existingProduct) {
//             return new Response(JSON.stringify({ error: "Product not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
//         }

//         // Update the product with new data
//         existingProduct.product = product;
//         existingProduct.productName = productName;
//         existingProduct.description = description;
//         existingProduct.metaData = metaData;
//         existingProduct.price = price;
//         existingProduct.coverImage = coverImage;
//         existingProduct.thumbnail = thumbnail;
//         existingProduct.category = category;
//         existingProduct.cta = cta;

//         await existingProduct.save();

//         return new Response("Successfully updated the Products", { status: 200 });
//     } catch (error) {
//         return new Response("Error Updating Product", { status: 500 });
//     }
// };

// export const DELETE = async (request, { params }) => {
//     try {
//       await connectToDB();
  
//       // Find the product by ID and remove it
//       const removedProduct = await Product.findOneAndDelete({ _id: params.id });
  
//       if (!removedProduct) {
//         return new Response(JSON.stringify({ error: "Product not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
//       }
  
//       return new Response("Product deleted successfully", { status: 200 });
//     } catch (error) {
//       console.error(error);
//       return new Response("Error deleting product", { status: 500 });
//     }
// };