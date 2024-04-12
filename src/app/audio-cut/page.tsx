'use client';
import React, { useState } from 'react';

import { siteConfig } from '@/config';

import { ArrowRightIcon } from '@/components/Icons';

import * as S from './styles';

export default function AudioCutPage() {
  const [file, setFile] = useState<File>();
  const [download, setDownload] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      const fileBlob = await res.blob();
      const link = document.createElement('a'); // once we have the file buffer BLOB from the post request we simply need to send a GET request to retrieve the file data
      link.href = window.URL.createObjectURL(fileBlob);
      link.download = file.name;
      link.click();
      link.remove();
      setDownload('Download pronto');
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <main>
      <S.Subtitle>Remover Silencio</S.Subtitle>

      <S.Subtitle>Escolha um áudio.</S.Subtitle>

      <S.Form onSubmit={onSubmit}>
        <S.Input
          type={'file'}
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <S.Button>
          <ArrowRightIcon className="ml-4 text-2xl text-white" />
        </S.Button>
      </S.Form>
      {download && (
        <S.Paragraph>
          <a href={download} download>
            Download
          </a>
        </S.Paragraph>
      )}
    </main>
  );
}
