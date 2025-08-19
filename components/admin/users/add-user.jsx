"use client";
import React, { useState, useEffect, useRef } from "react";
import { showSuccess, showError } from "@/lib/toastUtils";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Loader, ArrowLeft } from "lucide-react";
import Image from "next/image";
const AddUser = ({ type }) => {
  const FileUrl = process.env.NEXT_PUBLIC_FILEURL;
  const instance = axiosInstance();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const imageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState([
    { role_id: "Admin", role_name: "Admin" },
    { role_id: "User", role_name: "User" },
  ]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    location: { lat: "", long: "" },
    state: "",
    city: "",
    address: "",
    role: "User",
    image: null,
    createdAt: "",
    updatedAt: "",
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const validate = () => {
    const newErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format (e.g., +1234567890)";
    }
    // Optional fields: validate only if provided
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.location.lat && (formData.location.lat < -90 || formData.location.lat > 90)) {
      newErrors["location.lat"] = "Latitude must be between -90 and 90";
    }
    if (formData.location.long && (formData.location.long < -180 || formData.location.long > 180)) {
      newErrors["location.long"] = "Longitude must be between -180 and 180";
    }
    return newErrors;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getUser = async (id) => {
    try {
      const response = await instance.get(`/users/${id}`);
      if (response.data?.data) {
        const user = response.data.data;
        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          phone: user.phone || "",
          email: user.email || "",
          password: "", // Do not prefill password
          location: user.location || { lat: "", long: "" },
          state: user.state || "",
          city: user.city || "",
          address: user.address || "",
          role: user.role || "",
          createdAt: user.createdAt || "",
          updatedAt: user.updatedAt || "",
          image: user.image || null,
        });
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to fetch user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && typeof value === "string") return;

        // stringify objects like location
        if (typeof value === "object" && !(value instanceof File)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });
      const response = await instance.post("/users/register", formDataToSend);
      if (response?.status === 200) {
        showSuccess(response?.data?.message || "User registered successfully");
        router.push("/admin/users-list");
      }
    } catch (error) {
      console.log(error);
      const backendErrors = error?.response?.data?.error?.errors;
      if (backendErrors && Array.isArray(backendErrors)) {
        const newErrors = {};
        backendErrors.forEach((err) => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
      } else {
        showError(error?.response?.data?.error?.message || "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && typeof value === "string") return;
        if (typeof value === "object" && !(value instanceof File)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });
      const response = await instance.put(`/users/${id}`, formDataToSend);
      if (response?.status === 200) {
        showSuccess(response?.data?.message || "User updated successfully");
        router.push("/admin/users-list");
      }
    } catch (error) {
      console.log(error);
      const backendErrors = error?.response?.data?.error?.errors;
      if (backendErrors && Array.isArray(backendErrors)) {
        const newErrors = {};
        backendErrors.forEach((err) => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
      } else {
        showError(error?.response?.data?.message || "Update failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if ((type === "Edit" || type === "View") && id) {
      getUser(id);
    }
  }, [id, type]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!file) {
      setFormData((prev) => ({ ...prev, image: null }));
      setErrors((prev) => ({ ...prev, image: "" }));
      setPreviewUrl(null);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      imageRef.current.value = "";
      setErrors((prev) => ({
        ...prev,
        image: "Only .jpg, .jpeg, .png, or .webp files are allowed",
      }));
      setFormData((prev) => ({ ...prev, image: null }));
      setPreviewUrl(null);
      return;
    }

    if (file.size > maxSize) {
      imageRef.current.value = "";
      setErrors((prev) => ({
        ...prev,
        image: "Image size should not exceed 2MB",
      }));
      setFormData((prev) => ({ ...prev, image: null }));
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setFormData((prev) => ({ ...prev, image: file }));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleImageDelete = () => {
    imageRef.current.value = "";
    setFormData((prev) => ({ ...prev, image: null }));
    setErrors((prev) => ({ ...prev, image: "" }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-background border shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">
            {type === "View" ? "View User" : `${type} User`}
          </h2>
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push("/admin/users-list")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        <form onSubmit={type === "Edit" ? handleUpdate : handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="e.g., +1234567890"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="First name"
              />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Last name"
              />
              {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            {type === "Add" && (
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            )}

            {/* Location: Latitude */}
            <div>
              <label htmlFor="location.lat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Latitude
              </label>
              <input
                type="number"
                name="location.lat"
                value={formData.location.lat}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="e.g., 40.7128"
              />
              {errors["location.lat"] && <p className="text-red-500 text-xs mt-1">{errors["location.lat"]}</p>}
            </div>

            {/* Location: Longitude */}
            <div>
              <label htmlFor="location.long" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Longitude
              </label>
              <input
                type="number"
                name="location.long"
                value={formData.location.long}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="e.g., -74.0060"
              />
              {errors["location.long"] && <p className="text-red-500 text-xs mt-1">{errors["location.long"]}</p>}
            </div>

            {/* State, City, Address */}
            {["state", "city", "address"].map((field) => (
              <div key={field} className="sm:col-span-1">
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={type === "View"}
                  className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                  placeholder={`Enter ${field}`}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            {/* Role */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                ref={imageRef}
              />
              {formData.image && formData.image !== "null" && (
                <>
                  {typeof formData.image === "string" ? (
                    <Image
                      src={`${FileUrl}${formData.image.replace(/\\/g, "/")}`}
                      alt="Crop"
                      width={128}
                      height={128}
                      className="mt-2 h-32 w-32 object-cover rounded"
                    />
                  ) : (
                    previewUrl && (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={128}
                        height={128}
                        className="mt-2 h-32 w-32 object-cover rounded"
                      />
                    )
                  )}
                  {type !== "View" && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleImageDelete}
                    >
                      Remove
                    </Button>
                  )}
                </>
              )}
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
              >
                <option value="" disabled>Select role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            {/* Created At (View Mode Only) */}
            {type === "View" && (
              <div className="sm:col-span-1">
                <label htmlFor="createdAt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  Created At
                </label>
                <input
                  type="text"
                  name="createdAt"
                  value={formData.createdAt ? new Date(formData.createdAt).toLocaleString() : ""}
                  disabled
                  className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                />
              </div>
            )}

            {/* Updated At (View Mode Only) */}
            {type === "View" && (
              <div className="sm:col-span-1">
                <label htmlFor="updatedAt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  Updated At
                </label>
                <input
                  type="text"
                  name="updatedAt"
                  value={formData.updatedAt ? new Date(formData.updatedAt).toLocaleString() : ""}
                  disabled
                  className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                />
              </div>
            )}
          </div>

          {/* Submit Button (Hidden in View Mode) */}
          {type !== "View" && (
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="default"
                size="sm"
                className="gap-2"
              >
                {isSubmitting && <Loader className="animate-spin w-5 h-5 mr-2" />}
                {type === "Edit" ? "Update User" : "Add User"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUser;