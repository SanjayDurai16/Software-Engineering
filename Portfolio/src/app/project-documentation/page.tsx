
import DocHeader from './components/DocHeader';
import ProjectOverview from './components/ProjectOverview';
import ArchitectureSection from './components/ArchitectureSection';
import WorkflowSection from './components/WorkflowSection';
import DatabaseSection from './components/DatabaseSection';
import RBACSection from './components/RBACSection';
import PricingSection from './components/PricingSection';
import SEDocumentation from './components/SEDocumentation';
import FutureScope from './components/FutureScope';
import TableOfContents from './components/TableOfContents';
export default function ProjectDocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <DocHeader />

      {/* Hero Banner */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                Semester Project
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border">
                Full-Stack
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border">
                B2B Platform
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Enterprise B2B Vendors Aggregator
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              A procurement platform that replaces fixed-price B2B purchasing with a negotiation-first
              RFQ workflow — built with Node.js, Express, MongoDB, and React.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/SanjayDurai16"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-background text-foreground text-sm font-semibold rounded-full border border-border hover:border-foreground/40 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Back to Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <ProjectOverview />
        <div className="section-divider mb-16" />
        <ArchitectureSection />
        <div className="section-divider mb-16" />
        <WorkflowSection />
        <div className="section-divider mb-16" />
        <DatabaseSection />
        <div className="section-divider mb-16" />
        <RBACSection />
        <div className="section-divider mb-16" />
        <PricingSection />
        <div className="section-divider mb-16" />
        <SEDocumentation />
        <div className="section-divider mb-16" />
        <FutureScope />

        {/* Bottom navigation */}
        <div className="border-t border-border pt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Sanjay Durai</p>
            <p className="text-xs text-muted-foreground">CS Engineering · MIT Chennai · 2027</p>
          </div>
          <div className="flex gap-3">
            <a
              href="mailto:sanjaydurai1612@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Get in Touch
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-background text-foreground text-sm font-semibold rounded-full border border-border hover:border-foreground/40 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Portfolio
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}