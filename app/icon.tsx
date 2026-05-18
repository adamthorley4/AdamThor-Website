import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#070707',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#C5A05A',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontFamily: 'serif',
          }}
        >
          AT
        </span>
      </div>
    ),
    { ...size }
  );
}
