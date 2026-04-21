'use client';

import { AuthProvider } from '../context/AuthContext';

export function ClientWrapper({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
