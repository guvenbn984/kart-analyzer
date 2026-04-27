// Header.jsx — App header with gradient title + back/info bar

function AppHeader({ onBack, showBack, headerInfo }) {
  const [hoverBack, setHoverBack] = React.useState(false);
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderBottom: `1px solid ${KA_COLORS.border}`,
      padding: '20px 30px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
    }}>
      <h1 style={{
        fontSize: '1.6rem', fontWeight: 700, margin: 0,
        background: 'linear-gradient(135deg, #e94560 0%, #ff9800 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>Kart Race Analyzer</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {showBack && (
          <button
            onClick={onBack}
            onMouseEnter={() => setHoverBack(true)}
            onMouseLeave={() => setHoverBack(false)}
            style={{
              padding: '6px 16px', background: 'transparent',
              color: hoverBack ? KA_COLORS.text : KA_COLORS.textDim,
              border: `1px solid ${hoverBack ? KA_COLORS.blue : KA_COLORS.border}`,
              borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}>← Назад</button>
        )}
        {headerInfo && (
          <div style={{ color: KA_COLORS.textDim, fontSize: '0.85rem' }}>{headerInfo}</div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AppHeader });
