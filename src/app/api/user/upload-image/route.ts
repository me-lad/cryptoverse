// 📦 Third-Party imports
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 📦 Internal imports
import UserModel from '~models/User';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

async function deleteUserProfileImage(username: string) {
  const user = await UserModel.model.findOne({ username });
  if (!user || !user.profileImage) return;

  const filename = path.basename(user.profileImage);
  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.warn('File not found or already deleted:', filePath);
  }

  await UserModel.model.updateOne(
    { username },
    { $unset: { profileImage: '' } },
  );
}

export async function POST(req: Request) {
  // Extract file from request
  const formData = await req.formData();
  const img = formData.get('img') as File;
  const username = formData.get('identifier');

  // Check file existence & being the FILE not String
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
  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    // 🔹 Delete old profile image if exists
    await deleteUserProfileImage(username as string);

    await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.promises.writeFile(filePath, buffer);

    // Store only the filename for portability
    await UserModel.model.updateOne({ username }, { profileImage: filename });

    return NextResponse.json(
      { message: 'File uploaded successfully :))' },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
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

    // 🔹 Use the same helper function
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
