import NextImage from 'next/image';

import tw from 'tailwind-styled-components';

export const Title = tw.h1`
  mb-6
  text-3xl
  font-bold
`;

export const Subtitle = tw.strong`
  mb-4
  block
  text-xl
  font-bold
  leading-relaxed
`;

export const Paragraph = tw.p`
  mb-2
  text-xl
  font-normal
  leading-relaxed
`;

export const ImageContainer = tw.div`
  relative
  h-96
  w-full
`;

export const Image = tw(NextImage)`
  rounded-xl
  object-cover
  object-center
`;

export const Form = tw.form`
  mt-16 
  flex 
  gap-3
`;
export const Input = tw.input`
  h-12 
  w-[450px] 
  rounded-md 
  border-none 
  bg-[#202024] 
  p-0 
  px-3 
  text-base 
  text-white 
  focus:outline-none 
  focus:ring-2 
  focus:ring-[#8257e5]
`;
export const Button = tw.button`
  h-12
  w-12
  cursor-pointer
  rounded-md 
  border-none 
  bg-[#8257e5] 
  transition-colors 
  duration-200 
  hover:bg-[#633bbc]
`;
