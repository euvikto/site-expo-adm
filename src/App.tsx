import { useEffect, useMemo, useRef, useState } from "react";
import { IMG, products, brl, type Product } from "./data";

type CartItem = { p: Product; size: string; qty: number };

/* ---------- Icons ---------- */
const I = {
  bag: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>,
  user: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>,
  search: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>,
  heart: (f: boolean) => <svg width="18" height="18" fill={f ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>,
  close: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19"/></svg>,
  arrow: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>,
  arrowL: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M20 12H4m6-6-6 6 6 6"/></svg>,
  play: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>,
  pause: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>,
};

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ---------- Header ---------- */
function Header({ scrolled, cartCount, onMenu, onSearch, onCart }: { scrolled: boolean; cartCount: number; onMenu: () => void; onSearch: () => void; onCart: () => void }) {
  const dark = scrolled;
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${dark ? "bg-white text-black shadow-[0_1px_0_#eee]" : "text-white"}`}>
      <div className="flex items-center justify-between px-5 md:px-10 h-16">
        <button className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase link-underline" onClick={() => document.getElementById("contato")?.scrollIntoView()}>
          + Fale Conosco
        </button>
        <div className="md:hidden w-6" />
        <div className="flex items-center gap-5">
          <button onClick={onCart} className="relative hover:opacity-60 transition" aria-label="Sacola">
            {I.bag}
            {cartCount > 0 && <span className="absolute -top-1.5 -right-2 bg-ancora text-white text-[9px] w-4 h-4 rounded-full grid place-items-center">{cartCount}</span>}
          </button>
          <button className="hidden sm:block hover:opacity-60 transition" aria-label="Conta">{I.user}</button>
          <button onClick={onSearch} className="hover:opacity-60 transition" aria-label="Buscar">{I.search}</button>
          <button onClick={onMenu} className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase group" aria-label="Menu">
            <span className="flex flex-col gap-[5px]">
              <span className="block w-5 h-px bg-current transition-all group-hover:w-3" />
              <span className="block w-5 h-px bg-current" />
            </span>
            <span className="hidden md:inline">Menu</span>
          </button>
        </div>
      </div>
      {/* Logo that shrinks like Gucci */}
      <a href="#top" className="absolute left-1/2 -translate-x-1/2 font-serif font-medium tracking-[0.12em] transition-all duration-700 ease-out leading-none select-none"
        style={{ top: dark ? 14 : 70, fontSize: dark ? 34 : "clamp(52px, 13vw, 180px)" }}>
        ARTMIS
      </a>
    </header>
  );
}

/* ---------- Menu overlay ---------- */
function MenuOverlay({ open, onClose, onCat }: { open: boolean; onClose: () => void; onCat: (c: string) => void }) {
  const items = ["Novidades", "Mulher", "Homem", "Bolsas", "Decoração", "Joias & Relógios", "Presentes", "Desfiles", "ARTMIS Ancora"];
  return (
    <div className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[460px] bg-white p-10 flex flex-col transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <button onClick={onClose} className="self-end hover:rotate-90 transition duration-300">{I.close}</button>
        <nav className="mt-10 flex flex-col gap-4">
          {items.map((it, i) => (
            <button key={it} onClick={() => { onCat(it); onClose(); }}
              className="text-left font-serif text-4xl hover:text-ancora hover:translate-x-3 transition-all duration-300"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "" : "translateX(30px)" }}>
              {it}
            </button>
          ))}
        </nav>
        <div className="mt-auto text-xs tracking-[0.2em] uppercase text-neutral-500 space-y-3">
          <p className="hover:text-black cursor-pointer">Minha Conta</p>
          <p className="hover:text-black cursor-pointer">Lojas ARTMIS</p>
          <p className="hover:text-black cursor-pointer">Atendimento: 0800 123 4567</p>
        </div>
      </aside>
    </div>
  );
}

/* ---------- Search ---------- */
function SearchOverlay({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (p: Product) => void }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) setTimeout(() => ref.current?.focus(), 300); }, [open]);
  const res = q ? products.filter((p) => (p.name + p.category).toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className={`fixed inset-0 z-50 bg-white transition-all duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible -translate-y-4"}`}>
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <div className="flex justify-between items-center">
          <span className="font-serif text-3xl tracking-[0.12em]">ARTMIS</span>
          <button onClick={onClose} className="hover:rotate-90 transition">{I.close}</button>
        </div>
        <div className="mt-16 flex items-center gap-4 border-b border-black pb-4">
          {I.search}
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="O que você procura?" className="flex-1 text-2xl md:text-4xl font-serif outline-none placeholder:text-neutral-300" />
        </div>
        {!q && (
          <div className="mt-10">
            <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-4">Buscas populares</p>
            <div className="flex flex-wrap gap-3">
              {["Bolsa", "Vestido", "Terno", "Casaco", "Blazer"].map((s) => (
                <button key={s} onClick={() => setQ(s)} className="border border-neutral-300 px-5 py-2 text-sm rounded-full hover:bg-black hover:text-white transition">{s}</button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-h-[60vh] overflow-auto no-scrollbar">
          {res.map((p) => (
            <button key={p.id} onClick={() => { onPick(p); onClose(); }} className="text-left group">
              <div className="aspect-[3/4] overflow-hidden bg-neutral-100"><img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /></div>
              <p className="mt-2 text-sm">{p.name}</p>
              <p className="text-xs text-neutral-500">{brl(p.price)}</p>
            </button>
          ))}
          {q && res.length === 0 && <p className="text-neutral-500 col-span-full">Nenhum resultado para "{q}".</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const toggle = () => { if (!v.current) return; playing ? v.current.pause() : v.current.play(); setPlaying(!playing); };
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-neutral-800 isolate">
      <video ref={v} src={IMG.heroVideo} poster={IMG.heroPoster} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-85 grayscale" />
      <div aria-hidden="true" className="absolute inset-0 bg-neutral-600/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute bottom-16 inset-x-0 text-center text-white px-6 fade-up">
        <p className="text-[11px] tracking-[0.35em] uppercase mb-4">Primavera-Verão 2026</p>
        <h1 className="font-serif text-5xl md:text-7xl">ARTMIS</h1>
        <p className="mt-4 max-w-md mx-auto text-sm text-white/80">Elegância que nasce do cuidado. Conheça a proposta ARTMIS de moda consciente, inspirada na natureza e feita para durar.</p>
        <a href="#loja" className="inline-block mt-8 bg-white text-black px-10 py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-ancora hover:text-white transition-colors duration-500">Descubra Agora</a>
      </div>
      <button onClick={toggle} className="absolute bottom-6 right-6 text-white w-10 h-10 border border-white/50 rounded-full grid place-items-center hover:bg-white hover:text-black transition">
        {playing ? I.pause : I.play}
      </button>
    </section>
  );
}

/* ---------- Split tiles ---------- */
function Split({ onCat }: { onCat: (c: string) => void }) {
  const tiles = [
    { img: IMG.women, t: "Mulher", s: "Novas silhuetas da temporada", c: "Mulher" },
    { img: IMG.men, t: "Homem", s: "Artesanato reinventado", c: "Homem" },
  ];
  return (
    <section className="grid md:grid-cols-2">
      {tiles.map((t) => (
        <button key={t.t} onClick={() => onCat(t.c)} className="relative h-[85vh] overflow-hidden group text-white text-center">
          <img src={t.img} alt={t.t} className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-out" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition" />
          <div className="absolute bottom-14 inset-x-0 reveal">
            <h2 className="font-serif text-5xl">{t.t}</h2>
            <p className="text-sm mt-2 text-white/85">{t.s}</p>
            <span className="inline-block mt-5 text-[11px] tracking-[0.25em] uppercase border-b border-white pb-1 group-hover:tracking-[0.4em] transition-all duration-500">Comprar Agora</span>
          </div>
        </button>
      ))}
    </section>
  );
}

/* ---------- Product Card ---------- */
function Card({ p, liked, onLike, onOpen }: { p: Product; liked: boolean; onLike: () => void; onOpen: () => void }) {
  return (
    <div className="group relative cursor-pointer" onClick={onOpen}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f3]">
        <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105" />
        <img src={p.img2} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100" />
        {p.tag && <span className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase bg-white/90 px-2 py-1">{p.tag}</span>}
        <button onClick={(e) => { e.stopPropagation(); onLike(); }} className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 grid place-items-center transition hover:scale-110 ${liked ? "text-ancora" : ""}`}>{I.heart(liked)}</button>
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 text-center py-3 text-[11px] tracking-[0.25em] uppercase">Visualização Rápida</div>
      </div>
      <div className="pt-4 text-center">
        <p className="text-[13px]">{p.name}</p>
        <p className="text-[13px] text-neutral-500 mt-1">{brl(p.price)}</p>
      </div>
    </div>
  );
}

/* ---------- Shop ---------- */
function Shop({ cat, setCat, liked, toggleLike, open }: { cat: string; setCat: (c: string) => void; liked: number[]; toggleLike: (id: number) => void; open: (p: Product) => void }) {
  const cats = ["Todos", "Mulher", "Homem", "Bolsas", "Decoração", "Favoritos"];
  const [sort, setSort] = useState("destaque");
  const list = useMemo(() => {
    let l = cat === "Todos" ? products : cat === "Favoritos" ? products.filter((p) => liked.includes(p.id)) : products.filter((p) => p.category === cat);
    if (sort === "menor") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "maior") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort, liked]);
  return (
    <section id="loja" className="px-5 md:px-10 py-24 scroll-mt-16">
      <div className="text-center reveal">
        <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">A Coleção</p>
        <h2 className="font-serif text-4xl md:text-6xl mt-3">Novidades ARTMIS</h2>
        <p className="mt-3 text-xs text-neutral-500">Coleção conceitual · Preços fictícios para o projeto escolar.</p>
      </div>
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-y border-neutral-200 py-4">
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`relative text-[11px] tracking-[0.2em] uppercase pb-1 whitespace-nowrap transition ${cat === c ? "text-black" : "text-neutral-400 hover:text-black"}`}>
              {c}{c === "Favoritos" && ` (${liked.length})`}
              <span className={`absolute left-0 bottom-0 h-px bg-black transition-all duration-500 ${cat === c ? "w-full" : "w-0"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span className="text-neutral-400">{list.length} itens</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none uppercase cursor-pointer">
            <option value="destaque">Destaques</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {list.map((p, i) => (
          <div key={p.id + cat + sort} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <Card p={p} liked={liked.includes(p.id)} onLike={() => toggleLike(p.id)} onOpen={() => open(p)} />
          </div>
        ))}
        {list.length === 0 && <p className="col-span-full text-center text-neutral-500 py-20 font-serif text-2xl">Você ainda não tem favoritos. Toque no ♡ para salvar.</p>}
      </div>
    </section>
  );
}

/* ---------- Runway Parallax ---------- */
function Runway() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const f = () => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); setY(r.top * -0.25); };
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden bg-ancora text-white">
      <img src={IMG.runway1} className="absolute inset-0 w-full h-[130%] object-cover opacity-60 mix-blend-luminosity" style={{ transform: `translateY(${y}px)` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ancora-dark via-ancora/40 to-transparent" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 reveal">
        <p className="text-[11px] tracking-[0.35em] uppercase">Desfile</p>
        <h2 className="font-serif text-5xl md:text-8xl mt-4">Rosso ARTMIS</h2>
        <p className="max-w-lg mt-6 text-white/80">O vermelho profundo que marca uma nova era. Assista ao desfile Primavera-Verão 2026 apresentado em Milão.</p>
        <a href="#lookbook" className="mt-10 border border-white px-10 py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-ancora transition-colors duration-500">Ver os Looks</a>
      </div>
    </section>
  );
}

/* ---------- Lookbook carousel ---------- */
function Lookbook({ open }: { open: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.6, behavior: "smooth" });
  const onScroll = () => { const el = ref.current; if (el) setProg(el.scrollLeft / (el.scrollWidth - el.clientWidth || 1)); };
  return (
    <section id="lookbook" className="py-24">
      <div className="flex items-end justify-between px-5 md:px-10 mb-10 reveal">
        <div>
          <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">Lookbook</p>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Looks do Desfile</h2>
        </div>
        <div className="flex gap-3">
          <button onClick={() => scroll(-1)} className="w-12 h-12 border border-black rounded-full grid place-items-center hover:bg-black hover:text-white transition">{I.arrowL}</button>
          <button onClick={() => scroll(1)} className="w-12 h-12 border border-black rounded-full grid place-items-center hover:bg-black hover:text-white transition">{I.arrow}</button>
        </div>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-10">
        {products.filter((p) => p.category === "Mulher" || p.category === "Homem").map((p, i) => (
          <button key={p.id} onClick={() => open(p)} className="snap-start shrink-0 w-[70vw] sm:w-[40vw] lg:w-[26vw] text-left group">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
              <span className="absolute top-4 left-4 font-serif text-white text-2xl drop-shadow">Look {String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="mt-3 text-sm">{p.name}</p>
          </button>
        ))}
      </div>
      <div className="mx-5 md:mx-10 mt-8 h-px bg-neutral-200 relative">
        <div className="absolute left-0 top-0 h-px bg-black transition-all" style={{ width: `${Math.max(8, prog * 100)}%` }} />
      </div>
    </section>
  );
}

/* ---------- Editorial ---------- */
function Editorial({ onCat }: { onCat: (c: string) => void }) {
  return (
    <section className="grid md:grid-cols-3 gap-4 px-5 md:px-10 pb-24">
      {[
        { img: IMG.bags, t: "Bolsas Ícone", c: "Bolsas" },
        { img: IMG.story, t: "Noite ARTMIS", c: "Mulher" },
        { img: IMG.menB, t: "Alfaiataria", c: "Homem" },
      ].map((e, i) => (
        <button key={e.t} onClick={() => onCat(e.c)} className="relative aspect-[3/4] overflow-hidden group reveal" style={{ transitionDelay: `${i * 150}ms` }}>
          <img src={e.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[2s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 inset-x-0 text-center text-white">
            <h3 className="font-serif text-3xl">{e.t}</h3>
            <span className="text-[11px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 inline-block mt-3 transition duration-500">Explorar →</span>
          </div>
        </button>
      ))}
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const t = "ARTMIS ✦ PRIMAVERA-VERÃO 2026 ✦ FRETE GRÁTIS ✦ EMBALAGEM PRESENTE EXCLUSIVA ✦ ";
  return (
    <div className="bg-black text-white py-5 overflow-hidden">
      <div className="marquee whitespace-nowrap flex w-max font-serif text-2xl md:text-3xl tracking-[0.15em]">
        <span>{t.repeat(4)}</span><span>{t.repeat(4)}</span>
      </div>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="sobre" className="scroll-mt-24 bg-[#f5f3ee] px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] uppercase text-ancora">Sobre a ARTMIS</p>
        <h2 className="font-serif text-4xl md:text-6xl mt-4 max-w-3xl">Vestir o presente. Cuidar do amanhã.</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mt-8 text-sm leading-relaxed text-neutral-600">
          <p>A ARTMIS nasce da ideia de que estilo e respeito à natureza podem caminhar juntos. Somos uma marca fictícia de moda sustentável que imagina um guarda-roupa com mais significado: peças versáteis, formas atemporais e escolhas que valorizam quem veste, quem produz e o planeta.</p>
          <p>Nossa inspiração vem dos ciclos da natureza: transformar, renovar e recomeçar. A proposta é aproximar a elegância dos materiais de origem natural, do reaproveitamento e do consumo consciente. Mais do que acompanhar tendências, queremos inspirar uma relação de cuidado com cada roupa.</p>
        </div>
        <div id="sustentabilidade" className="scroll-mt-24 grid md:grid-cols-3 gap-8 mt-12 pt-10 border-t border-neutral-300">
          {[
            { title: "Origem natural", text: "Nossa proposta prioriza fibras como algodão orgânico e linho, além de estudar alternativas de origem biológica para tecidos e acabamentos." },
            { title: "Novos ciclos", text: "Imaginamos coleções que aproveitam retalhos, incorporam fibras recicladas e usam embalagens recicláveis, dando novos caminhos ao que já existe." },
            { title: "Feita para ficar", text: "Design atemporal, produção em menor escala e incentivo ao cuidado, ao conserto e ao reuso: comprar com intenção e usar por mais tempo." },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-3xl text-ancora">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs leading-relaxed text-neutral-500">ARTMIS é um projeto escolar. Os compromissos apresentados fazem parte do conceito da marca fictícia; as compras são apenas uma simulação.</p>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const s = [
    { t: "Serviço de Agendamento", d: "Agende uma visita personalizada em uma de nossas boutiques." },
    { t: "Personalização", d: "Adicione suas iniciais em bolsas e acessórios selecionados." },
    { t: "Embalagem ARTMIS", d: "Cada pedido é entregue na icônica caixa bordô ARTMIS." },
  ];
  return (
    <section className="grid md:grid-cols-3 border-t border-neutral-200">
      {s.map((x, i) => (
        <div key={x.t} className={`p-12 text-center reveal ${i < 2 ? "md:border-r border-neutral-200" : ""}`}>
          <h4 className="font-serif text-2xl">{x.t}</h4>
          <p className="text-sm text-neutral-500 mt-3 max-w-xs mx-auto">{x.d}</p>
          <button className="mt-6 text-[11px] tracking-[0.25em] uppercase link-underline">Saiba mais</button>
        </div>
      ))}
    </section>
  );
}

/* ---------- Quick View ---------- */
function QuickView({ p, onClose, onAdd, liked, onLike }: { p: Product | null; onClose: () => void; onAdd: (p: Product, s: string) => void; liked: boolean; onLike: () => void }) {
  const [size, setSize] = useState("");
  const [imgIdx, setImgIdx] = useState(0);
  const [err, setErr] = useState(false);
  useEffect(() => { setSize(""); setImgIdx(0); setErr(false); }, [p]);
  if (!p) return null;
  const sizes = (p.category === "Bolsas" || p.category === "Decoração") ? ["Único"] : ["PP", "P", "M", "G", "GG"];
  const imgs = Array.from(new Set([p.img, p.img2]));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-up" style={{ animationDuration: ".4s" }} />
      <div className="relative bg-white w-full max-w-5xl max-h-full overflow-auto grid md:grid-cols-2 fade-up" style={{ animationDuration: ".6s" }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 hover:rotate-90 transition">{I.close}</button>
        <div className="relative bg-[#f5f5f3] aspect-[3/4] md:aspect-auto">
          {imgs.map((src, i) => (
            <img key={i} src={src} alt={p.name} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${imgIdx === i ? "opacity-100" : "opacity-0"}`} />
          ))}
          <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 ${imgs.length === 1 ? "hidden" : ""}`}>
            {imgs.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} className={`h-[2px] transition-all ${imgIdx === i ? "w-10 bg-black" : "w-5 bg-black/30"}`} />)}
          </div>
        </div>
        <div className="p-8 md:p-12 flex flex-col">
          <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">{p.category} {p.tag && `· ${p.tag}`}</p>
          <h3 className="font-serif text-4xl mt-3">{p.name}</h3>
          <p className="mt-3 text-lg">{brl(p.price)}</p>
          <p className="text-xs text-neutral-500">ou 10x de {brl(p.price / 10)} sem juros</p>
          <p className="mt-6 text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
          <div className="mt-8">
            <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase">
              <span className={err ? "text-red-600" : ""}>{err ? "Selecione um tamanho" : "Tamanho"}</span>
              <button className="link-underline text-neutral-500">Guia de medidas</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {sizes.map((s) => (
                <button key={s} onClick={() => { setSize(s); setErr(false); }} className={`min-w-14 h-12 px-4 border text-sm transition ${size === s ? "bg-black text-white border-black" : "border-neutral-300 hover:border-black"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={() => { const s = sizes.length === 1 ? sizes[0] : size; if (!s) return setErr(true); onAdd(p, s); }}
              className="flex-1 bg-black text-white h-14 text-[11px] tracking-[0.25em] uppercase hover:bg-ancora transition-colors duration-500">Adicionar à Sacola</button>
            <button onClick={onLike} className={`w-14 h-14 border grid place-items-center transition ${liked ? "border-ancora text-ancora" : "border-neutral-300 hover:border-black"}`}>{I.heart(liked)}</button>
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-6 text-xs text-neutral-500 space-y-2">
            <p>✦ Frete grátis e devolução em até 30 dias</p>
            <p>✦ Embalagem presente ARTMIS inclusa</p>
            <p>✦ Retire em uma boutique ARTMIS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cart ---------- */
function Cart({ open, items, onClose, setQty, remove }: { open: boolean; items: CartItem[]; onClose: () => void; setQty: (i: number, q: number) => void; remove: (i: number) => void }) {
  const total = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  const [done, setDone] = useState(false);
  return (
    <div className={`fixed inset-0 z-50 ${open ? "visible" : "invisible"}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[440px] bg-white flex flex-col transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-6 border-b border-neutral-200">
          <h3 className="text-[11px] tracking-[0.25em] uppercase">Sacola ({items.reduce((s, i) => s + i.qty, 0)})</h3>
          <button onClick={onClose} className="hover:rotate-90 transition">{I.close}</button>
        </div>
        {done ? (
          <div className="flex-1 grid place-items-center text-center p-10">
            <div>
              <p className="font-serif text-4xl">Obrigado.</p>
              <p className="text-sm text-neutral-500 mt-3">Seu pedido ARTMIS foi confirmado e será enviado na nossa embalagem exclusiva.</p>
              <button onClick={() => { setDone(false); onClose(); }} className="mt-8 border border-black px-8 py-3 text-[11px] tracking-[0.25em] uppercase hover:bg-black hover:text-white transition">Continuar comprando</button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-center p-10">
            <div>
              <p className="font-serif text-3xl">Sua sacola está vazia</p>
              <button onClick={onClose} className="mt-6 text-[11px] tracking-[0.25em] uppercase link-underline">Explorar a coleção</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {items.map((it, i) => (
                <div key={i} className="flex gap-4 fade-up" style={{ animationDuration: ".5s" }}>
                  <img src={it.p.img} className="w-24 h-32 object-cover bg-neutral-100" />
                  <div className="flex-1 text-sm">
                    <p>{it.p.name}</p>
                    <p className="text-neutral-500 text-xs mt-1">Tamanho: {it.size}</p>
                    <div className="flex items-center mt-3 border border-neutral-300 w-fit">
                      <button onClick={() => setQty(i, it.qty - 1)} className="w-8 h-8 hover:bg-neutral-100">−</button>
                      <span className="w-8 text-center">{it.qty}</span>
                      <button onClick={() => setQty(i, it.qty + 1)} className="w-8 h-8 hover:bg-neutral-100">+</button>
                    </div>
                  </div>
                  <div className="text-right text-sm flex flex-col justify-between">
                    <p>{brl(it.p.price * it.qty)}</p>
                    <button onClick={() => remove(i)} className="text-xs text-neutral-500 link-underline">Remover</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-neutral-200">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{brl(total)}</span></div>
              <div className="flex justify-between text-sm text-neutral-500 mt-1"><span>Frete</span><span>Grátis</span></div>
              <button onClick={() => setDone(true)} className="mt-5 w-full bg-black text-white h-14 text-[11px] tracking-[0.25em] uppercase hover:bg-ancora transition-colors duration-500">Finalizar Compra</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const cols = [
    { t: "Posso ajudar?", l: ["Fale Conosco", "Perguntas Frequentes", "Trocas e Devoluções", "Rastrear Pedido"] },
    { t: "A Empresa", l: ["Sobre a ARTMIS", "ARTMIS Ancora", "Sustentabilidade", "Carreiras"] },
    { t: "Lojas", l: ["São Paulo — Oscar Freire", "Rio de Janeiro — Leblon", "Milão — Via Montenapoleone", "Encontrar Loja"] },
  ];
  return (
    <footer id="contato" className="bg-ancora text-white">
      <div className="grid md:grid-cols-4 gap-12 px-5 md:px-10 py-20">
        {cols.map((c) => (
          <div key={c.t}>
            <h5 className="text-[11px] tracking-[0.25em] uppercase mb-6">{c.t}</h5>
            <ul className="space-y-3 text-sm text-white/75">{c.l.map((x) => <li key={x}><a href={x === "Sobre a ARTMIS" ? "#sobre" : x === "Sustentabilidade" ? "#sustentabilidade" : undefined} className="link-underline hover:text-white cursor-pointer">{x}</a></li>)}</ul>
          </div>
        ))}
        <div>
          <h5 className="text-[11px] tracking-[0.25em] uppercase mb-6">Inscreva-se</h5>
          {ok ? <p className="font-serif text-2xl">Bem-vindo(a) à ARTMIS.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setOk(true); }}>
              <p className="text-sm text-white/75 mb-4">Receba novidades, lançamentos e convites exclusivos.</p>
              <div className="flex border-b border-white/60 focus-within:border-white">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Seu e-mail" className="flex-1 bg-transparent py-3 outline-none placeholder:text-white/50 text-sm" />
                <button className="hover:translate-x-1 transition">{I.arrow}</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="overflow-hidden">
        <p className="font-serif text-center leading-[0.8] tracking-[0.1em] select-none" style={{ fontSize: "clamp(64px, 22vw, 340px)" }}>ARTMIS</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2 px-5 md:px-10 py-6 text-[11px] text-white/60 border-t border-white/15">
        <span>© 2026 ARTMIS · Projeto escolar de loja fictícia.</span>
        <span>Brasil / Português · Privacidade · Termos</span>
      </div>
    </footer>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [quick, setQuick] = useState<Product | null>(null);
  const [cat, setCat] = useState("Todos");
  const [toast, setToast] = useState("");

  useReveal();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu || search || cartOpen || quick ? "hidden" : "";
  }, [menu, search, cartOpen, quick]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2500); return () => clearTimeout(t); }, [toast]);

  const goCat = (c: string) => {
    const map: Record<string, string> = { Mulher: "Mulher", Homem: "Homem", Bolsas: "Bolsas", Decoração: "Decoração" };
    setCat(map[c] || "Todos");
    setTimeout(() => document.getElementById("loja")?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const toggleLike = (id: number) => {
    setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
    setToast(liked.includes(id) ? "Removido dos favoritos" : "Adicionado aos favoritos ♡");
  };
  const add = (p: Product, size: string) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.p.id === p.id && x.size === size);
      if (i >= 0) return c.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { p, size, qty: 1 }];
    });
    setQuick(null);
    setCartOpen(true);
  };

  return (
    <div>
      <Header scrolled={scrolled} cartCount={cart.reduce((s, i) => s + i.qty, 0)} onMenu={() => setMenu(true)} onSearch={() => setSearch(true)} onCart={() => setCartOpen(true)} />
      <Hero />
      <Split onCat={goCat} />
      <Shop cat={cat} setCat={setCat} liked={liked} toggleLike={toggleLike} open={setQuick} />
      <Marquee />
      <Runway />
      <Lookbook open={setQuick} />
      <Editorial onCat={goCat} />
      <About />
      <Services />
      <Footer />

      <MenuOverlay open={menu} onClose={() => setMenu(false)} onCat={goCat} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} onPick={setQuick} />
      <QuickView p={quick} onClose={() => setQuick(null)} onAdd={add} liked={!!quick && liked.includes(quick.id)} onLike={() => quick && toggleLike(quick.id)} />
      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)}
        setQty={(i, q) => setCart((c) => (q <= 0 ? c.filter((_, j) => j !== i) : c.map((x, j) => (j === i ? { ...x, qty: q } : x))))}
        remove={(i) => setCart((c) => c.filter((_, j) => j !== i))} />

      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-black text-white px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-500 ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}>{toast}</div>
    </div>
  );
}
