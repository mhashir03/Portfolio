import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />  
      <Footer />
    </>
  );
}
