
import "./globals.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from "./context/myContext";
import Provider from "./components/Provider"; 

import { Open_Sans,Inter,Montserrat,Poppins   } from 'next/font/google';



const openSans = Open_Sans({ subsets: ['latin', 'latin-ext', 'cyrillic'] });
const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({ subsets: ['latin', 'latin-ext'],weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });
const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'] });




export const metadata = {
  title: "Virtual Mingle",
  description: "Mingle Virtualy..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Provider>
          <AppProvider>
            {children}
          </AppProvider>
        </Provider>
      </body>
    </html>
  );
}
