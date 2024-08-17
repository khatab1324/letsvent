import Footer from "../components/homePage/footer";
import Main from "../components/homePage/main";
import Navbar from "../components/homePage/navbar";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { NextRequest } from "next/server";

// import {db} from "@/"
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default async function Home() {
  const result = await cloudinary.api.resources();
  console.log("====================================");
  console.log("ressssulllllltttteeee", result);
  console.log("====================================");
  type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = (
  fileUri: string, fileName: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "product-images", // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};
  return (
    <div className=" h-screen">
      <div className="bg-white dark:bg-gray-900 astro-MEQNHB5A">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
