// This file controls the order of the homepage sections.
// Edit content/camp.ts to change the information displayed on the website.
import Header from "../components/Header";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Registration from "../components/Registration";
import Footer from "../components/Footer";
import PageEffects from "../components/PageEffects";
import Chatbot from "../components/Chatbot";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Programs />
        <Registration />
      </main>
      <Footer />
      <PageEffects />
      <Chatbot />
    </>
  );
}
