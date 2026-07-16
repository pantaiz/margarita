import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3969f9',
          borderRadius: 8,
          color: '#f4f4f3',
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        С
      </div>
    ),
    { ...size },
  );
}
