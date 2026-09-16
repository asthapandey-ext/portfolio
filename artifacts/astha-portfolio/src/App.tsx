import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from 'lucide-react';

type Project = {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  details: string[];
  repo: string;
  report: string;
  metrics: Metric[];
};

type Metric = {
  label: string;
  value: string;
  percent: number;
};

const projects: Project[] = [
  {
    id: 'rossmann',
    number: '01',
    title: 'Rossmann Sales Forecasting',
    type: 'Forecasting · retail operations',
    description:
      'A time-aware forecasting workflow for store-level sales, turning seasonality, promotions, and store context into a practical planning signal.',
    tags: ['Python', 'Pandas', 'Forecasting'],
    details: [
      'Structured historical sales data around store, date, promotion, and holiday signals.',
      'Explored seasonal movement and store patterns before modelling.',
      'Built a forecasting workflow designed to support operational decisions, not just a score.',
    ],
    repo: 'https://github.com/asthapandey-ext/Rossman_Sales_Forecasting',
    report: '/assets/rossmann-forecast-report.pdf',
    metrics: [
      { label: 'Model R² score', value: '87.4%', percent: 87.4 },
      { label: 'Promotion sales lift', value: '+38.8%', percent: 38.8 },
      { label: 'Top feature importance', value: '62.3%', percent: 62.3 },
    ],
  },
  {
    id: 'amazon',
    number: '02',
    title: 'Amazon Sales Analytics',
    type: 'Business intelligence · e-commerce',
    description:
      'An exploratory sales analysis that follows revenue, product movement, and customer-facing signals from raw records to clear business questions.',
    tags: ['SQL', 'Excel', 'Power BI'],
    details: [
      'Cleaned and shaped transactional information for consistent reporting.',
      'Compared product and category performance to surface useful patterns.',
      'Translated findings into a concise analytical report for decision-makers.',
    ],
    repo: 'https://github.com/asthapandey-ext/Amazon_Sales_Analytics',
    report: '/assets/amazon-sales-report.pdf',
    metrics: [
      { label: 'Core analytical queries', value: '4', percent: 100 },
      { label: 'Price segments', value: '3', percent: 75 },
      { label: 'Dashboard views', value: '3', percent: 75 },
    ],
  },
  {
    id: 'hr',
    number: '03',
    title: 'IBM HR Attrition Analysis',
    type: 'People analytics · diagnostic analysis',
    description:
      'A diagnostic study of what sits behind employee attrition, using structured exploration to separate broad patterns from actionable signals.',
    tags: ['EDA', 'Statistics', 'Tableau'],
    details: [
      'Profiled employee attributes and attrition outcomes across key dimensions.',
      'Used comparative analysis to identify segments worth deeper attention.',
      'Presented the result as a readable story rather than a dense dashboard dump.',
    ],
    repo: 'https://github.com/asthapandey-ext/hr_attrition_analysis',
    report: '/assets/ibm-hr-report.pdf',
    metrics: [
      { label: 'Overall attrition', value: '16.1%', percent: 53.7 },
      { label: 'Overtime attrition', value: '30.5%', percent: 100 },
      { label: 'Employees analyzed', value: '1,470', percent: 73.5 },
    ],
  },
  {
    id: 'upi',
    number: '04',
    title: 'UPI Adoption vs Fraud Risk',
    type: 'Trend analysis · digital payments',
    description:
      'A trend-led investigation into how rapid digital payment adoption relates to fraud risk, balancing growth narratives with responsible interpretation.',
    tags: ['Python', 'Data cleaning', 'Visualisation'],
    details: [
      'Prepared multi-dimensional payment and fraud indicators for comparison.',
      'Read adoption and risk as related trends without overstating causality.',
      'Created an evidence-led narrative around scale, change, and uncertainty.',
    ],
    repo: 'https://github.com/asthapandey-ext/UPI-Adoption-vs.-Fraud-Risk-A-Trend-Analysis',
    report: '/assets/upi-risk-report.pdf',
    metrics: [
      { label: 'Fraud ratio decline', value: '72.7%', percent: 72.7 },
      { label: 'Forecast error (MAPE)', value: '6.6%', percent: 6.6 },
      { label: 'Transaction value growth', value: '300×+', percent: 100 },
    ],
  },
];

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Contact', href: '#contact' },
];

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealNodes.forEach((node) => revealObserver.observe(node));

    const sectionNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.dataset.section ?? 'about');
      },
      { rootMargin: '-28% 0px -62% 0px', threshold: [0, 0.2, 0.5] },
    );
    sectionNodes.forEach((node) => sectionObserver.observe(node));
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <main className="portfolio-shell">
      <header className="nav-shell">
        <div className="wrap nav-inner">
          <a className="wordmark" href="#top" onClick={closeMobile} data-testid="link-home">
            <span className="wordmark-mark">AP</span>
            <span>Astha Pandey</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                href={item.href}
                key={item.href}
                className={activeSection === item.href.slice(1) ? 'active' : ''}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <a className="nav-resume" href="/assets/Astha_Pandey_Resume.docx" download data-testid="link-resume-nav">
              <Download size={14} /> Resume
            </a>
          </nav>
          <button
            className="mobile-toggle"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`wrap mobile-nav ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMobile} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
          <a href="/assets/Astha_Pandey_Resume.docx" download onClick={closeMobile} data-testid="link-resume-mobile">
            Download resume
          </a>
        </div>
      </header>

      <section className="hero wrap" id="top">
        <div className="hero-layout">
          <div>
            <div className="hero-kicker eyebrow reveal" data-testid="text-availability">
              Data analyst · remote · hybrid · onsite
            </div>
            <h1 className="hero-title reveal delay-1" data-testid="heading-hero">
              <span className="line">Making</span>
              <span className="line serif">sense</span>
              <span className="line">of signals.</span>
            </h1>
            <p className="hero-lede reveal delay-2" data-testid="text-hero-intro">
              I&apos;m Astha — a data analyst building clear, useful stories from messy
              information. Currently expanding into data science and AI/ML.
            </p>
            <div className="hero-actions reveal delay-3">
              <a className="button-primary" href="#work" data-testid="link-see-work">
                See selected work <ArrowDownRight size={16} />
              </a>
              <a className="button-quiet" href="mailto:asthapandeylinkdin@gmail.com" data-testid="link-email-hero">
                Get in touch <Mail size={15} />
              </a>
            </div>
            <div className="hero-meta reveal delay-3">
              <div><span className="mono">AVAILABILITY</span><strong>Remote · Hybrid · Onsite</strong></div>
              <div><span className="mono">FOCUS</span><strong>Evidence over noise</strong></div>
            </div>
          </div>
          <figure className="portrait-banner reveal delay-2" data-testid="figure-portrait">
            <img className="portrait" src="/assets/astha-portrait.jpeg" alt="Astha Pandey working at her desk" />
            <figcaption className="portrait-caption">
              <span className="mono">A quiet observer of patterns · India</span>
              <span className="mono">2026</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section wrap" id="about" data-section="about">
        <div className="section-rule reveal" />
        <div className="intro-grid" style={{ paddingTop: '34px' }}>
          <div className="eyebrow reveal">01 / About the work</div>
          <div>
            <p className="intro-copy reveal delay-1" data-testid="text-about">
              Good analysis leaves people with a better question — and a more confident
              next step. I work across <span className="serif">cleaning, exploration, visualisation,</span> and
              forecasting to make that step visible.
            </p>
            <div className="intro-aside reveal delay-2">
              <p>
                My approach is curious but grounded: understand the context, test the shape of the data,
                communicate what it can and cannot say.
              </p>
              <div className="location-line"><MapPin size={13} /> India · available for remote, hybrid, and onsite roles</div>
              <a className="email-line" href="mailto:asthapandeylinkdin@gmail.com"><Mail size={13} /> asthapandeylinkdin@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap" id="work" data-section="work">
        <div className="section-rule reveal" />
        <div className="work-header" style={{ paddingTop: '34px' }}>
          <div>
            <div className="eyebrow reveal">02 / Selected work</div>
            <h2 className="section-heading reveal delay-1" data-testid="heading-work">Questions before <em>charts.</em></h2>
          </div>
          <p className="work-note reveal delay-2">Four studies across retail, people, payments, and digital commerce.</p>
        </div>
        <div className="project-list" data-testid="list-projects">
          {projects.map((project) => (
            <button
              type="button"
              className="project-row reveal"
              key={project.id}
              onClick={() => setSelectedProject(project)}
              data-testid={`button-project-${project.id}`}
              aria-label={`Read more about ${project.title}`}
            >
              <span className="project-index">{project.number}</span>
              <span>
                <span className="project-title">{project.title}</span>
                <span className="project-tags">
                  {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </span>
              </span>
              <span className="project-type">{project.type}</span>
              <span className="project-signal" aria-hidden="true">
                {project.metrics.map((metric) => <span key={metric.label} style={{ height: `${Math.max(18, metric.percent)}%` }} />)}
              </span>
              <ChevronRight className="project-arrow" size={19} />
            </button>
          ))}
        </div>
      </section>

      <section className="section split-band" id="toolkit" data-section="toolkit">
        <div className="wrap split-grid">
          <div>
            <div className="eyebrow reveal">03 / Toolkit</div>
            <p className="skill-statement reveal delay-1" data-testid="text-toolkit-statement">
              The tools are practical. The thinking is <em>the point.</em>
            </p>
          </div>
          <div className="skill-columns reveal delay-2" data-testid="list-skills">
            <div className="skill-group"><h3>Analysis</h3><p>Statistics<br />Data cleaning<br />Exploratory analysis<br />Business thinking</p></div>
            <div className="skill-group"><h3>Languages</h3><p>Python<br />SQL<br />Excel</p></div>
            <div className="skill-group"><h3>Libraries</h3><p>Pandas<br />NumPy<br />scikit-learn</p></div>
            <div className="skill-group"><h3>Communication</h3><p>Power BI<br />Tableau<br />Dashboards &amp; narrative</p></div>
          </div>
        </div>
      </section>

      <section className="section wrap" id="approach">
        <div className="section-rule reveal" />
        <div className="process-grid" style={{ paddingTop: '34px' }}>
          <div>
            <div className="eyebrow reveal">04 / Working principles</div>
            <p className="process-intro reveal delay-1">A simple rhythm for moving from ambiguity to something another person can use.</p>
          </div>
          <div className="principles">
            <article className="principle reveal"><span className="principle-num">01</span><div><h3>Start with the decision</h3><p>Before opening a notebook, make the question specific enough to change an outcome.</p></div></article>
            <article className="principle reveal delay-1"><span className="principle-num">02</span><div><h3>Respect the raw material</h3><p>Clean data is not a cosmetic step. It is where assumptions become visible.</p></div></article>
            <article className="principle reveal delay-2"><span className="principle-num">03</span><div><h3>Make the conclusion portable</h3><p>A strong analysis should still make sense when you are not in the room to explain it.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section contact-section wrap" id="contact" data-section="contact">
        <div className="section-rule reveal" />
        <div className="contact-box">
          <div>
            <div className="eyebrow reveal" style={{ paddingTop: '34px' }}>05 / Contact</div>
            <h2 className="contact-title reveal delay-1" data-testid="heading-contact">Let&apos;s find<br /><em>the signal.</em></h2>
          </div>
          <div className="reveal delay-2">
            <p className="contact-copy">Have a dataset, a question, or a problem that deserves a closer look? I&apos;d like to hear about it.</p>
            <a className="contact-email" href="mailto:asthapandeylinkdin@gmail.com">asthapandeylinkdin@gmail.com</a>
            <a className="button-primary" href="mailto:asthapandeylinkdin@gmail.com" data-testid="link-email-contact">
              Start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <footer className="footer-line">
          <span>© 2026 Astha Pandey · Data analyst</span>
          <div className="social-links">
            <a href="https://github.com/asthapandey-ext" target="_blank" rel="noreferrer" data-testid="link-github-footer"><Github size={16} /> <span className="sr-only">GitHub</span></a>
            <a href="https://www.linkedin.com/in/astha-pandey-821a603a0/" target="_blank" rel="noreferrer" data-testid="link-linkedin-footer"><Linkedin size={16} /> <span className="sr-only">LinkedIn</span></a>
            <a href="/assets/Astha_Pandey_Resume.docx" download data-testid="link-resume-footer"><Download size={16} /> <span className="sr-only">Download resume</span></a>
          </div>
        </footer>
      </section>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
            data-testid="dialog-project-detail"
          >
            <button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details" data-testid="button-close-project">
              <X size={20} />
            </button>
            <span className="modal-project-id">{selectedProject.number} / CASE STUDY</span>
            <h2 className="modal-title" id="project-modal-title">{selectedProject.title}</h2>
            <p className="modal-description">{selectedProject.description}</p>
            <div className="performance-panel" data-testid={`graph-performance-${selectedProject.id}`}>
              <div className="performance-heading">
                <span className="mono">PROJECT PERFORMANCE</span>
                <BarChart3 size={16} />
              </div>
              <div className="performance-chart">
                {selectedProject.metrics.map((metric) => (
                  <div className="metric-row" key={metric.label}>
                    <div className="metric-label"><span>{metric.label}</span><strong>{metric.value}</strong></div>
                    <div className="metric-track"><span style={{ width: `${metric.percent}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-list">
              {selectedProject.details.map((detail) => <div key={detail}><Check size={15} /><span>{detail}</span></div>)}
            </div>
            <div className="modal-actions">
              <a className="button-primary" href={selectedProject.repo} target="_blank" rel="noreferrer" data-testid={`link-repo-${selectedProject.id}`}>
                View repository <Github size={15} />
              </a>
              <a className="button-quiet" href={selectedProject.report} target="_blank" rel="noreferrer" data-testid={`link-report-${selectedProject.id}`}>
                Open project brief <BarChart3 size={15} />
              </a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Home;