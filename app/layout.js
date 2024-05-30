import { Inter} from "next/font/google";
import "./globals.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from "./context/myContext";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Virtual Mingle",
  description: "Mingle Virtualy..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
        </body>
    </html>
  );
}
