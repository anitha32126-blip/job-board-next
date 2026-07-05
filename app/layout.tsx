import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import ApolloProviderWrapper from "../lib/apollo-provider";
import AuthSessionProvider from "../lib/session-provider";
export const metadata: Metadata = {
  title: "Job Board",
  description: "Find your dream job",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
  <AuthSessionProvider>
    <ApolloProviderWrapper>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProviderWrapper>
  </AuthSessionProvider>
</body>
    </html>
  );
}