import React, { useContext, useState } from "react";
import userAPI from "../../apis/userAPI";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const UserProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const {
    auth: { user },
    fetchCurrentUser,
  } = useContext(AuthContext);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      // Make the API request to upload the file
      await userAPI.uploadAvatar(formData);
      await fetchCurrentUser();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <h1>Upload avatar</h1>
      {loading && <p>Upload avatar in progress...</p>}
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload avatar</button>
      <div>
        <img
          style={{ width: "200px", height: "auto", objectFit: "cover" }}
          alt="avatar"
          src={user?.avatar || ""}
        />
      </div>
    </div>
  );
};

export default UserProfile;
