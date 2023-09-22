import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className=" relative flex w-full h-screen flex-col">
      <Header />
      <main className="flex items-center justify-center h-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
