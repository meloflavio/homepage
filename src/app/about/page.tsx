import { siteConfig } from '@/config';

import * as S from './styles';

export const metadata = {
  title: 'Sobre mim',
  description: 'Sobre mim',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    title: 'Sobre mim',
    url: '/about',
    description: 'Sobre mim',
    siteName: 'Sobre mim',
    images: [
      {
        url: `${siteConfig.url}/assets/images/image-post.jpeg`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mim',
    description: 'Sobre mim',
    images: [`${siteConfig.url}/assets/images/image-post.jpeg`]
  }
};

export default function AboutPage() {
  return (
    <main>
      <S.Subtitle>Sobre mim</S.Subtitle>

      <S.ImageContainer>
        <S.Image
          src="/assets/images/image-post.jpeg"
          alt="Foto de exemplo"
          fill
        />
      </S.ImageContainer>

      <S.Subtitle>Primeiramente, agradeço por estar aqui.</S.Subtitle>

      <S.Paragraph>Em construção</S.Paragraph>
    </main>
  );
}
