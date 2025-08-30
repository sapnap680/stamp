import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, state } = await request.json();

    // アクセストークンを取得
    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_LINE_LOGIN_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID!,
        client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET!,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      return NextResponse.json({
        success: true,
        accessToken: tokenData.access_token,
      });
    } else {
      console.error('Token response:', tokenData);
      return NextResponse.json({
        success: false,
        error: 'Failed to get access token',
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    });
  }
}

