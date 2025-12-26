// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import { Camera } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import { flexBetween, flexCenter, posCenter } from '~styles/tw-custom';
import { errorToast, successToast } from '@/lib/vendors/react-toastify';

// 🧾 Local types
interface PropsT {
  profileImage: string;
  username: string;
}

// ⚙️ Functional component
const UploadProfileImage: React.FC<PropsT> = ({ profileImage, username }) => {
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [uploaderStatus, setUploaderStatus] = useState<'visible' | 'invisible'>(
    'invisible',
  );

  const uploaderRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProgress(0);
    setMessage(null);
    setStatus('idle');
  }, [uploaderStatus]);

  const uploadFile = (file: File) => {
    setMessage(null);
    setStatus('uploading');

    const formData = new FormData();
    formData.append('img', file);
    formData.append('identifier', username);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/user/upload-image');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setProgress(100);
        setStatus('success');
      } else {
        setStatus('error');
      }

      try {
        const res = JSON.parse(xhr.responseText);
        setMessage(res.message || 'Upload failed');
      } catch {
        setMessage('Upload failed');
      }
    };

    xhr.onerror = () => {
      setStatus('error');
      setMessage('Network error. Please try again.');
    };

    xhr.send(formData);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const checkForClickOutside = (e: React.MouseEvent) => {
    if (!uploaderRef.current) return;
    if (!uploaderRef.current.contains(e.target as Node)) {
      setUploaderStatus('invisible');
      if (status === 'success') window.location.reload();
    }
  };

  const deleteHandler = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fetchUrl = `${baseUrl}/api/user/upload-image`;
    const resp = await fetch(fetchUrl, {
      method: 'DELETE',
      body: JSON.stringify({ username }),
    });
    const json = await resp.json();

    if (resp.status >= 200 && resp.status < 300) {
      successToast(json.message, {
        autoClose: 3000,
        onClose: () => window.location.reload(),
      });
    } else {
      errorToast(json.message);
    }
  };

  return (
    <div className={`${flexBetween} flex-col gap-y-5 sm:flex-row`}>
      <div className="flex items-center gap-2.5">
        <div>
          <Camera size={25} />
        </div>
        <div className="flex flex-col">
          <h4 className="text-base font-semibold">Photo</h4>
          <p className="text-sm font-light opacity-75">
            Upload a profile picture to personalize your account and make it
            recognizable
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {profileImage && (
          <>
            <div
              className={`${flexCenter} bg-primary/25 h-[50px] w-[50px] rounded-full`}
            >
              <div className="relative h-11/12 w-11/12 rounded-full">
                <Image
                  className="rounded-full object-cover"
                  src={profileImage}
                  fill
                  alt="Profile image"
                />
              </div>
            </div>

            <Button
              className="!bg-status-error-200 min-w-20 cursor-pointer"
              size="sm"
              variant="destructive"
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </>
        )}

        <Button
          className="min-w-20 cursor-pointer text-white"
          size="sm"
          variant={profileImage ? 'secondary' : 'default'}
          onClick={() => setUploaderStatus('visible')}
        >
          Upload
        </Button>
      </div>

      {/* Uploader */}
      {uploaderStatus === 'visible' && (
        <div
          onClick={checkForClickOutside}
          className="fixed inset-0 z-50 h-screen w-screen bg-[rgba(0,0,0,0.8)]"
        >
          <div
            ref={uploaderRef}
            className={`${posCenter} bg-background-lighter flex h-96 w-[95%] flex-col items-center justify-center rounded-sm px-2.5 pt-8 pb-6 sm:px-6 md:w-[48rem]`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors ${
                dragActive ? 'border-primary bg-primary/10' : 'border-gray-400'
              }`}
            >
              <p className="text-lg font-semibold">
                {dragActive
                  ? 'Drop your file here'
                  : 'Drag & Drop or Click to Upload'}
              </p>
              <p className="mt-2 text-sm font-semibold opacity-70 max-sm:text-center">
                Allowed Types: JPEG, PNG, WebP / Maximum Size: 3MB
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {progress > 0 && (
              <div className="my-4 w-[99%]">
                <div className="relative flex h-6 items-center rounded-[9999px] bg-gray-300">
                  <div
                    className={clsx(
                      'h-6 rounded-[9999px] transition-all',
                      status === 'error'
                        ? 'bg-status-error-200'
                        : status === 'success'
                          ? 'bg-status-success-200'
                          : 'bg-primary',
                    )}
                    style={{ width: `${progress}%` }}
                  ></div>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black">
                    {progress}%
                  </span>
                </div>
              </div>
            )}

            <p
              className={clsx(
                'min-h-[20px] text-center text-sm font-semibold',
                !message && 'invisible',
                status === 'error'
                  ? 'text-status-error-200'
                  : status === 'success'
                    ? 'text-status-success-200'
                    : 'text-foreground',
              )}
            >
              {message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default UploadProfileImage;
