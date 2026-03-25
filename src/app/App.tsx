import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import logo from '../assets/9972ad62b7153604242855c6332bd6666b3eb211.png';
import architectureDiagram from '../assets/ArchDiagram.svg';
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
const POSTER_W = 1800;
const POSTER_H = 1350;

// ─── Helpers (Aesthetics Restored) ──────────────────────────────────────────
function Bullet({ text, icon = '•', iconColor = C.mid, fontSize = 17 }: {
  text: string; icon?: string; iconColor?: string; fontSize?: number;
}) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <span style={{ color: iconColor, flexShrink: 0, lineHeight: 1.45, fontSize }}>{icon}</span>
      <span style={{ fontSize, color: C.text, lineHeight: 1.45 }}>{text}</span>
    </div>
  );
}

// RESTORED: helper explicitly sets font and weight to make titles stand out.
function TitleRow({ label, caption, light = false, style = {}, fontSize = 22 }: {
  label: string; caption?: string; light?: boolean; style?: React.CSSProperties; fontSize?: number;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginBottom: 6,
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      <span style={{
        fontSize,
        fontWeight: 700, // Make it bold
        color: light ? C.white : C.navy,
        flexShrink: 0,
        fontFamily: "'Space Grotesk', sans-serif", // Prominent font
        ...style,
      }}>
        {label}
      </span>
      {caption && (
        <span style={{
          fontSize: 17,
          color: light ? '#a8d5ba' : C.muted,
          fontStyle: 'italic',
          lineHeight: 1.3,
          fontFamily: "'Inter', sans-serif"
        }}>
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

function CoverImg({ src, alt, objectPosition = 'top center', withBorder = true }: {
  src: string; alt: string; objectPosition?: string; withBorder?: boolean;
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
        border: withBorder ? `1px solid ${C.border}` : 'none',
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
function Sec({ left, top, width, height, zIndex = 1, children }: {
  left: number; top: number; width: number; height: number; zIndex?: number; children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'absolute', left, top, width, height, zIndex, boxSizing: 'border-box' }}>
      {children}
    </div>
  );
}

// ─── App (Print Layout + Aesthetic Restored) ─────────────────────────────────

export default function App() {
  return (
    /* Outer container: No padding, no gray background for Puppeteer */
    <div style={{
      width: POSTER_W,
      height: POSTER_H,
      backgroundColor: C.white,
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    }}>

      {/* ═══ IMAGE COMPONENTS ═══ */}

      {/* Architecture — left col, top */}
      <Sec left={0} top={115} width={900} height={485} zIndex={20}>
        <Panel style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'visible', padding: 0 }}>
          <div style={{ padding: '12px 12px 0 12px' }}>
            <TitleRow
              label="System Architecture"
              caption="Decoupled frontend &amp; backend via strictly typed OpenAPI interfaces"
            />
          </div>
          <div style={{ flex: 1, overflow: 'visible', borderRadius: 5, minHeight: 0, position: 'relative' }}>
            <div style={{ height: 'calc(100% + 10px)', transform: 'translateY(-10px)', position: 'relative', zIndex: 3 }}>
              <CoverImg src={architectureDiagram} alt="System Architecture Diagram" objectPosition="left top" withBorder={false} />
            </div>
          </div>
        </Panel>
      </Sec>

      {/* Screenshot 1 — left col, below Arch */}
      <Sec left={900} top={350} width={900} height={500}>
        <ScreenshotPanel
          src={homeScreenshot}
          alt="Public Showcase"
          title="Public Showcase"
          caption="Public-facing portfolio with search &amp; filtering options."
        />
      </Sec>

      {/* Screenshot 2 — right col, staggered */}
      <Sec left={0} top={595} width={900} height={510}>
        <ScreenshotPanel
          src={submissionScreenshot}
          alt="Student Portal"
          title="Student Portal"
          caption="Students submit projects with repository links, descriptions, and attachments."
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

      {/* ═══ TEXT COMPONENTS ═══ */}

      {/* Header — top-right pocket */}
      <Sec left={0} top={0} width={900} height={116} zIndex={30}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          height: '100%',
          paddingLeft: 14,
          borderLeft: `5px solid ${C.mid}`,
          boxSizing: 'border-box',
        }}>
          <img src={logo} alt="School of Computing Logo" style={{ height: 80, width: 'auto' }} />
          <div>
            <div style={{ fontSize: 38, fontWeight: 800, color: C.navy, lineHeight: 1.2 }}>
              Department Portfolio Web App
            </div>
            <div style={{ fontSize: 17, color: C.navy, fontStyle: 'italic', marginTop: 4 }}>
              Centralizing Student Achievements
            </div>
            <div style={{ fontSize: 17, color: C.muted, marginTop: 3, display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <span>Tommy Aitchison · Phillip Suvacarov</span>
              <span><span style={{ fontWeight: 600, color: C.navy }}>Advisor:</span> Robert Ordoñez</span>
            </div>
          </div>
        </div>
      </Sec>

      {/* Visibility Gap — top-right, below header */}
      <Sec left={900} top={0} width={400} height={175}>
        <Panel style={{ height: '100%', borderLeft: `4px solid ${C.mid}`, backgroundColor: C.bgAlt, display: 'flex', flexDirection: 'column' }}>
          {/* Defaulting to base weight (700) from helper to make it bold */}
          <TitleRow fontSize={20} label="The Visibility Gap" />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
            <Bullet fontSize={17} text="Impactful student projects produced each semester" />
            <Bullet fontSize={17} text="Work stays invisible to employers and partners" />
            <Bullet fontSize={17} text="No central platform to discover student work" />
          </div>
        </Panel>
      </Sec>

      {/* Our Solution — top-right, beside VG */}
      <Sec left={900} top={165} width={400} height={190}>
        <Panel style={{ height: '100%', borderLeft: `4px solid ${C.mid}`, backgroundColor: C.bgAlt, display: 'flex', flexDirection: 'column' }}>
          <TitleRow fontSize={20} label="Our Solution" />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
            <Bullet fontSize={17} icon="✓" iconColor={C.mid} text="One public portfolio visible to all stakeholders" />
            <Bullet fontSize={17} icon="✓" iconColor={C.mid} text="Students showcase projects, code &amp; media together" />
            <Bullet fontSize={17} icon="✓" iconColor={C.mid} text="Concrete evidence of academic rigor" />
          </div>
        </Panel>
      </Sec>

      {/* Security & Identity — bottom-left pocket */}
      <Sec left={0} top={1105} width={350} height={245}>
        <Panel style={{ height: '100%', borderLeft: `4px solid ${C.navy}`, backgroundColor: 'rgba(206,213,74,0.10)', display: 'flex', flexDirection: 'column' }}>
          <TitleRow label="Security &amp; Identity" />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
            {[
              { title: 'AD / LDAP Integration', desc: 'Campus SSO via Active Directory' },
              { title: 'JWT Session Mgmt', desc: 'Secure, stateless authentication' },
              { title: 'Role-Based Access', desc: 'Strict Student vs Faculty roles' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: C.navy, flexShrink: 0, fontSize: 17 }}>✓</span>
                <div>
                  {/* Bolding specifically to stand out within panel */}
                  <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: C.navy }}>{title}</div>
                  <div style={{ fontSize: 17, color: C.muted, lineHeight: 1.1 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Sec>

      {/* Tech Stack — bottom-left, beside Security */}
      <Sec left={350} top={1105} width={200} height={245}>
        <Panel style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'rgba(206,213,74,0.10)' }}>
          <TitleRow label="Tech Stack" />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
            {[
              { name: 'React + TS', color: '#61DAFB' },
              { name: 'ASP.NET Core', color: '#512BD4' },
              { name: 'MariaDB', color: '#003545' },
              { name: 'Docker', color: '#2496ED' },
            ].map(({ name, color }) => (
              <div key={name} style={{ backgroundColor: C.white, padding: '4px 8px', borderRadius: 4, borderLeft: `4px solid ${color}` }}>
                <span style={{ fontSize: 17, fontWeight: 700 }}>{name}</span>
              </div>
            ))}
          </div>
        </Panel>
      </Sec>

      {/* Deployment & Results — bottom strip */}
      <Sec left={550} top={1105} width={350} height={245}>
        <Panel style={{ height: '100%', borderLeft: `4px solid ${C.navy}`, backgroundColor: 'rgba(206,213,74,0.10)', display: 'flex', flexDirection: 'column' }}>
          {/* RESTORED: Full title to stand out contextually */}
          <TitleRow label="Deployment &amp; Results" />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
            <Bullet fontSize={17} text="Docker containers in SoC dev environment" />
            <Bullet fontSize={17} text="AD authentication bridged to campus network" />
            <Bullet fontSize={17} text="Scalable foundation for university expansion" />
          </div>
        </Panel>
      </Sec>

      {/* Flowchart — pocket */}
      <Sec left={1290} top={0} width={510} height={355}>
        <Panel style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: C.bgAlt }}>
          <TitleRow label="Process Flow" caption="Submission to Showcase" />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <CoverImg src={flowchart} alt="Process Flowchart" objectPosition="center" withBorder={false} />
          </div>
        </Panel>
      </Sec>

      {/* QR Code — bottom-right */}
      <Sec left={805} top={565} width={190} height={220} zIndex={30}>
        <div style={{
          backgroundColor: C.white,
          borderRadius: 10,
          padding: 10,
          border: `2px solid ${C.navy}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
          <QRCodeSVG value="https://portfolio.soc.southern.edu" size={120} fgColor='#184f2c' />
          
          {/* RESTORED: nested structure to include full text details */}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.navy, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
              Scan to Visit
            </div>
            {/* RESTORED: The explicit URL line */}
            <div style={{ fontSize: 16, color: C.muted, marginTop: 1, textAlign: 'center' }}>
              portfolio.soc.southern.edu
            </div>
          </div>
        </div>
      </Sec>
    </div>
  );
}