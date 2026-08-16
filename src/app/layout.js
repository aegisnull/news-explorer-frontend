import AuthProvider from "../components/AuthProvider/AuthProvider";
import "../vendor/fonts.css";
import "./globals.css";

export const metadata = {
  title: "NewsExplorer",
  description:
    "NewsExplorer es un servicio que permite buscar noticias por palabra clave y guardarlas en tu cuenta personal",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
