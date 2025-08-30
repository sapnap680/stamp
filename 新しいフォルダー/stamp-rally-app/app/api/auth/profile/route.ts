import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    // プロフィール情報を取得
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (profileResponse.ok) {
      const profile = await profileResponse.json();
      return NextResponse.json({
        success: true,
        profile: profile,
      });
    } else {
      console.error('Profile response:', await profileResponse.text());
      return NextResponse.json({
        success: false,
        error: 'Failed to get profile',
      });
    }
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    });
  }
}

