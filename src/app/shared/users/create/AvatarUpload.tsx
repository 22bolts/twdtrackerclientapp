import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';
import Image from 'next/image';

interface AvatarUploadProps {
  setValue: (name: string, value: string) => void;
  setAvatarLink: (link: string) => void; // Change here
  error: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ setValue, setAvatarLink, error }) => {
  const [avatar, setAvatar] = useState<string>('');

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('File uploaded successfully:', response.data);
      setAvatar(URL.createObjectURL(file)); // To preview the uploaded image
      setValue('avatar', response.data.filePath); // Set the file path returned from the server
      setAvatarLink(response.data.filePath); // Corrected line
      console.log('Response retrieved successfully:', response.data.filePath);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false,
    onDrop,
  });

  return (
    <div {...getRootProps()} className="flex items-center justify-center w-32 h-32 border border-gray-300 rounded-lg cursor-pointer">
      <input {...getInputProps()} />
      {avatar ? (
        <Image src={avatar} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <FiUpload className="text-gray-400 w-8 h-8" />
        </div>
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default AvatarUpload;
