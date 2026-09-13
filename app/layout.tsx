import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DecoUp — Specification library',
  description:
    'Local, Markdown-backed specifications for DecoUp backend, web and mobile.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
