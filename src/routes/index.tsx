import { createFileRoute } from "@tanstack/react-router";
import {
  Bone, Bot, ChevronDown, ChevronRight, CircleCheck, CircleUserRound,
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

type View = "voice" | "hospitals" | "diseases" | "chat";

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
  return <header className="brandbar">
    <ActionButton className="brand" onClick={() => setView("voice")} aria-label="Sudha Setu home">
      <span className="brand-leaves"><Leaf/><Leaf/></span>
      <span><strong>Sudha Setu</strong><small>Ancient Wisdom. Modern Care.</small></span>
    </ActionButton>
    <nav aria-label="Main navigation">
      {(["voice", "hospitals", "diseases", "chat"] as View[]).map((item) =>
        <ActionButton key={item} className={view === item ? "nav-active" : ""} onClick={() => setView(item)}>
          {item === "chat" ? "Charak Vaani" : item[0].toUpperCase() + item.slice(1)}
        </ActionButton>)}
    </nav>
    <div className="brand-quote"><em>“Speak Healthier<br/>Live Better”</em><span>— ❧ —</span></div>
  </header>;
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

function VoiceScreen() {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  return <main className="voice-layout screen-stage">
    <section className="glass-panel voice-panel">
      <div className="screen-title"><Leaf/><h1>Voice Consultation</h1><p>Speak your health concerns naturally, and let Charak Vaani guide you.</p></div>
      <div className={`voice-orb-wrap ${listening ? "is-listening" : ""}`}>
        <div className="waveform left" aria-hidden="true"/><ActionButton className="voice-orb" onClick={() => setListening(!listening)} aria-label={listening ? "Stop listening" : "Start listening"}>{listening ? <Square/> : <Mic/>}</ActionButton><div className="waveform" aria-hidden="true"/>
      </div>
      <strong className="tap-label">{listening ? "Tap to Stop" : "Tap to Speak"}</strong><small className="listening-label">{listening ? "Listening..." : "Ready"}</small>
      <label className="select-pill"><Globe2/><select aria-label="Language"><option>Auto-detect language (English)</option><option>हिन्दी (Hindi)</option></select><ChevronDown/></label>
      <div className="voice-conversation">
        <div className="message-row user"><div className="message-bubble"><div className="audio"><Play/><span className="audio-wave"/><small>00:08</small></div><p>I have a headache since morning and feeling a bit nauseous. What can I do?</p><time>10:24 AM</time></div><LeafAvatar user/></div>
        <div className="message-row"><LeafAvatar/><div className="message-bubble ai"><strong>Namaste! 🙏</strong><p>Based on your symptoms, this could be due to Pitta imbalance, dehydration, or mild indigestion.<br/>Here are some recommendations:</p><ul><li>Drink lukewarm water</li><li>Rest in a calm environment</li><li>You can try Brahmi or Shankhpushpi (after consulting a physician)</li><li>Avoid spicy and oily food</li></ul><p>If symptoms persist or worsen, please consult a nearby Ayurveda specialist.</p><time>10:24 AM</time></div></div>
        {messages.map((m, i) => <div className="message-row user" key={`${m}-${i}`}><div className="message-bubble"><p>{m}</p><time>Now</time></div><LeafAvatar user/></div>)}
      </div>
      <Composer onSend={(m) => setMessages((old) => [...old, m])}/>
      <aside className="trust-rail"><div><ShieldCheck/><span>Safe</span></div><div><CircleCheck/><span>Trusted</span></div><div><Sparkles/><span>Ayurvedic<br/>Guidance</span></div></aside>
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

function ChatScreen() {
  const [messages, setMessages] = useState<string[]>([]);
  return <main className="chat-layout screen-stage"><section className="glass-panel chat-panel"><span className="today">Today</span><div className="chat-stream">
    <div className="message-row"><LeafAvatar/><div className="message-bubble ai"><p>Namaste! 🙏<br/>I’m Charak Vaani, your Ayurvedic companion.<br/>Ask me anything about herbs, health, lifestyle or Ayurveda.</p><time>10:12 AM</time></div></div>
    <div className="message-row user"><div className="message-bubble"><p>What are the benefits of Tulsi?</p><time>10:13 AM</time></div><LeafAvatar user/></div>
    <div className="message-row"><LeafAvatar/><div className="message-bubble ai"><p>Tulsi (Ocimum sanctum) is a powerful herb in Ayurveda.<br/>It helps with:</p><ul><li>Boosting immunity</li><li>Reducing stress and anxiety</li><li>Supporting respiratory health</li><li>Purifying the body and mind</li></ul><p>Would you like to know how to use Tulsi in daily life? 🌱</p><time>10:13 AM</time></div></div>
    <div className="message-row user"><div className="message-bubble"><p>Yes, how can I include it in my daily routine?</p><time>10:14 AM</time></div><LeafAvatar user/></div>
    <div className="message-row"><LeafAvatar/><div className="message-bubble ai"><p>You can include Tulsi in your daily routine by:</p><ul><li>Drinking Tulsi tea (boil 5–7 leaves in water)</li><li>Chewing fresh leaves in the morning</li><li>Adding it to warm water or herbal concoctions</li><li>Using Tulsi drops during seasonal changes</li></ul><p>It’s best taken in moderation. 🌱</p><time>10:14 AM</time></div></div>
    {messages.map((m,i)=><div className="message-row user" key={`${m}-${i}`}><div className="message-bubble"><p>{m}</p><time>Now</time></div><LeafAvatar user/></div>)}
    </div><Composer onSend={(m)=>setMessages(old=>[...old,m])}/></section></main>;
}

function Index() {
  const [view, setView] = useState<View>("voice");
  return <div className="app-shell" style={{ "--site-background": `url(${backgroundAsset.url})` } as React.CSSProperties}><div className="background"/><Brand view={view} setView={setView}/>{view === "voice" && <VoiceScreen/>}{view === "hospitals" && <HospitalsScreen/>}{view === "diseases" && <DiseasesScreen/>}{view === "chat" && <ChatScreen/>}</div>;
}
