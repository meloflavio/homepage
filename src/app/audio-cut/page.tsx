import { siteConfig } from '@/config';

import { ArrowRightIcon } from '@/components/Icons';

import * as S from './styles';

export const metadata = {
  title: 'Sobre mim',
  description: 'Sobre mim',
  metadataBase: new URL(siteConfig.url)
};

export default function AudioCutPage() {
  return (
    <main>
      <S.Subtitle>Remover Silencio</S.Subtitle>

      <S.Subtitle>Escolha um áudio.</S.Subtitle>

      <S.Form action="/api/upload" method="post" encType="multipart/form-data">
        <S.Input type={'file'} name="file" />
        <S.Button>
          <ArrowRightIcon className="ml-4 text-2xl text-white" />
        </S.Button>
      </S.Form>
    </main>
  );
}
