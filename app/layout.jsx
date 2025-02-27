// RootLayout.js (Server Component)
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@components/Nav";
import ClientWrapper from "./ClientWrapper.jsx";

import "@styles/globals.css";
export const metadata = {
  title: "Dern security",
  description:"an excellent security company that promises it best services just for you"
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClerkProvider>
          <Nav />
          <ClientWrapper>{children}</ClientWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
