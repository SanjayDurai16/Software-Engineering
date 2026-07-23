
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import GitHubSection from './components/GitHubSection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <HeroSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <AboutSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <SkillsSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <ProjectsSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <GitHubSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <ContactSection />
      <Footer />
    </main>
  );
}