import { ImageResponse } from 'next/og';

export const alt = 'Свитич Маргарита — Продуктовый дизайнер';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f4f4f3',
          color: '#3969f9',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 600, marginBottom: 16 }}>
          Свитич Маргарита
        </div>
        <div style={{ fontSize: 36 }}>Продуктовый дизайнер</div>
      </div>
    ),
    { ...size },
  );
}
