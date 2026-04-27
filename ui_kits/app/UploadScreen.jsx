// UploadScreen.jsx — Upload zones, session config, history list

const MOCK_HISTORY = [
  { id: '1', date: '12.04.2024', time: '14:30', event: 'CityFight', sessionType: 'Гонка 1', category: 'Любители', driversCount: 12, winner: 'Иванов' },
  { id: '2', date: '12.04.2024', time: '16:00', event: 'CityFight', sessionType: 'Гонка 2', category: 'Любители', driversCount: 12, winner: 'Петров' },
  { id: '3', date: '05.04.2024', time: '11:00', event: 'CityFight', sessionType: 'Квалификация', category: 'Любители', driversCount: 10, winner: 'Козлов' },
];

function UploadZone({ icon, label, loaded, filename, dragover }) {
  const [hover, setHover] = React.useState(false);
  const active = hover || dragover;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: KA_COLORS.bgCard,
        border: loaded
          ? `2px solid ${KA_COLORS.green}`
          : `2px dashed ${active ? KA_COLORS.accent : KA_COLORS.border}`,
        borderRadius: 10, padding: '30px 20px', textAlign: 'center',
        cursor: 'pointer', transition: 'all 0.3s',
        background: active && !loaded ? 'rgba(233,69,96,0.05)' : KA_COLORS.bgCard,
      }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 6, color: KA_COLORS.text }}>{label}</div>
      <div style={{ fontSize: '0.8rem', color: KA_COLORS.textDim }}>Перетащите PDF или нажмите</div>
      {filename && <div style={{ marginTop: 8, color: KA_COLORS.green, fontWeight: 500, fontSize: '0.9rem' }}>{filename}</div>}
    </div>
  );
}

function SessionConfig({ racesPerDay, setRacesPerDay, pitsPerRace, setPitsPerRace }) {
  return (
    <div style={{
      margin: '16px 0', padding: '14px 18px',
      background: KA_COLORS.bgCard, border: `1px solid ${KA_COLORS.border}`,
      borderRadius: 10, display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '0.85rem', color: KA_COLORS.textDim }}>Гонок в этот день:</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {[1,2,3].map(v => (
            <PillBtn key={v} active={racesPerDay === v} onClick={() => setRacesPerDay(v)}>{v}</PillBtn>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '0.85rem', color: KA_COLORS.textDim }}>Питстопов в гонке:</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0,1,2].map(v => (
            <PillBtn key={v} active={pitsPerRace === v} onClick={() => setPitsPerRace(v)}>{v}</PillBtn>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryItem({ item, onLoad }) {
  const [hover, setHover] = React.useState(false);
  const isQual = item.sessionType?.includes('Квалификация');
  return (
    <div
      onClick={() => onLoad(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: hover ? KA_COLORS.bgCardAlt : KA_COLORS.bgCard,
        border: `1px solid ${hover ? KA_COLORS.blue : KA_COLORS.border}`,
        borderRadius: 10, padding: '12px 16px', cursor: 'pointer', transition: 'all 0.2s',
      }}>
      <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{isQual ? '⏱' : '🏁'}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: KA_COLORS.text }}>
          {item.date}{item.time ? ` (${item.time.substring(0,5)})` : ''} — {[item.event, item.sessionType, item.category].filter(Boolean).join(' / ')}
        </div>
        <div style={{ fontSize: '0.8rem', color: KA_COLORS.textDim, marginTop: 2 }}>
          {item.driversCount} пилотов · Победитель: {item.winner}
        </div>
      </div>
      <button onClick={e => e.stopPropagation()} style={{
        padding: '4px 10px', background: 'transparent',
        color: KA_COLORS.textDim, border: '1px solid transparent',
        borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s',
      }}>✕</button>
    </div>
  );
}

function UploadScreen({ onAnalyze }) {
  const [qualiLoaded, setQualiLoaded] = React.useState(false);
  const [raceLoaded, setRaceLoaded] = React.useState(false);
  const [racesPerDay, setRacesPerDay] = React.useState(1);
  const [pitsPerRace, setPitsPerRace] = React.useState(1);
  const [filter, setFilter] = React.useState('');

  const canAnalyze = qualiLoaded || raceLoaded;
  const filtered = MOCK_HISTORY.filter(h =>
    !filter || [h.date, h.event, h.sessionType, h.winner].join(' ').toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div onClick={() => setQualiLoaded(v => !v)}>
          <UploadZone icon="⏱" label="Квалификация (Q)" loaded={qualiLoaded} filename={qualiLoaded ? 'quali_cityfight.pdf' : null} />
        </div>
        <div onClick={() => setRaceLoaded(v => !v)}>
          <UploadZone icon="🏁" label="Гонка (R)" loaded={raceLoaded} filename={raceLoaded ? 'race_cityfight.pdf' : null} />
        </div>
      </div>

      <SessionConfig
        racesPerDay={racesPerDay} setRacesPerDay={setRacesPerDay}
        pitsPerRace={pitsPerRace} setPitsPerRace={setPitsPerRace}
      />

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <button
          onClick={canAnalyze ? onAnalyze : undefined}
          disabled={!canAnalyze}
          style={{
            padding: '14px 40px',
            background: canAnalyze
              ? 'linear-gradient(135deg, #e94560 0%, #c0392b 100%)'
              : 'linear-gradient(135deg, #e94560 0%, #c0392b 100%)',
            color: 'white', border: 'none', borderRadius: 10,
            fontSize: '1.1rem', fontWeight: 600, cursor: canAnalyze ? 'pointer' : 'not-allowed',
            opacity: canAnalyze ? 1 : 0.5,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)', fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}>Анализировать</button>
        {!canAnalyze && (
          <div style={{ marginTop: 8, fontSize: '0.8rem', color: KA_COLORS.textDim }}>
            Загрузите хотя бы один PDF для анализа
          </div>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: '1.1rem', color: KA_COLORS.textDim, marginBottom: 12, borderBottom: `1px solid ${KA_COLORS.border}`, paddingBottom: 8 }}>
          Сохранённые результаты <CloudBadge />
        </h2>
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="🔍 Поиск: дата, событие, пилот..."
          style={{
            width: '100%', background: KA_COLORS.bgCardAlt, color: KA_COLORS.text,
            border: `1px solid ${KA_COLORS.border}`, borderRadius: 8, padding: '8px 12px',
            fontSize: '0.85rem', marginBottom: 12, outline: 'none', fontFamily: 'inherit',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(item => (
            <HistoryItem key={item.id} item={item} onLoad={onAnalyze} />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { UploadScreen });
