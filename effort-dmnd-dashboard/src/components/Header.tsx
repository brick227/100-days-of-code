interface HeaderProps {
  onAddProject: () => void;
  onExport: () => void;
}

export default function Header({ onAddProject, onExport }: HeaderProps) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      padding: '12px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 20,
          fontWeight: 800,
          color: '#111827',
          letterSpacing: '-0.01em',
        }}>
          EFFORT DMND Project Status
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: '#9ca3af',
          marginTop: 2,
        }}>
          Contract Deliverable Tracker // Unified View
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#10b981',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#10b981',
            fontWeight: 700,
          }}>
            LIVE
          </span>
        </div>
        <button
          onClick={onAddProject}
          style={{
            background: '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '7px 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + Add Project
        </button>
        <button
          onClick={onExport}
          style={{
            background: 'transparent',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            padding: '7px 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Export
        </button>
      </div>
    </header>
  );
}
