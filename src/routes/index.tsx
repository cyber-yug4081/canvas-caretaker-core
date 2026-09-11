import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Globe2,
  HeartPulse,
  Leaf,
  MapPin,
  Mic,
  Paperclip,
  Pill,
  Search,
  Send,
  Square,
  Stethoscope,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { findAnswer, NOT_TRAINED, type Answer } from "../lib/charak-knowledge";
import { medicines, diseases, splitList } from "../lib/medical-data";

const BACKGROUND_IMAGE_URL =
  "https://res.cloudinary.com/qfs26zk0/image/upload/v1789058036/ChatGPT_Image_Sep_10_2026_10_01_27_PM.png";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        href: BACKGROUND_IMAGE_URL,
      },
    ],
    meta: [
      { title: "Sudha Setu | Ayurvedic Health Guidance" },
      {
        name: "description",
        content:
          "Explore Ayurvedic guidance, hospitals, medicines, symptoms, and Charak Vaani voice consultation.",
      },
      { property: "og:title", content: "Sudha Setu | Ayurvedic Health Guidance" },
      {
        property: "og:description",
        content: "Ancient wisdom and modern care through Ayurvedic guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type View = "home" | "hospitals" | "diseases" | "medicines" | "chat";

const hospitals = [
  [
    "All India Institute of Ayurveda",
    "New Delhi, Delhi",
    "Government Ayurveda Hospital",
    "2.3 km",
    ["General Ayurveda", "Panchakarma", "Research"],
    "Mathura Road, Gautampuri, Sarita Vihar, New Delhi 110076",
    "+91 11 2963 7500",
    "Open 24 hours · OPD 8:00 AM – 2:00 PM",
  ],
  [
    "National Institute of Ayurveda",
    "Jaipur, Rajasthan",
    "Premier Ayurveda Institute",
    "4.7 km",
    ["Panchakarma", "Kayachikitsa", "Education"],
    "Amer Road, Jorawar Singh Gate, Jaipur 302002",
    "+91 141 263 5709",
    "Open 24 hours · OPD 8:00 AM – 1:00 PM",
  ],
  [
    "State Ayurveda Hospital",
    "Lucknow, Uttar Pradesh",
    "Government Ayurveda Center",
    "6.1 km",
    ["General Treatment", "Herbal Therapy", "Outpatient"],
    "Tulsi Das Marg, Lucknow 226001",
    "+91 522 261 4321",
    "OPD 9:00 AM – 4:00 PM",
  ],
  [
    "Kerala Ayurveda Hospital",
    "Thiruvananthapuram, Kerala",
    "Traditional Kerala Ayurveda Care",
    "8.4 km",
    ["Panchakarma", "Rejuvenation", "Wellness Retreat"],
    "Poojappura, Thiruvananthapuram 695012",
    "+91 471 234 5566",
    "Open 24 hours · Therapy 7:00 AM – 6:00 PM",
  ],
  [
    "Sri Sri Ayurveda Hospital",
    "Bengaluru, Karnataka",
    "Holistic Healing & Wellness",
    "10.2 km",
    ["Lifestyle Disorders", "Panchakarma", "Yoga & Wellness"],
    "Art of Living Ashram, Kanakapura Road, Bengaluru 560082",
    "+91 80 6726 2626",
    "OPD 8:00 AM – 7:00 PM",
  ],
] as const;

function ActionButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`action-button ${className}`} {...props}>
      {children}
    </button>
  );
}

function Brand({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <header className={`brandbar ${view === "home" ? "home-brandbar" : "inner-brandbar"}`}>
      <div className="brandbar-left">
        {view !== "home" && (
          <ActionButton
            id="top-back-btn"
            className="back-button"
            onClick={() => setView("home")}
            aria-label="Back to home"
            title="Back to Home"
          >
            <ArrowLeft />
          </ActionButton>
        )}
        <ActionButton
          id="brand-logo-btn"
          className={`brand ${view !== "home" ? "brand-logo-only" : ""}`}
          onClick={() => setView("home")}
          aria-label="Sudha Setu home"
        >
          <img
            src="https://res.cloudinary.com/dbge8xram/image/upload/v1789054782/imggg_v3wkpx.jpg"
            alt="Sudha Setu"
            className="brand-logo-img"
            referrerPolicy="no-referrer"
          />
          {view === "home" && (
            <span className="brand-text-container">
              <strong className="brand-title-emblem" aria-label="SUDHA SETU">
                <span className="brand-word">
                  <span className="brand-char">S</span>
                  <span className="brand-char">U</span>
                  <span className="brand-char">D</span>
                  <span className="brand-char">H</span>
                  <span className="brand-char brand-char-accent">A</span>
                </span>
                <span className="brand-word-spacer" aria-hidden="true" />
                <span className="brand-word">
                  <span className="brand-char">S</span>
                  <span className="brand-char">E</span>
                  <span className="brand-char brand-char-accent">T</span>
                  <span className="brand-char">U</span>
                </span>
              </strong>
              <span className="brand-tagline-wrap">
                <span className="tagline-tapered-line left" aria-hidden="true" />
                <small className="brand-tagline">~by Team ALIC</small>
                <span className="tagline-tapered-line right" aria-hidden="true" />
              </span>
            </span>
          )}
        </ActionButton>
      </div>
      <nav aria-label="Main navigation">
        {(["home", "hospitals", "diseases", "medicines"] as View[]).map((item) => (
          <ActionButton
            key={item}
            className={view === item ? "nav-active" : ""}
            onClick={() => setView(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </ActionButton>
        ))}
      </nav>
    </header>
  );
}

function HomeScreen({ setView }: { setView: (view: View) => void }) {
  return (
    <main className="home-stage">
      <section className="home-copy">
        <p className="home-kicker">
          Ayurveda <span>×</span> Technology <span>×</span> A Healthier Tomorrow
        </p>
        <h1 id="home-main-heading">
          <span className="sanskrit-lead">सर्वे सन्तु</span>
          <br />
          <em>निरामयाः</em>
        </h1>
        <p className="home-intro">
          Bridging Ayurveda and Technology
          <br />
          for a healthier tomorrow.
        </p>
        <ActionButton className="home-cta" onClick={() => setView("chat")}>
          <Leaf />
          <span>Charak Vaani</span>
          <ArrowRight />
        </ActionButton>
      </section>
    </main>
  );
}

function LeafAvatar({ user = false }: { user?: boolean }) {
  return <span className="avatar">{user ? <CircleUserRound /> : <Leaf />}</span>;
}

function Composer({ onSend }: { onSend?: (value: string) => void }) {
  const [value, setValue] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  };
  return (
    <form className="composer" onSubmit={submit}>
      <Paperclip aria-hidden="true" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
        aria-label="Message"
      />
      <ActionButton type="button" className="icon-button" aria-label="Use microphone">
        <Mic />
      </ActionButton>
      <ActionButton type="submit" className="send-button" aria-label="Send message">
        <Send />
      </ActionButton>
    </form>
  );
}

type Msg = { role: "user" | "ai"; text?: string; answer?: Answer; time: string };
const clockTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function AnswerBubble({ answer }: { answer: Answer }) {
  return (
    <>
      <strong>Namaste! 🙏</strong>
      <p>{answer.doctor}</p>
      <p>
        <b>Possible causes:</b> {answer.causes}
      </p>
      <p>
        <b>{answer.cureTitle}:</b>
      </p>
      <ul>
        {answer.cure.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p>
        <b>Red flags:</b> {answer.redFlags}
      </p>
      <p>
        <b>Threat Level:</b> {answer.threat}
      </p>
    </>
  );
}

interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function ConsultScreen() {
  const [mode, setMode] = useState<"talk" | "chat">("chat");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const chatStreamRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Namaste! 🙏 Main Charak Vaani hoon. Apni takleef bolkar ya likhkar bataiye.",
      time: "10:12 AM",
    },
  ]);

  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTo({
        top: chatStreamRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const ask = (text: string) => {
    const match = findAnswer(text);
    setMessages((old) => [
      ...old,
      { role: "user", text, time: clockTime() },
      match
        ? { role: "ai", answer: match, time: clockTime() }
        : { role: "ai", text: NOT_TRAINED, time: clockTime() },
    ]);
  };

  const toggleListening = () => {
    const win =
      typeof window !== "undefined"
        ? (window as unknown as {
            SpeechRecognition?: SpeechRecognitionConstructor;
            webkitSpeechRecognition?: SpeechRecognitionConstructor;
          })
        : undefined;
    const SR = win?.SpeechRecognition || win?.webkitSpeechRecognition;
    if (!SR) {
      setListening(false);
      ask("Voice input is not supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SR();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const said = event.results[0]?.[0]?.transcript;
      if (said) ask(said);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <main className="chat-layout screen-stage">
      <section className="glass-panel chat-panel consult-panel">
        <div className="screen-title consult-head">
          <Leaf />
          <h1>Charak Vaani</h1>
          <p>Talk or chat with your Ayurvedic companion.</p>
        </div>
        <div className="mode-toggle" role="tablist">
          <ActionButton
            className={mode === "talk" ? "mode-active" : ""}
            role="tab"
            aria-selected={mode === "talk"}
            onClick={() => setMode("talk")}
          >
            <Mic /> Talk
          </ActionButton>
          <ActionButton
            className={mode === "chat" ? "mode-active" : ""}
            role="tab"
            aria-selected={mode === "chat"}
            onClick={() => setMode("chat")}
          >
            <Send /> Chat
          </ActionButton>
        </div>
        {mode === "talk" && (
          <div className="talk-block">
            <div className={`voice-orb-wrap ${listening ? "is-listening" : ""}`}>
              <div className="waveform left" aria-hidden="true" />
              <ActionButton
                className="voice-orb"
                onClick={toggleListening}
                aria-label={listening ? "Stop listening" : "Start listening"}
              >
                {listening ? <Square /> : <Mic />}
              </ActionButton>
              <div className="waveform" aria-hidden="true" />
            </div>
            <strong className="tap-label">{listening ? "Tap to Stop" : "Tap to Speak"}</strong>
            <small className="listening-label">{listening ? "Listening..." : "Ready"}</small>
            <label className="select-pill">
              <Globe2 />
              <select aria-label="Language">
                <option>Auto-detect language (English)</option>
                <option>हिन्दी (Hindi)</option>
              </select>
              <ChevronDown />
            </label>
          </div>
        )}
        <div className="chat-stream" ref={chatStreamRef}>
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div className="message-row user" key={i}>
                <div className="message-bubble">
                  <p>{m.text}</p>
                  <time>{m.time}</time>
                </div>
                <LeafAvatar user />
              </div>
            ) : (
              <div className="message-row" key={i}>
                <LeafAvatar />
                <div className="message-bubble ai">
                  {m.answer ? <AnswerBubble answer={m.answer} /> : <p>{m.text}</p>}
                  <time>{m.time}</time>
                </div>
              </div>
            ),
          )}
        </div>
        <Composer onSend={ask} />
      </section>
    </main>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  const items = splitList(value);
  return (
    <div className="detail-block">
      <h3>{label}</h3>
      {items.length > 1 ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{items[0] ?? "—"}</p>
      )}
    </div>
  );
}

function HospitalsScreen() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Cities");
  const [open, setOpen] = useState(-1);
  const filtered = hospitals.filter(
    (h) =>
      (h[0] + h[1] + h[2]).toLowerCase().includes(query.toLowerCase()) &&
      (city === "All Cities" || h[1].includes(city)),
  );
  return (
    <main className="hospitals-layout diseases-layout screen-stage">
      <section className="glass-panel disease-panel hospital-panel">
        <div className="screen-title disease-title">
          <Leaf />
          <div>
            <h1>Ayurveda Hospitals</h1>
            <p>Find trusted Ayurveda hospitals and wellness centers near you.</p>
          </div>
        </div>
        <div className="search-row">
          <label className="searchbox">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, city or specialty..."
            />
          </label>
          <label className="citybox">
            <MapPin />
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option>All Cities</option>
              <option>Delhi</option>
              <option>Jaipur</option>
              <option>Lucknow</option>
              <option>Kerala</option>
              <option>Bengaluru</option>
            </select>
            <ChevronDown />
          </label>
        </div>
        <div className="condition-list">
          {filtered.map((h, i) => (
            <article className={`condition ${open === i ? "expanded" : ""}`} key={h[0]}>
              <ActionButton
                className="condition-head"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{i + 1}</span>
                <b>
                  <Stethoscope />
                </b>
                <div>
                  <h2>{h[0]}</h2>
                  <p>
                    {h[1]} · {h[2]}
                  </p>
                </div>
                <small>{h[3]}</small>
                <ChevronDown />
              </ActionButton>
              {open === i && (
                <div className="detail-grid">
                  <DetailBlock label="Address" value={h[5]} />
                  <DetailBlock label="Contact" value={h[6]} />
                  <DetailBlock label="Timings" value={h[7]} />
                  <DetailBlock label="Specialties" value={h[4].join("; ")} />
                  <DetailBlock label="Type" value={h[2]} />
                  <DetailBlock label="Distance" value={h[3]} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

type ThreatLevel = "Low" | "Medium" | "High";

function getConditionThreat(name: string): {
  level: ThreatLevel;
  summary: string;
} {
  const n = name.toLowerCase();

  // High threat conditions
  const highKeywords = [
    "asthma",
    "poisoning",
    "dehydration",
    "uti",
    "stomach infection",
    "wound infection",
    "fever",
    "migraine",
  ];
  if (highKeywords.some((k) => n.includes(k))) {
    return {
      level: "High",
      summary:
        "High Severity — Immediate medical attention recommended if persistent or escalating.",
    };
  }

  // Medium threat conditions
  const mediumKeywords = [
    "vomit",
    "diarrhea",
    "burn",
    "tooth",
    "ear pain",
    "gastritis",
    "sinus",
    "body pain",
    "cough",
    "ringworm",
    "scabies",
    "worm",
    "throat infection",
    "joint pain",
    "back pain",
    "deficiency",
    "anxiety",
  ];
  if (mediumKeywords.some((k) => n.includes(k))) {
    return {
      level: "Medium",
      summary:
        "Moderate Severity — Monitor symptoms closely. Consult a doctor if not improved in 48-72 hrs.",
    };
  }

  // Low threat conditions
  return {
    level: "Low",
    summary:
      "Low Severity — Mild condition typically manageable with rest, hydration, and home care.",
  };
}

function DiseasesScreen() {
  const [open, setOpen] = useState(-1);
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => diseases.filter((d) => (d.name + d.symptoms).toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  return (
    <main className="conditions-layout diseases-layout screen-stage">
      <section className="glass-panel disease-panel conditions-panel">
        <div className="screen-title disease-title">
          <Leaf />
          <div>
            <h1>Diseases &amp; Symptoms</h1>
            <p>Tap any condition to open its full guidance.</p>
          </div>
        </div>
        <div className="search-row single">
          <label className="searchbox">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search disease, symptom or keyword..."
            />
          </label>
        </div>
        <div className="condition-list">
          {rows.map((d, i) => {
            const threat = getConditionThreat(d.name);
            return (
              <article className={`condition ${open === i ? "expanded" : ""}`} key={d.name}>
                <ActionButton
                  className="condition-head"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span>{i + 1}</span>
                  <b>
                    <HeartPulse />
                  </b>
                  <div>
                    <h2>{d.name}</h2>
                    <p>{d.symptoms}</p>
                  </div>
                  <span
                    className={`threat-badge-pill threat-badge-${threat.level.toLowerCase()}`}
                    aria-label={`Threat level: ${threat.level}`}
                    title={`Threat level: ${threat.level}`}
                  />
                  <ChevronDown />
                </ActionButton>
                {open === i && (
                  <div className="detail-grid">
                    <div className={`detail-block threat-box threat-${threat.level.toLowerCase()}`}>
                      <div className="threat-box-head">
                        {threat.level === "High" && <AlertTriangle className="threat-icon" />}
                        {threat.level === "Medium" && <AlertCircle className="threat-icon" />}
                        {threat.level === "Low" && <CheckCircle2 className="threat-icon" />}
                        <h3>
                          Threat Level: <span>{threat.level}</span>
                        </h3>
                      </div>
                      <p className="threat-summary">{threat.summary}</p>
                    </div>
                    <DetailBlock label="Description" value={d.description} />
                    <DetailBlock label="Key symptoms" value={d.symptoms} />
                    <DetailBlock label="Common care / OTC support" value={d.care} />
                    <DetailBlock label="When to see a doctor" value={d.doctor} />
                    <DetailBlock label="What to avoid" value={d.avoid} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function MedicinesScreen() {
  const [open, setOpen] = useState(-1);
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => medicines.filter((m) => (m.name + m.uses).toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  return (
    <main className="medicines-layout diseases-layout screen-stage">
      <section className="glass-panel disease-panel medicines-panel">
        <div className="screen-title disease-title">
          <Pill />
          <div>
            <h1>Medicines</h1>
            <p>Tap a medicine to see its uses, side effects and warnings.</p>
          </div>
        </div>
        <div className="search-row single">
          <label className="searchbox">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicine name or use..."
            />
          </label>
        </div>
        <div className="condition-list">
          {rows.map((m, i) => (
            <article className={`condition ${open === i ? "expanded" : ""}`} key={m.name}>
              <ActionButton
                className="condition-head"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{i + 1}</span>
                <b>
                  <Pill />
                </b>
                <div>
                  <h2>{m.name}</h2>
                  <p>{m.composition}</p>
                </div>
                <small>
                  {m.prescription.toLowerCase().startsWith("y")
                    ? "Prescription"
                    : "Over the counter"}
                </small>
                <ChevronDown />
              </ActionButton>
              {open === i && (
                <div className="detail-grid">
                  <DetailBlock label="Uses" value={m.uses} />
                  <DetailBlock label="Dosage" value={m.dosage} />
                  <DetailBlock label="Side effects" value={m.sideEffects} />
                  <DetailBlock label="Warnings" value={m.warnings} />
                  <DetailBlock label="Prescription required" value={m.prescription} />
                  <DetailBlock label="Alternatives" value={m.alternatives} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Index() {
  const [view, setView] = useState<View>("home");
  return (
    <div
      className={`app-shell ${view === "home" ? "is-home" : ""}`}
      style={{ "--site-background": `url(${BACKGROUND_IMAGE_URL})` } as React.CSSProperties}
    >
      <div className="background" />
      <Brand view={view} setView={setView} />
      {view === "home" && <HomeScreen setView={setView} />}
      {view === "hospitals" && <HospitalsScreen />}
      {view === "diseases" && <DiseasesScreen />}
      {view === "medicines" && <MedicinesScreen />}
      {view === "chat" && <ConsultScreen />}
    </div>
  );
}
