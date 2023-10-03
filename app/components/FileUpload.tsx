'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  file: FileList;
};

enum STATUS {
  'SAVING' = 'SAVING',
  'SUCCESS' = 'SUCCESS',
  'ERROR' = 'ERROR',
  'PENDING' = 'PENDING',
}

export const FileUpload = () => {
  const [status, setStatus] = useState(STATUS.PENDING);
  const [fileUrl, setFileUrl] = useState('');
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.file[0]) {
      setStatus(STATUS.ERROR);
      return;
    }

    setStatus(STATUS.SAVING);

    const filename = data.file[0].name;

    const res = await fetch(`/api/presigned-url?file=${filename}`);

    const { presignedUrl } = (await res.json()) as { presignedUrl: string };

    const fileUpload = await fetch(presignedUrl, {
      method: 'PUT',
      body: data.file[0],
    });

    if (!fileUpload.ok) {
      setStatus(STATUS.ERROR);
      return;
    }

    setFileUrl(`https://file-upload-s3.s3.amazonaws.com/${filename}`);
    setStatus(STATUS.SUCCESS);
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm m-auto py-10 mt-10 px-10 border rounded-lg drop-shadow-md bg-white text-gray-600 flex flex-col gap-6"
      >
        <h1 className="text-2xl">Next.js File Upload</h1>
        <p className="text-md">
          STATUS: <span className="font-bold">{status}</span>
        </p>
        <div className="">
          <input
            type="file"
            {...register('file')}
            className="w-full text-gray-600 rounded border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 border py-2 px-2"
          />
        </div>
        <div className="">
          <input
            type="submit"
            value="Upload"
            disabled={status === STATUS.SAVING}
            className={`${
              status === STATUS.SAVING ? 'cursor-not-allowed' : ''
            } cursor-pointer px-2.5 py-2 font-medium text-gray-900 bg-white rounded-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600  disabled:text-gray-300`}
          />
        </div>

        {fileUrl.length ? (
          <div className="rounded-md overflow-hidden">
            <Image
              src={fileUrl}
              width={350}
              height={350}
              objectFit="cover"
              alt="Uploaded image"
            />
          </div>
        ) : null}
      </form>
    </section>
  );
};
