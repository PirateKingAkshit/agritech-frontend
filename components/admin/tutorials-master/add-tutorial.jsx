"use client";
import React, { useState, useEffect } from "react";
import { showSuccess, showError } from "@/lib/toastUtils";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Loader, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const AddTutorial = ({ type }) => {
  const instance = axiosInstance();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    language: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMediaType, setSelectedMediaType] = useState("image"); // Default to image
  const limit = 10; // Number of media items per page
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
const [embedUrl, setEmbedUrl] = useState("");
const [embedError, setEmbedError] = useState("");


  // Predefined list of languages for the dropdown
  const languages = [
    { value: "eng", label: "English" },
    { value: "hin", label: "Hindi" },
    { value: "ben", label: "Bengali" },
    { value: "tam", label: "Tamil" },
    { value: "tel", label: "Telugu" },
  ];

  // Media types for the dropdown
  const mediaTypes = [
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
  ];

  // React Quill modules and formats with custom media button
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
        [{ align: [] }],
      ],
     
    },
  };
  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "align",
    "image",
    "video",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name cannot be empty";
    if (!formData.language) newErrors.language = "Language is required";
    if (!formData.description.trim()) newErrors.description = "Description cannot be empty";
    if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(formData.description)) {
      newErrors.description = "Description contains illegal <script> tags";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
    setErrors((prev) => ({ ...prev, description: "" }));
  };

  const getTutorial = async (id) => {
    try {
      const response = await instance.get(`/tutorial-master/${id}`);
      if (response.data?.data) {
        const tutorial = response.data.data;
        setFormData({
          name: tutorial.name || "",
          language: tutorial.language || "",
          description: tutorial.description || "",
        });
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to fetch tutorial");
    }
  };

  const fetchMedia = async (page = 1) => {
    setMediaLoading(true);
    setMediaError(null);
    try {
      const response = await instance.get(`/media-master`, {
        params: { page, limit, type: selectedMediaType }, // Fetch only selected media type
      });
      setMediaItems(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      setMediaError(error?.response?.data?.message || "Failed to fetch media");
    } finally {
      setMediaLoading(false);
    }
  };

  const handleEmbedMedia = (media) => {
    console.log(media)
    let htmlContent = "";
    switch (media.type) {
      case "image":
        htmlContent = `<img src="${media.url}" alt="${media.name}" style="max-width: 100%; height: auto;" />`;
        break;
      case "video":
        htmlContent = `<iframe
  width="100%"
  height="315"
  src="${media.url}"
  title="YouTube video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
`;
        break;
      case "audio":
        htmlContent = `<iframe
  width="100%"
  height="315"
  src="${media.url}"
  title="YouTube video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
`;
        break;
      default:
        return;
    }
    setFormData((prev) => ({
      ...prev,
      description: prev.description + htmlContent,
    }));
    setIsMediaModalOpen(false);
  };

  const handleMediaTypeChange = (value) => {
    setSelectedMediaType(value);
    setCurrentPage(1); // Reset to first page when type changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError("Please fill all required fields correctly");
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await instance.post("/tutorial-master/", formData);
      if (response?.status === 200) {
        showSuccess(response?.data?.message || "Tutorial added successfully");
        router.push("/admin/tutorials-list");
      }
    } catch (error) {
      const backendErrors = error?.response?.data?.error?.errors;
      if (backendErrors && Array.isArray(backendErrors)) {
        const newErrors = {};
        backendErrors.forEach((err) => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
        showError("Validation failed");
      } else {
        showError(error?.response?.data?.message || "Failed to add tutorial");
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
      showError("Please fill all required fields correctly");
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await instance.put(`/tutorial-master/${id}`, formData);
      if (response?.status === 200) {
        showSuccess(response?.data?.message || "Tutorial updated successfully");
        router.push("/admin/tutorials-list");
      }
    } catch (error) {
      const backendErrors = error?.response?.data?.error?.errors;
      if (backendErrors && Array.isArray(backendErrors)) {
        const newErrors = {};
        backendErrors.forEach((err) => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
        showError("Validation failed");
      } else {
        showError(error?.response?.data?.message || "Failed to update tutorial");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if ((type === "Edit" || type === "View") && id) {
      getTutorial(id);
    }
  }, [id, type]);

  useEffect(() => {
    if (isMediaModalOpen) {
      fetchMedia(currentPage);
    }
  }, [isMediaModalOpen, currentPage, selectedMediaType]);

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-background border shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">
            {type === "View" ? "View Tutorial" : `${type} Tutorial`}
          </h2>
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push("/admin/tutorials-list")}
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
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
                placeholder="Tutorial Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Language Dropdown */}
            <div>
              <label
                htmlFor="language"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                disabled={type === "View"}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
              >
                <option value="" disabled>
                  Select Language
                </option>
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              {errors.language && (
                <p className="text-red-500 text-xs mt-1">{errors.language}</p>
              )}
            </div>

            {/* Description */}
<div className="sm:col-span-2">
  <label
    htmlFor="description"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
  >
    Description *
  </label>

  {type !== "View" && (
    <div className="flex justify-end mb-2">
      <div className="flex gap-2">
  <Button
    type="button"
    variant="secondary"
    size="sm"
    onClick={() => setIsMediaModalOpen(true)}
  >
    Insert Media
  </Button>
  <Button
    type="button"
    variant="secondary"
    size="sm"
    onClick={() => {
      setEmbedUrl("");
      setEmbedError("");
      setIsEmbedModalOpen(true);
    }}
  >
    Embed URL
  </Button>
</div>

    </div>
  )}

  <ReactQuill
    value={formData.description}
    onChange={handleDescriptionChange}
    readOnly={type === "View"}
    modules={quillModules}
    formats={quillFormats}
    className="bg-background dark:text-gray-200"
    placeholder="Enter a detailed tutorial description..."
  />

  {errors.description && (
    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
  )}
</div>

          </div>

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
                {type === "Edit" ? "Update Tutorial" : "Add Tutorial"}
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Media Selection Modal */}
      <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
              Media Type
            </label>
            <Select
              value={selectedMediaType}
              onValueChange={handleMediaTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select media type" />
              </SelectTrigger>
              <SelectContent>
                {mediaTypes.map((mediaType) => (
                  <SelectItem key={mediaType.value} value={mediaType.value}>
                    {mediaType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {mediaLoading ? (
            <div className="flex justify-center py-10">
              <Loader className="animate-spin w-8 h-8" />
            </div>
          ) : mediaError ? (
            <p className="text-red-500 text-center">{mediaError}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
  {mediaItems.map((media) => (
    <div
      key={media._id}
      className="border rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
      onClick={() => handleEmbedMedia(media)}
    >
      {media.type === "image" && (
        <img
          src={media.url}
          alt={media.name}
          className="w-full h-32 object-cover rounded"
        />
      )}
      {media.type === "video" && (
        <video
          src={media.url}
          className="w-full h-32 object-cover rounded"
          controls
          muted
        />
      )}
      {media.type === "audio" && (
        <div className="flex items-center justify-center h-32 bg-gray-200 dark:bg-gray-700 rounded">
          <audio controls className="w-full">
            <source src={media.url} type={media.format} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}
      <p className="text-sm mt-2 truncate">{media.name}</p>
      <p className="text-xs text-gray-500">{media.type}</p>
    </div>
  ))}
</div>
          )}
          {!mediaLoading && !mediaError && mediaItems.length === 0 && (
            <p className="text-center text-gray-500">No {selectedMediaType} found</p>
          )}
          <DialogFooter className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && fetchMedia(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => fetchMedia(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && fetchMedia(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEmbedModalOpen} onOpenChange={setIsEmbedModalOpen}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Embed URL</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col gap-2 mt-2">
      <label className="text-sm font-medium">URL *</label>
      <input
        type="url"
        className="border border-border rounded px-3 py-2 text-sm bg-background dark:text-gray-200"
        value={embedUrl}
        onChange={(e) => {
          setEmbedUrl(e.target.value);
          setEmbedError("");
        }}
        placeholder="https://www.youtube.com/embed/..."
      />
      {embedError && (
        <p className="text-red-500 text-xs">{embedError}</p>
      )}
    </div>
    <DialogFooter className="mt-4">
      <Button
        type="button"
        onClick={() => {
          if (!embedUrl || !/^https?:\/\/.+/.test(embedUrl)) {
            setEmbedError("Please enter a valid URL.");
            return;
          }

          const embedCode = `<iframe width="100%" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
          setFormData((prev) => ({
            ...prev,
            description: prev.description + embedCode,
          }));
          setIsEmbedModalOpen(false);
        }}
      >
        Embed
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default AddTutorial;