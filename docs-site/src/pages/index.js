import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  return (
    <Layout
      title="Catalyst Processing"
      description="Документация системы обработки научных публикаций"
    >
      <main
        style={{
          minHeight: 'calc(100vh - 60px)',
          background: 'linear-gradient(135deg, #2f6b4f 0%, #4f8f67 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{maxWidth: '900px'}}>
          <h1 style={{fontSize: '64px', marginBottom: '24px'}}>
            Catalyst Processing
          </h1>

          <p style={{fontSize: '24px', lineHeight: 1.5, marginBottom: '40px'}}>
            Техническая документация системы обработки научных публикаций,
            извлечения данных о катализаторах и формирования карточек синтеза.
          </p>

          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link
              to={useBaseUrl('/docs/intro')}
              style={{
                background: 'white',
                color: '#2f6b4f',
                padding: '14px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Открыть документацию
            </Link>

            <Link
              to={useBaseUrl('/docs/product/stakeholders')}
              style={{
                color: 'white',
                border: '2px solid white',
                padding: '14px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Сбор требований
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
