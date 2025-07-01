export const uploadFilesToCloudinary = async (files) => {
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Gujarati brahm samaj trust"); 
    formData.append("folder", "campaigns"); 

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dsiuht6vl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      uploadedUrls.push(data.secure_url);
    } else {
      throw new Error("Image upload failed");
    }
  }

  return uploadedUrls;
};
