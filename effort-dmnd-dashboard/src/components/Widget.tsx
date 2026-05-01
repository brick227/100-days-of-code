import type { Project } from '../types';

interface WidgetProps {
  projects: Project[];
}

export default function Widget({ projects }: WidgetProps) {
  const total = projects.length;
  const active = projects.filter(p => p.projectStatus === 'ACTIVE').length;
  const atRisk = projects.filter(p => p.projectStatus === 'AT RISK').length;
  const delayed = projects.filter(p => p.projectStatus === 'DELAYED').length;
  const complete = projects.filter(p => p.projectStatus === 'COMPLETE').length;

  const cards = [
    { label: 'Total Projects', value: total, borderColor: '#1d4ed8' },
    { label: 'Active',         value: active, borderColor: '#10b981' },
    { label: 'At Risk',        value: atRisk, borderColor: '#f59e0b' },
    { label: 'Delayed',        value: delayed, borderColor: '#ef4444' },
    { label: 'Complete',       value: complete, borderColor: '#6366f1' },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
      {cards.map(card => (
        <div
          key={card.label}
          style={{
            flex: '1 1 140px',
            background: '#fff',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            borderTop: `4px solid ${card.borderColor}`,
            padding: '16px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: '#9ca3af',
            marginBottom: 8,
          }}>
            {card.label}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 32,
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1,
          }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
