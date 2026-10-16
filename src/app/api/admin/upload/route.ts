import { issueSignedToken } from '@vercel/blob';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin/auth';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Issues short-lived presigned upload URLs so the admin panel can upload images
 * directly from the browser to Vercel Blob (avoids the serverless request-size
 * limit). Works with OIDC-connected Blob stores (BLOB_STORE_ID) and read-write tokens.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadPresignedBody;

  try {
    const result = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        if (!(await isAdmin())) throw new Error('Not authorised — please log in again.');
        if (!pathname.startsWith('uploads/')) throw new Error('Invalid upload path.');
        const validUntil = Date.now() + 10 * 60 * 1000;
        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: MAX_BYTES,
          validUntil,
        });
        return {
          token,
          urlOptions: {
            allowedContentTypes: ALLOWED_TYPES,
            maximumSizeInBytes: MAX_BYTES,
            validUntil,
            addRandomSuffix: true,
            allowOverwrite: false,
          },
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    console.error('[admin upload]', message);
    return NextResponse.json({ error: message }, { status: message.startsWith('Not authorised') ? 401 : 400 });
  }
}
