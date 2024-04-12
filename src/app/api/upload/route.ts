import { NextRequest, NextResponse } from 'next/server';

import { removeSilence } from '@/functions/ffmpeg';
import fs, { Stats } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { ReadableOptions } from 'stream';

/**
 * Return a stream from the disk
 * @param {string} path - The location of the file
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
function streamFile(
  path: string,
  options?: ReadableOptions
): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on('data', (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk))
      );
      downloadStream.on('end', () => controller.close());
      downloadStream.on('error', (error: NodeJS.ErrnoException) =>
        controller.error(error)
      );
    },
    cancel() {
      downloadStream.destroy();
    }
  });
}
export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const pathIn = '/tmp/audio.mp4';
  const pathOut = pathIn.replace('.mp4', '.wav');
  await writeFile(pathIn, buffer);
  console.log(`open ${pathIn} to see the uploaded file`);
  await removeSilence(pathIn, pathOut);

  const stats: Stats = await fs.promises.stat(pathOut);
  const dataOutput: ReadableStream<Uint8Array> = streamFile(pathOut);
  return new NextResponse(dataOutput, {
    status: 200,
    headers: new Headers({
      'content-disposition': `attachment; filename=${path.basename(pathOut)}`,
      'content-type': 'application/iso',
      'content-length': stats.size + ''
    })
  });

  // const response = new NextResponse(data);
  // response.headers.set('content-type', 'audio/wav');
  // return response;
  // const downloadPath = path.join('', pathOut);
  // const bufferOut = fs.readFileSync(downloadPath);
  //
  // // res.setHeader('Content-Type', 'audio/wav');
  // // res.setHeader('Content-Disposition', `attachment; filename=${file.name}.wav`);
  // const imageBuffer = fs.createReadStream(downloadPath);
  //
  // await new Promise(function (resolve) {
  //   res.setHeader('Content-Type', 'audio/wav');
  //
  //   imageBuffer.pipe(res);
  //   imageBuffer.on('end', resolve);
  // });
}

export async function GET() {
  return new Response('UPLOAD, Next.js!');
}
