import React, { useState } from "react";
import userAPI from "../../apis/userAPI";

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.log("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);

      // Make the API request to upload the file
      const response = await userAPI.uploadAvatar(formData);

      console.log("Upload successful");
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AvatarUpload;
