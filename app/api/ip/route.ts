import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Extracting the client IP address from request headers (typically 'x-forwarded-for')
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const ip = xForwardedFor ? xForwardedFor.split(',')[0] : 'IP not available';

  return NextResponse.json({ ip });
}
