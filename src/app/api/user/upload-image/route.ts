// 📦 Third-Party imports
import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import path from 'path';

// 📦 Internal imports
import UserModel from '~models/User';
import { connectToDB } from '~vendors/mongoose';

// 🔹 Helper: delete old profile image from Blob
async function deleteUserProfileImage(username: string) {
  const user = await UserModel.model.findOne({ username });
  if (!user || !user.profileImage) return;

  try {
    await del(user.profileImage, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (err) {
    console.warn('Blob delete failed or not found:', user.profileImage);
  }

  await UserModel.model.updateOne(
    { username },
    { $unset: { profileImage: '' } },
  );
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const img = formData.get('img') as File;
  const username = formData.get('identifier');

  if (!img || !img.name || !username) {
    return NextResponse.json(
      { message: 'Please send required data.' },
      { status: 400 },
    );
  }

  // File validation
  const MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE = 3 * 1024 * 1024;

  if (!MIME_TYPES.includes(img.type)) {
    return NextResponse.json(
      { message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
      { status: 400 },
    );
  }

  if (img.size > MAX_SIZE) {
    return NextResponse.json(
      { message: 'File too large. Max size is 3 MB.' },
      { status: 400 },
    );
  }

  // Upload process
  const buffer = Buffer.from(await img.arrayBuffer());
  const safeName = path.basename(img.name).replace(/\s+/g, '_');
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;

  try {
    // 🔹 Delete old profile image if exists
    await deleteUserProfileImage(username as string);

    // 🔹 Upload to Vercel Blob
    const { url } = await put(filename, buffer, {
      access: 'public',
      contentType: img.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      cacheControlMaxAge: 31536000,
    });

    // Store Blob URL in DB
    await connectToDB();
    await UserModel.model.init();
    await UserModel.model.updateOne({ username }, { profileImage: url });

    return NextResponse.json(
      { message: 'File uploaded successfully :))', url },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { message: 'Username is required.' },
        { status: 400 },
      );
    }

    await deleteUserProfileImage(username);

    return NextResponse.json(
      { message: 'Profile image deleted successfully.' },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
