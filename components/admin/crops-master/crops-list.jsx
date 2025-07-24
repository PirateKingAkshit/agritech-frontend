"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, Edit, Trash } from "lucide-react";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import DataTable from "@/components/table-component/data-table";
import Pagination from "@/components/pagination-component/pagination";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/toastUtils";
import Image from "next/image";

const CropsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;

  const instance = axiosInstance();
  const [crops, setCrops] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const FileUrl = process.env.NEXT_PUBLIC_FILEURL;

  const fetchCrops = async () => {
    try {
      const query = searchText.trim()
        ? `/crop-master?q=${searchText.trim()}`
        : `/crop-master?page=${currentPage}&limit=${limit}`;

      const response = await instance.get(query);

      if (response?.status === 200) {
        const { data, pagination } = response.data;
        setCrops(data || []);
        if (!searchText.trim() && pagination) {
          setCurrentPage(pagination.currentPage);
          setLimit(pagination.limit);
          setTotalPages(pagination.totalPages);
        } else {
          setTotalPages(1);
        }
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [currentPage, limit]);

  const handleSearch = () => {
    setCurrentPage(1);
    router.push(`?page=1`);
    fetchCrops();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDeleteId(null);
    setIsModalOpen(false);
  };

  const deleteUser = async () => {
    try {
      const response = await instance.delete(`/crop-master/${deleteId}`);
      if (response?.status === 200) {
        showSuccess(response?.data?.message);
        fetchCrops();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
    closeModal();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      router.push(`?page=${page}`);
    }
  };

  const columns = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => (
          <div className="line-clamp-2">{getValue()}</div>
        ),
      },
      {
        header: "Image",
        accessorKey: "image",
        cell: ({ getValue }) => {
          const imagePath = getValue()?.replace(/\\/g, "/"); // Ensure URL uses forward slashes
          const imageUrl = `${FileUrl}${imagePath}`;
      
          return (
            <div className="relative w-10 h-10">
              <Image
                src={imageUrl}
                alt="Crop Image"
                fill
                className="rounded-full object-cover"
              />
            </div>
          );
        },
      },
      { header: "Category", accessorKey: "category" },
      { header: "Variety", accessorKey: "variety" },
      { header: "Season", accessorKey: "season" },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        },
      },
    ],
    []
  );

  const renderActions = (crop) => (
    <div className="flex gap-2">
      <Link
        href={`/view-crops?id=${crop._id}`}
        className="text-blue-600 hover:text-blue-800"
        title="Preview"
      >
        <Eye size={16} />
      </Link>
      <Link
        href={`/edit-crops?id=${crop._id}`}
        className="text-yellow-600 hover:text-yellow-800"
        title="Edit"
      >
        <Edit size={16} />
      </Link>
      <button
        onClick={() => openDeleteModal(crop._id)}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        <Trash size={16} />
      </button>
    </div>
  );

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-background border shadow rounded-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Search */}
          <div className="w-full md:w-1/2 flex items-center gap-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by phone, name or email"
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background"
            />
            <Button onClick={handleSearch} variant="default" size="sm">
              Search
            </Button>
          </div>

          {/* Add Button */}
          <Link href="/add-user">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/add-crops")}
              className="gap-2"
            >
              <IconPlus size={16} />
              <span className="hidden sm:inline">Add Crop</span>
            </Button>
          </Link>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={crops}
          renderActions={renderActions}
          currentPage={currentPage}
          limit={limit}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setCurrentPage(1);
            router.push(`?page=1`);
          }}
          limit={limit}
        />
      </div>

      {/* Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={deleteUser}
      />
    </div>
  );
};

export default CropsList;
