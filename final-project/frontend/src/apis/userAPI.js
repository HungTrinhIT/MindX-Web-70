import axiosInstance from "./axiosInstance";

const userAPI = {
  uploadAvatar: (formData) =>
    axiosInstance.post("/users/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default userAPI;
