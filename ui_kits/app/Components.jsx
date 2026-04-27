// Components.jsx — Shared primitives for Kart Race Analyzer UI Kit

const KA_COLORS = {
  bg: '#0f0f1a', bgCard: '#1a1a2e', bgCardAlt: '#16213e',
  text: '#e0e0e0', textDim: '#8892a4',
  accent: '#e94560', green: '#4caf50', blue: '#4fc3f7',
  yellow: '#ffd54f', orange: '#ff9800', purple: '#ab47bc',
  border: '#2a2a4a',
};

const KA_DRIVER_COLORS = [
  '#e94560','#4fc3f7','#4caf50','#ffd54f','#ff9800',
  '#ab47bc','#26a69a','#ef5350','#7e57c2','#66bb6a',
  '#42a5f5','#ff7043'
];

const kaStyles = {
  card: {
    background: KA_COLORS.bgCard, borderRadius: 10,
    padding: 20, marginBottom: 20,
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    border: `1px solid ${KA_COLORS.border}`,
  },
  cardAlt: {
    background: KA_COLORS.bgCardAlt, borderRadius: 10,
    padding: '14px 16px', border: `1px solid ${KA_COLORS.border}`,
  },
  h3: { fontSize: '1.1rem', fontWeight: 600, color: KA_COLORS.blue, marginBottom: 16 },
};

function Card({ children, style, title }) {
  return (
    <div style={{ ...kaStyles.card, ...style }}>
      {title && <h3 style={kaStyles.h3}>{title}</h3>}
      {children}
    </div>
  );
}

function SummaryCard({ value, label, color }) {
  return (
    <div style={{
      background: KA_COLORS.bgCard, borderRadius: 10, padding: 16,
      textAlign: 'center', border: `1px solid ${KA_COLORS.border}`, flex: 1,
    }}>
      <div style={{ fontSize: '1.8rem', fontWeight: 700, color: color || KA_COLORS.accent }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: KA_COLORS.textDim, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function EventInfoBar({ date, time, event, track, category }) {
  const Item = ({ label, val }) => (
    <span style={{ fontSize: '0.85rem' }}>
      <span style={{ color: KA_COLORS.textDim }}>{label}: </span>
      <strong style={{ color: KA_COLORS.text }}>{val}</strong>
    </span>
  );
  return (
    <div style={{
      display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 20,
      padding: '12px 16px', background: KA_COLORS.bgCardAlt,
      borderRadius: 10, border: `1px solid ${KA_COLORS.border}`, fontSize: '0.85rem',
    }}>
      {date && <Item label="Дата" val={date} />}
      {time && <Item label="Время" val={time} />}
      {event && <Item label="Событие" val={event} />}
      {track && <Item label="Трасса" val={track} />}
      {category && <Item label="Категория" val={category} />}
    </div>
  );
}

function CloudBadge({ local }) {
  return local
    ? <span style={{ fontSize:'0.7rem', padding:'2px 8px', borderRadius:10, background:'rgba(255,213,79,0.15)', color:KA_COLORS.yellow, border:'1px solid rgba(255,213,79,0.3)', marginLeft:8 }}>локально</span>
    : <span style={{ fontSize:'0.7rem', padding:'2px 8px', borderRadius:10, background:'rgba(79,195,247,0.15)', color:KA_COLORS.blue, border:'1px solid rgba(79,195,247,0.3)', marginLeft:8 }}>☁ облако</span>;
}

function PillBtn({ children, active, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '5px 14px',
        background: active ? KA_COLORS.accent : KA_COLORS.bgCardAlt,
        color: active ? '#fff' : hover ? KA_COLORS.text : KA_COLORS.textDim,
        border: `1px solid ${active ? KA_COLORS.accent : hover ? KA_COLORS.blue : KA_COLORS.border}`,
        borderRadius: 20, fontSize: '0.85rem', fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', ...style,
      }}
    >{children}</button>
  );
}

function TabNav({ tabs, active, onTab }) {
  return (
    <div style={{
      display: 'flex', gap: 4, marginBottom: 24, overflowX: 'auto',
      paddingBottom: 0, borderBottom: `1px solid ${KA_COLORS.border}`,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onTab(t.id)} style={{
          padding: '10px 18px', background: 'transparent',
          color: active === t.id ? KA_COLORS.accent : KA_COLORS.textDim,
          border: 'none', borderBottom: `3px solid ${active === t.id ? KA_COLORS.accent : 'transparent'}`,
          fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer',
          whiteSpace: 'nowrap', transition: 'all 0.2s', fontFamily: 'inherit',
        }}>{t.label}</button>
      ))}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div style={{ textAlign:'center', padding:40, color: KA_COLORS.textDim }}>
      <div style={{ fontSize:'0.9rem', marginBottom:12 }}>Загрузка данных...</div>
      <div style={{
        width:40, height:40, margin:'0 auto',
        border:`3px solid ${KA_COLORS.border}`,
        borderTopColor: KA_COLORS.accent,
        borderRadius:'50%', animation:'kaspin 0.8s linear infinite',
      }}></div>
    </div>
  );
}

Object.assign(window, {
  KA_COLORS, KA_DRIVER_COLORS, kaStyles,
  Card, SummaryCard, EventInfoBar, CloudBadge, PillBtn, TabNav, LoadingSpinner,
});
