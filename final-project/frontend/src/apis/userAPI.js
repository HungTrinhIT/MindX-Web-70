import axiosInstance from "./axiosInstance";

const userAPI = {
  uploadAvatar: (formData) =>
    axiosInstance.post("/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default userAPI;
