'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { showError } from '@/lib/toastUtils';

export default function FileUpload({ 
  onFileUpload, 
  acceptedTypes, 
  maxFiles = 10,
  className = ""
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > maxFiles) {
      showError(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    setIsUploading(true);
    onFileUpload(files).finally(() => setIsUploading(false));
  }, [maxFiles, onFileUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > maxFiles) {
      showError(`Maximum ${maxFiles} files allowed`);
      return; 
    }
    
    setIsUploading(true);
    onFileUpload(files).finally(() => setIsUploading(false));
  }, [maxFiles, onFileUpload]);

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
        <Button
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={isUploading}
          className="whitespace-nowrap"
        >
          <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </Button>
        <input
          id="file-upload"
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="flex flex-col items-center space-y-3">
          <i className="ri-upload-cloud-2-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
          <div>
            <p className="text-lg font-medium">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500 mt-1">
              Supports multiple files (max {maxFiles})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
