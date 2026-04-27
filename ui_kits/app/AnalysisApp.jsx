// AnalysisApp.jsx — Tabbed analysis view with standings, pace, consistency, driver cards

const MOCK_RESULTS = [
  { position:1, driver:'Иванов',  kart:7,  laps:18, bestLap:'34.521', avgPace:'35.104', gap:'-',      posChange:+3, score:87 },
  { position:2, driver:'Петров',  kart:3,  laps:18, bestLap:'34.891', avgPace:'35.412', gap:'+2.1',   posChange: 0, score:79 },
  { position:3, driver:'Козлов',  kart:11, laps:18, bestLap:'35.012', avgPace:'35.720', gap:'+5.3',   posChange:-1, score:74 },
  { position:4, driver:'Сидоров', kart:5,  laps:17, bestLap:'35.448', avgPace:'37.102', gap:'+1 кр.', posChange:+2, score:51 },
  { position:5, driver:'Морозов', kart:9,  laps:17, bestLap:'35.801', avgPace:'36.440', gap:'+1 кр.', posChange:-2, score:63 },
  { position:6, driver:'Волков',  kart:2,  laps:17, bestLap:'36.120', avgPace:'36.890', gap:'+1 кр.', posChange: 0, score:58 },
];

const MOCK_PACE = [
  { driver:'Иванов',  avg:'35.104', best:'34.521', worst:'36.201', sd:'0.412', cleanLaps:16 },
  { driver:'Петров',  avg:'35.412', best:'34.891', worst:'36.540', sd:'0.531', cleanLaps:15 },
  { driver:'Козлов',  avg:'35.720', best:'35.012', worst:'37.100', sd:'0.689', cleanLaps:15 },
  { driver:'Сидоров', avg:'37.102', best:'35.448', worst:'41.200', sd:'1.820', cleanLaps:11 },
  { driver:'Морозов', avg:'36.440', best:'35.801', worst:'38.100', sd:'0.780', cleanLaps:14 },
  { driver:'Волков',  avg:'36.890', best:'36.120', worst:'39.400', sd:'0.990', cleanLaps:13 },
];

const SCORE_COLOR = s => s >= 80 ? '#4caf50' : s >= 65 ? '#8bc34a' : s >= 50 ? '#ffd54f' : s >= 35 ? '#ff9800' : '#e94560';

const TABS = [
  { id:'standings', label:'Итоги' },
  { id:'pace',      label:'Темп' },
  { id:'consistency', label:'Стабильность' },
  { id:'overall',   label:'Сводный рейтинг' },
];

function PosChange({ val }) {
  if (val > 0) return <span style={{ color:'#4caf50', fontWeight:600 }}>↑ +{val}</span>;
  if (val < 0) return <span style={{ color:'#e94560', fontWeight:600 }}>↓ {val}</span>;
  return <span style={{ color:KA_COLORS.textDim }}>—</span>;
}

function StandingsTab() {
  const podiumBorder = p => p===1?'gold':p===2?'silver':p===3?'#cd7f32':null;
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:24 }}>
        <SummaryCard value="6" label="Пилотов" color={KA_COLORS.accent} />
        <SummaryCard value="34.521" label="Лучший круг" color={KA_COLORS.green} />
        <SummaryCard value="18" label="Кругов" color={KA_COLORS.blue} />
        <SummaryCard value="Иванов" label="Победитель" color={KA_COLORS.accent} />
      </div>
      <Card title="Итоговая классификация">
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
            <thead>
              <tr>{['Место','Пилот','Карт','Кругов','Лучший круг','Средний темп','Разрыв','Δ Позиция'].map(h=>(
                <th key={h} style={{ background:KA_COLORS.bgCardAlt, padding:'10px 12px', textAlign:'left', fontWeight:600, color:KA_COLORS.blue, borderBottom:`2px solid ${KA_COLORS.border}`, whiteSpace:'nowrap' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {MOCK_RESULTS.map((r,i) => (
                <tr key={r.driver} style={{ background: i%2===0?'transparent':'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}`, borderLeft: podiumBorder(r.position) ? `3px solid ${podiumBorder(r.position)}` : undefined, color:KA_COLORS.text }}>{r.position}</td>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.text, fontWeight:500 }}>{r.driver}</td>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>{r.kart}</td>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.text }}>{r.laps}</td>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}`, color: i===0?KA_COLORS.green:KA_COLORS.text, fontWeight: i===0?600:400 }}>{r.bestLap}</td>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}`, color: i===MOCK_RESULTS.length-1?KA_COLORS.accent:KA_COLORS.text }}>{r.avgPace}</td>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>{r.gap}</td>
                  <td style={{ padding:'8px 12px', borderBottom:`1px solid ${KA_COLORS.border}` }}><PosChange val={r.posChange} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function MiniBar({ value, max, color }) {
  return (
    <div style={{ flex:1, height:8, background:'rgba(255,255,255,0.06)', borderRadius:4, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${(value/max)*100}%`, background:color, borderRadius:4, transition:'width 0.5s ease' }}></div>
    </div>
  );
}

function DriverRatingCard({ driver, score, idx }) {
  const color = SCORE_COLOR(score);
  const metrics = [
    { label:'Темп (30%)',         val:Math.round(score*1.05), color:'#4caf50',  max:100 },
    { label:'Лучший круг (20%)',  val:Math.round(score*0.98), color:'#4fc3f7',  max:100 },
    { label:'Стабильность (25%)', val:Math.round(score*0.92), color:'#ffd54f',  max:100 },
    { label:'Мастерство (15%)',   val:Math.round(score*0.88), color:'#ff9800',  max:100 },
    { label:'Шины (10%)',         val:Math.round(score*1.02), color:'#ab47bc',  max:100 },
  ].map(m => ({ ...m, val: Math.min(m.val, 100) }));

  return (
    <div style={{ background:KA_COLORS.bgCardAlt, border:`1px solid ${KA_COLORS.border}`, borderRadius:10, padding:'14px 16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <span style={{ fontWeight:700, fontSize:'1rem', color:KA_COLORS.text }}>{driver}</span>
        <span style={{ fontSize:'1.6rem', fontWeight:800, color, minWidth:52, textAlign:'center' }}>{score}</span>
      </div>
      {metrics.map(m => (
        <div key={m.label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5, fontSize:'0.75rem' }}>
          <span style={{ width:120, flexShrink:0, color:KA_COLORS.textDim }}>{m.label}</span>
          <MiniBar value={m.val} max={m.max} color={m.color} />
          <span style={{ width:32, textAlign:'right', color:KA_COLORS.textDim, flexShrink:0 }}>{m.val}</span>
        </div>
      ))}
    </div>
  );
}

function PaceTab() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
      <Card title="Анализ темпа">
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
            <thead>
              <tr>{['Пилот','Средний','Лучший','Худший','StdDev','Чистых кр.'].map(h=>(
                <th key={h} style={{ background:KA_COLORS.bgCardAlt, padding:'8px 10px', textAlign:'left', fontWeight:600, color:KA_COLORS.blue, borderBottom:`2px solid ${KA_COLORS.border}`, whiteSpace:'nowrap' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {MOCK_PACE.map((r,i)=>(
                <tr key={r.driver} style={{ background:i%2===0?'transparent':'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.text, fontWeight:500 }}>{r.driver}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:i===0?KA_COLORS.green:KA_COLORS.text, fontWeight:i===0?600:400 }}>{r.avg}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.green }}>{r.best}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.accent }}>{r.worst}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>{r.sd}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>{r.cleanLaps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card title="Средний темп (визуализация)">
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:8 }}>
          {MOCK_PACE.map((r,i)=>{
            const best = parseFloat(MOCK_PACE[0].avg);
            const val = parseFloat(r.avg);
            const pct = Math.max(10, 100 - ((val - best) / best * 100 * 30));
            return (
              <div key={r.driver} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ width:70, fontSize:'0.8rem', color:KA_COLORS.textDim, flexShrink:0 }}>{r.driver}</span>
                <div style={{ flex:1, height:20, background:'rgba(255,255,255,0.04)', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background: KA_DRIVER_COLORS[i], borderRadius:4, opacity:0.85 }}></div>
                </div>
                <span style={{ fontSize:'0.8rem', color:KA_COLORS.text, width:50, textAlign:'right' }}>{r.avg}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function ConsistencyTab() {
  return (
    <Card title="Стабильность пилотов">
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
          <thead>
            <tr>{['Пилот','StdDev','CV%','Средний','Кругов','Оценка'].map(h=>(
              <th key={h} style={{ background:KA_COLORS.bgCardAlt, padding:'8px 10px', textAlign:'left', fontWeight:600, color:KA_COLORS.blue, borderBottom:`2px solid ${KA_COLORS.border}`, whiteSpace:'nowrap' }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {MOCK_PACE.map((r,i)=>{
              const cv = ((parseFloat(r.sd)/parseFloat(r.avg))*100).toFixed(2);
              return (
                <tr key={r.driver} style={{ background:i%2===0?'transparent':'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.text, fontWeight:500 }}>{r.driver}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:i===0?KA_COLORS.green:KA_COLORS.text, fontWeight:i===0?600:400 }}>{r.sd}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>{cv}%</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>{r.avg}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>{r.cleanLaps}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}` }}>
                    <span style={{ color: SCORE_COLOR(100 - i*15), fontWeight:600 }}>{100 - i*15}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function OverallTab() {
  return (
    <div>
      <Card title="Сводный рейтинг по всем гонкам">
        <p style={{ fontSize:'0.8rem', color:KA_COLORS.textDim, marginBottom:16, lineHeight:1.6 }}>
          Рейтинг рассчитывается как среднее значение по всем сохранённым гонкам, в которых участвовал пилот.
          Чем больше гонок — тем точнее оценка.
        </p>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
            <thead>
              <tr>{['Пилот','Гонок','Средний балл','Темп','Стабильность','Мастерство'].map(h=>(
                <th key={h} style={{ background:KA_COLORS.bgCardAlt, padding:'8px 10px', textAlign:'left', fontWeight:600, color:KA_COLORS.blue, borderBottom:`2px solid ${KA_COLORS.border}` }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {MOCK_RESULTS.map((r,i)=>(
                <tr key={r.driver} style={{ background:i%2===0?'transparent':'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.text, fontWeight:500 }}>{r.driver}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.textDim }}>3</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:SCORE_COLOR(r.score), fontWeight:700 }}>{r.score}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.green }}>{Math.round(r.score*1.05 > 100 ? 100 : r.score*1.05)}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.yellow }}>{Math.round(r.score*0.92)}</td>
                  <td style={{ padding:'7px 10px', borderBottom:`1px solid ${KA_COLORS.border}`, color:KA_COLORS.orange }}>{Math.round(r.score*0.88)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <h3 style={{ fontSize:'1.1rem', color:KA_COLORS.blue, marginBottom:14 }}>Карточки пилотов (сводные)</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
        {MOCK_RESULTS.map((r,i) => <DriverRatingCard key={r.driver} driver={r.driver} score={r.score} idx={i} />)}
      </div>
    </div>
  );
}

function AnalysisApp({ onBack }) {
  const [tab, setTab] = React.useState('standings');
  return (
    <div style={{ maxWidth:1400, margin:'0 auto', padding:20 }}>
      <EventInfoBar date="12.04.2024" time="14:30:00" event="CityFight" track="Lemans City" category="Любители" />
      <TabNav tabs={TABS} active={tab} onTab={setTab} />
      {tab === 'standings'    && <StandingsTab />}
      {tab === 'pace'         && <PaceTab />}
      {tab === 'consistency'  && <ConsistencyTab />}
      {tab === 'overall'      && <OverallTab />}
    </div>
  );
}

Object.assign(window, { AnalysisApp });
