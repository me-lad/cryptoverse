import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function GET(req: Request) {
  // Extract filename from the request URL
  const url = new URL(req.url);
  const filename = url.pathname.split('/').pop();

  if (!filename) {
    return NextResponse.json({ message: 'Filename required' }, { status: 400 });
  }

  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
  } catch {
    return NextResponse.json({ message: 'File not found' }, { status: 404 });
  }

  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  const fileBuffer = await fs.promises.readFile(filePath);

  return new Response(new Uint8Array(fileBuffer), {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
