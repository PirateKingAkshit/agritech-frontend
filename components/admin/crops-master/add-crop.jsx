"use client";
import React, { useState, useEffect, useRef } from "react";
import { showSuccess, showError } from "@/lib/toastUtils";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Loader, ArrowLeft } from "lucide-react";
import Image from "next/image";

const AddCrop = ({ type }) => {
  const instance = axiosInstance();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const FileUrl = process.env.NEXT_PUBLIC_FILEURL;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    name: "",
    variety: "",
    season: "",
    image: null,
    createdAt: "",
    updatedAt: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category cannot be empty";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description cannot be empty";
    }
    if (!formData.variety.trim()) {
      newErrors.variety = "Variety cannot be empty";
    }
    if (!formData.season.trim()) {
      newErrors.season = "Season cannot be empty";
    }
    if (formData.image) {
      const maxSize = 2 * 1024 * 1024;
      if (formData.image.size > maxSize) {
        newErrors.image = "Image size should not exceed 2MB";
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const imageRef = useRef(null);
  const handleImageChange = (e) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize) {
        imageRef.current.value = "";
        setErrors((prev) => ({
          ...prev,
          image: "Image size should not exceed 2MB",
        }));
        setFormData({
          ...formData,
          image: null,
        });
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        imageRef.current.value = "";
        setErrors((prev) => ({
          ...prev,
          image: "Only .jpg, .jpeg, .png, or .webp files are allowed",
        }));
        setFormData({
          ...formData,
          image: null,
        });
        return;
      }
      setFormData({
        ...formData,
        image: file,
      });
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    } else {
      setFormData({
        ...formData,
        image: null,
      });
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const handleImageDelete = () => {
    imageRef.current.value = "";
    setFormData({
      ...formData,
      image: null,
    });
    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };
  const getCrop = async (id) => {
    try {
      const response = await instance.get(`/crop-master/${id}`);
      if (response.data?.data) {
        const crop = response.data.data;
        setFormData({
          category: crop.category || "",
          description: crop.description || "",
          name: crop.name || "",
          variety: crop.variety || "",
          season: crop.season || "",
          image: crop?.image || null,
          createdAt: crop.createdAt || "",
          updatedAt: crop.updatedAt || "",
        });
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to fetch crop");
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
        formDataToSend.append(key, value);
      });
      const response = await instance.post("/crop-master/", formDataToSend);
      if (response?.status === 201) {
        showSuccess(response?.data?.message || "Crop added successfully");
        router.push("/crops-list");
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
        formDataToSend.append(key, value);
      });
      if (formDataToSend.image === "null") {
        delete formDataToSend.image;
      }
      const response = await instance.put(`/crop-master/${id}`, formDataToSend);
      if (response?.status === 200) {
        showSuccess(response?.data?.message || "Crop updated successfully");
        router.push("/crops-list");
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
      getCrop(id);
    }
  }, [id, type]);

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-background border shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">
            {type === "View" ? "View Crop" : `${type} Crop`}
          </h2>
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push("/crops-list")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        <form onSubmit={type === "Edit" ? handleUpdate : handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category*/}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Category"
              />
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* Description*/}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Description"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Variety */}
            <div>
              <label
                htmlFor="variety"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Variety
              </label>
              <input
                type="text"
                name="variety"
                value={formData.variety}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Variety"
              />
              {errors.variety && (
                <p className="text-red-500 text-xs mt-1">{errors.variety}</p>
              )}
            </div>

            {/* Season */}
            <div>
              <label
                htmlFor="season"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Season
              </label>
              <input
                type="text"
                name="season"
                value={formData.season}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Season"
              />
              {errors.season && (
                <p className="text-red-500 text-xs mt-1">{errors.season}</p>
              )}
            </div>

            {/* Image */}

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
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
                  <Image
                    src={`${FileUrl}${formData?.image?.replace(/\\/g, "/")}`}
                    alt="Selected"
                    width={128}
                    height={128}
                    className="mt-2 h-32 w-32 object-cover rounded"
                  />
                  {type !== "View" && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => {
                        handleImageDelete();
                      }}
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

            {/* Created At (View Mode Only) */}
            {type === "View" && (
              <div className="sm:col-span-1">
                <label
                  htmlFor="createdAt"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Created At
                </label>
                <input
                  type="text"
                  name="createdAt"
                  value={
                    formData.createdAt
                      ? new Date(formData.createdAt).toLocaleString()
                      : ""
                  }
                  disabled
                  className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                />
              </div>
            )}

            {/* Updated At (View Mode Only) */}
            {type === "View" && (
              <div className="sm:col-span-1">
                <label
                  htmlFor="updatedAt"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Updated At
                </label>
                <input
                  type="text"
                  name="updatedAt"
                  value={
                    formData.updatedAt
                      ? new Date(formData.updatedAt).toLocaleString()
                      : ""
                  }
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
                {isSubmitting && (
                  <Loader className="animate-spin w-5 h-5 mr-2" />
                )}
                {type === "Edit" ? "Update Crop" : "Add Crop"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
