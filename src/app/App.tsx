import { QRCodeSVG } from 'qrcode.react';
import logo from '../assets/9972ad62b7153604242855c6332bd6666b3eb211.png';
import architectureDiagram from '../assets/f401dbc33754fc13969b1844c2219d8e1f7a3a2d.png';
import homeScreenshot from '../assets/0df32a40104d837a379102d5510bc0c39fe02978.png';
import submissionScreenshot from '../assets/31fdfc909d321a10f53000466673fb97651d5aa4.png';
import approvalScreenshot from '../assets/064bba6c396436e63606cca0b4e67a133b7652f7.png';
import flowchart from '../assets/flowchart.png';

// Design tokens — matched to portfolio.soc.southern.edu color scheme
const C = {
  navy:   '#184f2c',   // primary dark forest green (headings, borders)
  mid:    '#184f2c',   // same — used for dark panel backgrounds
  steel:  '#ced54a',   // lime yellow-green secondary accent
  muted:  '#64748b',   // slate muted text
  text:   '#1a1a2e',   // near-black foreground
  bg:     '#eef7f1',   // very light mint-tinted panel background
  bgAlt:  '#e4f0ea',   // slightly deeper mint alt background
  border: '#e2e8f0',   // light gray border
  accent: '#ced54a',   // lime — checkmarks and highlights
  white:  '#ffffff',
};

// Poster 1800x1350  (48"x36" landscape @ 37.5 px/in)
//
// Jigsaw layout — two 900 px image columns staggered vertically,
// text components packed into the resulting irregular pockets.
//
// LEFT COL (x 0-900)              RIGHT COL (x 900-1800)
// ┌ Arch   900×494  y 0-494  ┐   ┌ Header  900×116  y 0-116   ┐
// │                          │   │ VG 440×128  OS 452×128      │
// │                          │   │             y 124-252       │
// └──────────────────────────┘   └─────────────────────────────┘
// ┌ S1     900×500  y 506-1006┐   ┌ S2  900×500  y 260-760    ┐
// │                           │   └────────────────────────────┘
// │                           │   ┌ S3  900×500  y 772-1272   ┐
// └───────────────────────────┘   │                            │
// ┌ Security 440×252 y 1018   ┐   │                            │
// │ TechStack 452×252         │   └────────────────────────────┘
// └───────────────────────────┘
// ┌ Deploy 1560×66 ──────────────────────────────── QR 232×66  ┐
// └────────────────────────────────────────────────────────────┘
const POSTER_W = 1800;
const POSTER_H = 1350;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Bullet({ text, icon = '•', iconColor = C.steel }: {
  text: string; icon?: string; iconColor?: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
      <span style={{ color: iconColor, flexShrink: 0, lineHeight: 1.45 }}>{icon}</span>
      <span style={{ fontSize: 15, color: C.text, lineHeight: 1.45 }}>{text}</span>
    </div>
  );
}

function TitleRow({ label, caption, light = false }: {
  label: string; caption?: string; light?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginBottom: 6,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: light ? C.white : C.navy, flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </span>
      {caption && (
        <span style={{ fontSize: 13, color: light ? '#a8d5ba' : C.muted, fontStyle: 'italic', lineHeight: 1.3, fontFamily: "'Inter', sans-serif" }}>
          {caption}
        </span>
      )}
    </div>
  );
}

function Panel({ children, style = {} }: {
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      backgroundColor: C.bg,
      borderRadius: 0,
      padding: 12,
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}

function CoverImg({ src, alt, objectPosition = 'top center' }: {
  src: string; alt: string; objectPosition?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition,
        display: 'block',
        borderRadius: 5,
        border: `1px solid ${C.border}`,
      }}
    />
  );
}

// Screenshot image height (user-set). Panel clips any overflow.
const SHOT_IMG_H = 460;

function ScreenshotPanel({ src, alt, title, caption }: {
  src: string; alt: string; title: string; caption?: string;
}) {
  return (
    <Panel style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <TitleRow label={title} caption={caption} />
      <div style={{ height: SHOT_IMG_H, flexShrink: 0, overflow: 'hidden', borderRadius: 5 }}>
        <CoverImg src={src} alt={alt} />
      </div>
    </Panel>
  );
}

/** Absolute section wrapper */
function Sec({ left, top, width, height, children }: {
  left: number; top: number; width: number; height: number; children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'absolute', left, top, width, height, boxSizing: 'border-box' }}>
      {children}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#d4e0d8',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        position: 'relative',
        width: POSTER_W,
        height: POSTER_H,
        backgroundColor: C.white,
        boxShadow: '0 12px 60px rgba(0,0,0,0.30)',
        flexShrink: 0,
        overflow: 'hidden',
      }}>

        {/* ═══ IMAGE COMPONENTS (sizes fixed by user) ═══ */}

        {/* Architecture — left col, top */}
        <Sec left={0} top={115} width={900} height={485}>
          <Panel style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <TitleRow
              label="System Architecture"
              caption="Decoupled frontend &amp; backend via strictly typed OpenAPI interfaces"
            />
            <div style={{ flex: 1, overflow: 'hidden', borderRadius: 5, minHeight: 0 }}>
              <CoverImg src={architectureDiagram} alt="System Architecture Diagram" objectPosition="left top" />
            </div>
          </Panel>
        </Sec>

        

        {/* Screenshot 1 — left col, below Arch */}
        <Sec left={900} top={350} width={900} height={500}>
          <ScreenshotPanel
            src={homeScreenshot}
            alt="Public Showcase"
            title="Public Showcase"
            caption="Public-facing portfolio with search &amp; filtering for students, employers, and prospective students."
          />
        </Sec>

        {/* Screenshot 2 — right col, staggered */}
        <Sec left={0} top={595} width={900} height={500}>
          <ScreenshotPanel
            src={submissionScreenshot}
            alt="Student Portal"
            title="Student Portal"
            caption="Students submit projects with repository links, descriptions, and media attachments."
          />
        </Sec>

        {/* Screenshot 3 — right col, below S2 */}
        <Sec left={900} top={850} width={900} height={500}>
          <ScreenshotPanel
            src={approvalScreenshot}
            alt="Faculty Review"
            title="Faculty Review"
            caption="Secure faculty moderation queue for reviewing and approving student submissions."
          />
        </Sec>

        {/* ═══ TEXT COMPONENTS (resized to fit pockets) ═══ */}

        {/* Header — top-right pocket */}
        <Sec left={0} top={0} width={900} height={116}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            height: '100%',
            paddingLeft: 14,
            borderLeft: `5px solid ${C.mid}`,
            boxSizing: 'border-box',
          }}>
            <img src={logo} alt="School of Computing Logo"
              style={{ height: 80, width: 'auto', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.navy, lineHeight: 1.2 }}>
                Department Portfolio Web App: Centralizing Student Achievements
              </div>
              <div style={{ fontSize: 12, color: C.muted, fontStyle: 'italic', marginTop: 4 }}>
                Bridging the Gap Between Curriculum and Tangible Outcomes
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>
                Tommy Aitchison · Phillip Suvacarov
              </div>
            </div>
          </div>
        </Sec>

        {/* Visibility Gap — top-right, below header */}
        <Sec left={900} top={0} width={400} height={175}>
          <Panel style={{ height: '100%', borderLeft: `4px solid ${C.mid}`, backgroundColor: C.bgAlt }}>
            <TitleRow label="The Visibility Gap" />
            <Bullet text="Incredible capstone &amp; research projects every year" />
            <Bullet text="Work invisible to employers, partners, and prospective students" />
            <Bullet text="Projects isolated on local machines — no central platform" />
          </Panel>
        </Sec>

        {/* Our Solution — top-right, beside VG */}
        <Sec left={900} top={165} width={400} height={190}>
          <Panel style={{ height: '100%', borderLeft: `4px solid ${C.mid}`, backgroundColor: C.bgAlt }}>
            <TitleRow label="Our Solution" />
            <Bullet icon="✓" iconColor={C.mid} text="Centralized, public-facing portfolio for all stakeholders" />
            <Bullet icon="✓" iconColor={C.mid} text="Students showcase code, research, and media in one place" />
            <Bullet icon="✓" iconColor={C.mid} text="Tangible evidence of academic rigor for the department" />
          </Panel>
        </Sec>

        {/* Security & Identity — bottom-left pocket */}
        <Sec left={0} top={1095} width={350} height={255}>
          <Panel style={{ height: '100%', borderLeft: `4px solid ${C.navy}`, backgroundColor: 'rgba(206,213,74,0.10)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, justifyContent: 'space-around' }}>
              {[
                { title: 'AD / LDAP Integration',     desc: 'Campus SSO via Active Directory for seamless login' },
                { title: 'JWT Session Management',    desc: 'Secure, stateless token-based authentication' },
                { title: 'Role-Based Access Control', desc: "Strict boundaries between 'Student' and 'Faculty' roles" },
              ].map(({ title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: C.navy, flexShrink: 0, fontSize: 15, lineHeight: 1.4 }}>✓</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{title}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.3 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </Sec>

        {/* Tech Stack — bottom-left, beside Security */}
        <Sec left={350} top={1095} width={200} height={255}>
          <Panel style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'rgba(206,213,74,0.10)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1, justifyContent: 'space-around' }}>
              {[
                { name: 'React + TypeScript', color: '#61DAFB' },
                { name: 'ASP.NET Core',       color: '#512BD4' },
                { name: 'MariaDB',            color: '#003545' },
                { name: 'Docker',             color: '#2496ED' },
                { name: 'OpenAPI / Swagger',  color: C.steel   },
              ].map(({ name, color }) => (
                <div key={name} style={{
                  backgroundColor: C.white,
                  padding: '6px 12px',
                  borderRadius: 4,
                  borderLeft: `4px solid ${color}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{name}</span>
                </div>
              ))}
            </div>
          </Panel>
        </Sec>

        {/* Deployment & Results — bottom strip */}
        <Sec left={550} top={1095} width={350} height={255}>
          <Panel style={{ height: '100%', borderLeft: `4px solid ${C.navy}`, backgroundColor: 'rgba(206,213,74,0.10)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, justifyContent: 'space-around' }}>
              {[
                'Successfully deployed with Docker containers to SoC development environment',
                'Active Directory authentication bridged to campus network for seamless SSO',
                'Scalable foundation ready for university-wide expansion across departments',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: C.navy, flexShrink: 0, fontSize: 15, lineHeight: 1.4 }}>✓</span>
                  <span style={{ fontSize: 13, color: C.text, lineHeight: 1.4 }}>{text}</span>
                </div>
              ))}
            </div>
          </Panel>
        </Sec>
        {/* Flowchart — pocket below VG + Our Solution, above Screenshot 1 */}
        <Sec left={1290} top={0} width={510} height={355}>
          <Panel style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: C.bgAlt }}>
            <TitleRow label="Process Flow" caption="End-to-end workflow from student submission to public showcase" />
            <div style={{ flex: 1, overflow: 'hidden', borderRadius: 5, minHeight: 0 }}>
              <CoverImg src={flowchart} alt="Process Flowchart" objectPosition="center center" />
            </div>
          </Panel>
        </Sec>

        {/* QR Code — bottom-right */}
        <Sec left={810} top={565} width={180} height={220}>
          <div style={{
            backgroundColor: C.white,
            borderRadius: 10,
            padding: '6px 12px',
            border: `2px solid ${C.navy}`,
            boxShadow: '0 4px 20px rgba(24,79,44,0.20)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            height: '100%',
            boxSizing: 'border-box',
            flexDirection: 'column',
          }}>
            <QRCodeSVG
              value="https://portfolio.soc.southern.edu"
              size={120}
              bgColor={C.white}
              fgColor='#184f2c'
              level="M"
            />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>Scan to Visit</div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 1, textAlign: 'center' }}>portfolio.soc.southern.edu</div>
            </div>
          </div>
        </Sec>

      </div>
    </div>
  );
}