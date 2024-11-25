"use client"; // Ensures this component is treated as a client component

import React, { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Editor } from '@tinymce/tinymce-react';
import PageHeader from '@/app/shared/page-header';
import styles from './create-blog.module.css';


const pageHeader = {
    title: 'Create Blog',
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        name: 'Create Blog',
      },
    ],
};

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [docxContent, setDocxContent] = useState<string>('');

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHeaderImage(e.target.files[0]);
    }
  };

  const handleEditorChange = (content: string) => {
    setDocxContent(content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    if (headerImage) {
        formData.append('headerImage', headerImage);
    }
    const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    formData.append('docxFile', blob, 'document.docx');

    try {
        const response = await axios.post('http://localhost:3001/api/blog-posts', formData);
        console.log('Blog post created:', response.data);
    } catch (error) {
        console.error('Error creating blog post:', error);
    }
};

  return (
    <>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Author:
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Header Image:
            <input type="file" accept="image/*" onChange={handleHeaderImageChange} />
          </label>
        </div>
        <div className={styles.formGroup}>
          <Editor
            apiKey="61b4n03tg0tebr1ihm31xs3mo2444qid6uxqd8pwu2vhenz2"
            initialValue="<p>Start writing your blog...</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Create Blog Post</button>
      </form>
    </>
  );
};

export default CreateBlog;
