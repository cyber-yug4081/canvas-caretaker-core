import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, BrainCircuit, ChevronDown, ChevronRight, CircleCheck, CircleUserRound,
  Globe2, HeartPulse, Languages, Leaf, MapPin, Mic, Paperclip, Play,
  Search, Send, ShieldCheck, Sparkles, Square, Stethoscope, X,
} from "lucide-react";
import { FormEvent, ReactNode, useMemo, useState } from "react";
import backgroundAsset from "../assets/sudha-setu-background.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Sudha Setu | Ayurvedic Health Guidance" },
    { name: "description", content: "Explore Ayurvedic guidance, hospitals, symptoms, and Charak Vaani voice consultation." },
    { property: "og:title", content: "Sudha Setu | Ayurvedic Health Guidance" },
    { property: "og:description", content: "Ancient wisdom and modern care through Ayurvedic guidance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

type View = "home" | "hospitals" | "diseases" | "chat";

const hospitals = [
  ["All India Institute of Ayurveda", "New Delhi, Delhi", "Government Ayurveda Hospital", "2.3 km", ["General Ayurveda", "Panchakarma", "Research"]],
  ["National Institute of Ayurveda", "Jaipur, Rajasthan", "Premier Ayurveda Institute", "4.7 km", ["Panchakarma", "Kayachikitsa", "Education"]],
  ["State Ayurveda Hospital", "Lucknow, Uttar Pradesh", "Government Ayurveda Center", "6.1 km", ["General Treatment", "Herbal Therapy", "Outpatient"]],
  ["Kerala Ayurveda Hospital", "Thiruvananthapuram, Kerala", "Traditional Kerala Ayurveda Care", "8.4 km", ["Panchakarma", "Rejuvenation", "Wellness Retreat"]],
  ["Sri Sri Ayurveda Hospital", "Bengaluru, Karnataka", "Holistic Healing & Wellness", "10.2 km", ["Lifestyle Disorders", "Panchakarma", "Yoga & Wellness"]],
] as const;

const conditions = [
  ["Common Cold", "Sneezing, runny nose, throat irritation", "Respiratory", "🫁"],
  ["Acidity (Amlapitta)", "Burning sensation, bloating, sour belching", "Digestive", "◒"],
  ["Headache (Shirashoola)", "Pain in head, stress, heaviness", "Neurological", "◉"],
  ["Joint Pain (Sandhivata)", "Stiffness, swelling, pain in joints", "Musculoskeletal", "◈"],
  ["Diabetes (Madhumeha)", "Frequent urination, increased thirst", "Metabolic", "♦"],
  ["Skin Allergy (Twak Vikara)", "Itching, rashes, redness", "Skin", "✋"],
  ["Insomnia (Nidranasha)", "Difficulty in sleeping, restlessness", "Mental Health", "☾"],
  ["High Blood Pressure (Raktachap)", "Headache, dizziness, fatigue", "Cardiovascular", "♡"],
  ["Asthma (Tamaka Shwasa)", "Breathlessness, wheezing", "Respiratory", "🫁"],
  ["Indigestion (Ajirna)", "Fullness, gas, discomfort", "Digestive", "◒"],
] as const;

function ActionButton({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`action-button ${className}`} {...props}>{children}</button>;
}

function Brand({ view, setView }: { view: View; setView: (v: View) => void }) {
  return <header className={`brandbar ${view === "home" ? "home-brandbar" : ""}`}>
    <ActionButton className="brand" onClick={() => setView("home")} aria-label="Sudha Setu home">
      <span className="brand-leaves"><Leaf/><Leaf/></span>
      <span><strong>Sudha Setu</strong><small>Ancient Wisdom. Modern Care.</small></span>
    </ActionButton>
    <nav aria-label="Main navigation">
      {(["home", "hospitals", "diseases", "chat"] as View[]).map((item) =>
        <ActionButton key={item} className={view === item ? "nav-active" : ""} onClick={() => setView(item)}>
          {item === "chat" ? "Charak Vaani" : item.charAt(0).toUpperCase() + item.slice(1)}
        </ActionButton>)}
    </nav>
    <div className="brand-quote"><em>“Speak Healthier<br/>Live Better”</em><span>— ❧ —</span></div>
  </header>;
}

function HomeScreen({ setView }: { setView: (view: View) => void }) {
  return <main className="home-stage">
    <section className="home-copy">
      <p className="home-kicker">Ayurveda <span>×</span> Technology <span>×</span> A Healthier Tomorrow</p>
      <h1>Ancient Wisdom<br/><em>Modern Care</em></h1>
      <p className="home-intro">Bridging Ayurveda and Technology<br/>for a healthier tomorrow.</p>
      <ActionButton className="home-cta" onClick={() => setView("chat")}>
        <Leaf/><span>Charak Vaani</span><ArrowRight/>
      </ActionButton>
    </section>
    <section className="home-visual" aria-label="Ayurvedic care powered by natural herbs and smart technology">
      <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
      <div className="benefit benefit-herbs"><span><Leaf/></span><strong>Natural<br/>Herbs</strong></div>
      <div className="benefit benefit-tech"><span><BrainCircuit/></span><strong>Smart<br/>Technology</strong></div>
      <div className="benefit benefit-care"><span><HeartPulse/></span><strong>Better<br/>Wellness</strong></div>
    </section>
  </main>;
}

function LeafAvatar({ user = false }: { user?: boolean }) {
  return <span className="avatar">{user ? <CircleUserRound/> : <Leaf/>}</span>;
}

function Composer({ onSend }: { onSend?: (value: string) => void }) {
  const [value, setValue] = useState("");
  const submit = (e: FormEvent) => { e.preventDefault(); if (!value.trim()) return; onSend?.(value.trim()); setValue(""); };
  return <form className="composer" onSubmit={submit}>
    <Paperclip aria-hidden="true"/><input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type your message..." aria-label="Message"/>
    <ActionButton type="button" className="icon-button" aria-label="Use microphone"><Mic/></ActionButton>
    <ActionButton type="submit" className="send-button" aria-label="Send message"><Send/></ActionButton>
  </form>;
}

type Msg = { role: "user" | "ai"; text?: string; answer?: Answer; time: string };
const clockTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function AnswerBubble({ answer }: { answer: Answer }) {
  return <>
    <strong>Namaste! 🙏</strong>
    <p>{answer.doctor}</p>
    <p><b>Possible causes:</b> {answer.causes}</p>
    <p><b>{answer.cureTitle}:</b></p>
    <ul>{answer.cure.map((c) => <li key={c}>{c}</li>)}</ul>
    <p><b>Red flags:</b> {answer.redFlags}</p>
    <p><b>Threat Level:</b> {answer.threat}</p>
  </>;
}

function ConsultScreen() {
  const [mode, setMode] = useState<"talk" | "chat">("chat");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Namaste! 🙏 Main Charak Vaani hoon. Apni takleef bolkar ya likhkar bataiye.", time: "10:12 AM" },
  ]);

  const ask = (text: string) => {
    const match = findAnswer(text);
    setMessages((old) => [
      ...old,
      { role: "user", text, time: clockTime() },
      match ? { role: "ai", answer: match, time: clockTime() } : { role: "ai", text: NOT_TRAINED, time: clockTime() },
    ]);
  };

  const toggleListening = () => {
    const SR = typeof window !== "undefined" && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SR) { setListening(false); ask("Voice input is not supported in this browser."); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const recognition = new SR();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.onresult = (event: any) => { const said = event.results[0]?.[0]?.transcript; if (said) ask(said); };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return <main className="chat-layout screen-stage">
    <section className="glass-panel chat-panel consult-panel">
      <div className="screen-title consult-head"><Leaf/><h1>Charak Vaani</h1><p>Talk or chat with your Ayurvedic companion.</p></div>
      <div className="mode-toggle" role="tablist">
        <ActionButton className={mode === "talk" ? "mode-active" : ""} role="tab" aria-selected={mode === "talk"} onClick={() => setMode("talk")}><Mic/> Talk</ActionButton>
        <ActionButton className={mode === "chat" ? "mode-active" : ""} role="tab" aria-selected={mode === "chat"} onClick={() => setMode("chat")}><Send/> Chat</ActionButton>
      </div>
      {mode === "talk" && <div className="talk-block">
        <div className={`voice-orb-wrap ${listening ? "is-listening" : ""}`}>
          <div className="waveform left" aria-hidden="true"/>
          <ActionButton className="voice-orb" onClick={toggleListening} aria-label={listening ? "Stop listening" : "Start listening"}>{listening ? <Square/> : <Mic/>}</ActionButton>
          <div className="waveform" aria-hidden="true"/>
        </div>
        <strong className="tap-label">{listening ? "Tap to Stop" : "Tap to Speak"}</strong>
        <small className="listening-label">{listening ? "Listening..." : "Ready"}</small>
        <label className="select-pill"><Globe2/><select aria-label="Language"><option>Auto-detect language (English)</option><option>हिन्दी (Hindi)</option></select><ChevronDown/></label>
      </div>}
      <div className="chat-stream">
        {messages.map((m, i) => m.role === "user"
          ? <div className="message-row user" key={i}><div className="message-bubble"><p>{m.text}</p><time>{m.time}</time></div><LeafAvatar user/></div>
          : <div className="message-row" key={i}><LeafAvatar/><div className="message-bubble ai">{m.answer ? <AnswerBubble answer={m.answer}/> : <p>{m.text}</p>}<time>{m.time}</time></div></div>)}
      </div>
      <Composer onSend={ask}/>
    </section>
  </main>;
}

function HospitalsScreen() {
  const [query, setQuery] = useState(""); const [city, setCity] = useState("All Cities");
  const filtered = hospitals.filter((h) => (h[0] + h[1] + h[2]).toLowerCase().includes(query.toLowerCase()) && (city === "All Cities" || h[1].includes(city)));
  return <main className="hospitals-layout screen-stage"><aside className="side-quote"><em>“Healing begins with<br/>the right guidance.”</em><span>— ❧ —</span></aside>
    <section className="directory"><div className="screen-title"><Leaf/><h1>Ayurveda Hospitals</h1><p>Find trusted Ayurveda hospitals and wellness centers near you</p></div>
      <div className="glass-panel list-panel"><div className="search-row"><label className="searchbox"><Search/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name, city or specialty..."/></label><label className="citybox"><MapPin/><select value={city} onChange={(e)=>setCity(e.target.value)}><option>All Cities</option><option>Delhi</option><option>Jaipur</option><option>Lucknow</option><option>Kerala</option><option>Bengaluru</option></select><ChevronDown/></label></div>
        <div className="hospital-list">{filtered.map((h, i) => <article className="hospital-row" key={h[0]}><div className={`hospital-thumb hospital-${i}`}><Stethoscope/></div><div className="hospital-info"><h2>{h[0]}</h2><p><MapPin/> {h[1]}</p><span>{h[2]}</span><div className="tags">{h[4].map(t=><small key={t}>{t}</small>)}</div></div><div className="hospital-actions"><span><MapPin/> {h[3]}</span><ActionButton onClick={()=>alert(`${h[0]} details`)}>View Details <ChevronRight/></ActionButton></div></article>)}</div>
      </div></section><aside className="care-mark"><span>♨</span><strong>TRADITIONAL<br/>CARE<br/>MODERN ACCESS</strong></aside></main>;
}

function DiseasesScreen() {
  const [open, setOpen] = useState(1); const [query, setQuery] = useState(""); const [category, setCategory] = useState("All Categories");
  const rows = useMemo(() => conditions.map((c,i)=>({c,i})).filter(({c}) => (c[0]+c[1]).toLowerCase().includes(query.toLowerCase()) && (category === "All Categories" || c[2] === category)), [query, category]);
  return <main className="diseases-layout screen-stage"><section className="glass-panel disease-panel"><div className="screen-title disease-title"><Leaf/><div><h1>Diseases &amp; Symptoms</h1><p>Explore common health concerns and get Ayurvedic guidance.</p></div></div>
    <div className="search-row"><label className="searchbox"><Search/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search disease, symptom or keyword..."/></label><label className="citybox"><select value={category} onChange={(e)=>setCategory(e.target.value)}><option>All Categories</option>{[...new Set(conditions.map(c=>c[2]))].map(c=><option key={c}>{c}</option>)}</select><ChevronDown/></label></div>
    <div className="condition-list">{rows.map(({c,i}) => <article className={`condition ${open===i ? "expanded" : ""}`} key={c[0]}><ActionButton className="condition-head" onClick={()=>setOpen(open===i ? -1 : i)} aria-expanded={open===i}><span>{i+1}</span><b>{c[3]}</b><div><h2>{c[0]}</h2><p>{c[1]}</p></div><small>{c[2]}</small><ChevronDown/></ActionButton>{open===i && <div className="guidance-grid"><Guidance kind="do" title="What to Do" items={["Drink lukewarm water","Consume cooling foods (cucumber, coconut)","Eat small meals on time","Use natural remedies like Amla, Licorice","Practice breathing exercises (Pranayama)"]}/><Guidance kind="avoid" title="What Not to Do" items={["Avoid spicy, oily and fried food","Don’t skip meals","Avoid excessive caffeine and tea","Don’t lie down immediately after eating","Avoid alcohol and smoking"]}/><div className="guidance threat"><h3><ShieldCheck/>Threat Level</h3><strong>Low to Moderate</strong><div className="threat-meter"><i/><i/><i/><i/><i/><i/><i/></div><p>Usually manageable with lifestyle changes and Ayurvedic care.</p></div></div>}</article>)}</div>
  </section><aside className="balance-mark"><Leaf/><span>Balance<br/>Through<br/>Knowledge</span></aside></main>;
}

function Guidance({kind,title,items}:{kind:string,title:string,items:string[]}) { return <div className={`guidance ${kind}`}><h3>{kind === "do" ? <CircleCheck/> : <X/>}{title}</h3><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></div>; }


function Index() {
  const [view, setView] = useState<View>("home");
  return <div className={`app-shell ${view === "home" ? "is-home" : ""}`} style={{ "--site-background": `url(${backgroundAsset.url})` } as React.CSSProperties}><div className="background"/><Brand view={view} setView={setView}/>{view === "home" && <HomeScreen setView={setView}/>} {view === "hospitals" && <HospitalsScreen/>}{view === "diseases" && <DiseasesScreen/>}{view === "chat" && <ConsultScreen/>}</div>;
}
