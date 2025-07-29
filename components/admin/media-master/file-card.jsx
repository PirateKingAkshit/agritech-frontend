
'use client';

import { useState } from 'react';
import { formatFileSize, formatDate, getFileIcon } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; 
import { showSuccess } from '@/lib/toastUtils';
import Image from 'next/image';

export default function FileCard({ file, onDelete, onDownload, viewType }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const isImage = file.format.startsWith('image/');
  const isVideo = file.format.startsWith('video/');
  const isAudio = file.format.startsWith('audio/');
  const isDocument = !isImage && !isVideo && !isAudio;

  const handleDelete = () => {
    onDelete(file._id);
    showSuccess(`${file.name} has been deleted`);
  };

  const handleDownload = () => {
    onDownload(file);
    showSuccess(`Downloading ${file.name}`);
  };

  const renderPreview = () => {
    if (isImage) {
      return (
        <div className="flex justify-center items-center">
          <Image
            src={file.url.replace("\\","/")}
            alt={file.name}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            width={1000}
            height={1000}
          />
        </div>
      );
    } else if (isVideo) {
      return (
        <video
          src={file.url.replace("\\","/")}
          controls
          className="max-w-full max-h-[80vh] rounded-lg"
          width={1000}
          height={1000}
        />
      );
    } else if (isAudio) {
      return (
        <div className="flex flex-col items-center space-y-4 p-8">
          <i className="ri-music-line w-16 h-16 flex items-center justify-center text-gray-400"></i>
          <div className="text-center">
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
          </div>
          <audio controls className="w-full max-w-md">
            <source src={file.url.replace("\\","/")} type={file.format} />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center space-y-4 p-8">
          <i className={`${getFileIcon(file.name)} w-16 h-16 flex items-center justify-center text-gray-400`}></i>
          <div className="text-center">
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
          </div>
        </div>
      );
    }
  };

  if (viewType === 'list') {
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {isImage ? (
              <Image
                src={file.url.replace("\\","/")}
                alt={file.name}
                className="w-12 h-12 object-cover rounded"
                width={48}
                height={48}
              />
            ) : isAudio ? (
              <i className="ri-music-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
            ) : (
              <i className={`${getFileIcon(file.name)} w-12 h-12 flex items-center justify-center text-gray-400`}></i>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">
              {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {(isImage || isVideo || isAudio) && (
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="whitespace-nowrap cursor-pointer">
                  <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-1"></i>
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{file.name}</DialogTitle>
                </DialogHeader>
                {renderPreview()}
              </DialogContent>
            </Dialog>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="whitespace-nowrap cursor-pointer">
                <i className="ri-more-2-line w-4 h-4 flex items-center justify-center"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
                <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 cursor-pointer">
                <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border hover:shadow-md transition-shadow overflow-hidden">
      <div className="aspect-square bg-gray-50 flex items-center justify-center">
        {isImage ? (
          <Image
            src={file.url.replace("\\","/")}
            alt={file.name}
            className="w-full h-full object-cover object-top"
            width={100}
            height={100}
            />
        ) : isVideo ? (
          <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
            <i className="ri-play-circle-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
          </div>
        ) : isAudio ? (
          <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
            <i className="ri-music-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
          </div>
        ) : (
          <i className={`${getFileIcon(file.name)} w-12 h-12 flex items-center justify-center text-gray-400`}></i>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate mb-1">{file.name}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
        </p>
        
        <div className="flex items-center justify-between">
          {(isImage || isVideo || isAudio) && (
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="whitespace-nowrap cursor-pointer">
                  <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-1"></i>
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{file.name}</DialogTitle>
                </DialogHeader>
                {renderPreview()}
              </DialogContent>
            </Dialog>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="whitespace-nowrap ml-auto cursor-pointer">
                <i className="ri-more-2-line w-4 h-4 flex items-center justify-center"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
                <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 cursor-pointer">
                <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
