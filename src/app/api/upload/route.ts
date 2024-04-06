import { NextRequest, NextResponse } from 'next/server';

import { removeSilence } from '@/functions/ffmpeg';
import multer from 'multer';

const upload = multer({ dest: '/tmp' }); // Store the uploaded file temporarily in /tmp

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const f = formData.get('file');

  console.log(f);

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  await removeSilence(f);

  return new Response('Hello, Next.js!');
}

export async function GET() {
  return new Response('UPLOAD, Next.js!');
}
