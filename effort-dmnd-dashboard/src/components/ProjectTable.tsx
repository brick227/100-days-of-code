import type { Project } from '../types';
import Badge from './Badge';
import PhaseBar from './PhaseBar';
import { formatDate } from '../utils/helpers';

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontWeight: 700,
  color: '#374151',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  whiteSpace: 'nowrap',
  background: '#f9fafb',
  borderBottom: '2px solid #e5e7eb',
  position: 'sticky',
  top: 0,
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: '9px 12px',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  color: '#374151',
  borderBottom: '1px solid #f3f4f6',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectTable({ projects, onEdit, onDelete }: ProjectTableProps) {
  function handleDelete(project: Project) {
    if (window.confirm(`Delete project "${project.projectName}"? This cannot be undone.`)) {
      onDelete(project.id);
    }
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: '0 0 8px 8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1800 }}>
        <thead>
          <tr>
            <th style={thStyle}>Demand #</th>
            <th style={thStyle}>Project Name</th>
            <th style={thStyle}>Service Manager</th>
            <th style={thStyle}>Demand Manager</th>
            <th style={thStyle}>Technical Lead</th>
            <th style={thStyle}>Project Manager</th>
            <th style={thStyle}>Date Assigned</th>
            <th style={thStyle}>TIM Scheduled</th>
            <th style={thStyle}>Tech Narrative</th>
            <th style={thStyle}>ROM</th>
            <th style={thStyle}>Project Authorized</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Project Kickoff</th>
            <th style={thStyle}>Schedule Baselined</th>
            <th style={thStyle}>Baseline Finish</th>
            <th style={thStyle}>Date Completed</th>
            <th style={{ ...thStyle, minWidth: 200 }}>Phase Progress</th>
            <th style={{ ...thStyle, minWidth: 180 }}>Notes</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 && (
            <tr>
              <td colSpan={19} style={{ ...tdStyle, textAlign: 'center', color: '#9ca3af', padding: '32px 12px' }}>
                No projects found.
              </td>
            </tr>
          )}
          {projects.map((project, idx) => {
            const isDelayed = project.projectStatus === 'DELAYED';
            const isAtRisk = project.projectStatus === 'AT RISK';
            const rowBg = isDelayed
              ? '#fff5f5'
              : isAtRisk
              ? '#fffbeb'
              : idx % 2 === 0 ? '#fff' : '#fafafa';
            const leftBorder = isDelayed
              ? '3px solid #ef4444'
              : isAtRisk
              ? '3px solid #f59e0b'
              : '3px solid transparent';

            return (
              <tr key={project.id} style={{ background: rowBg, borderLeft: leftBorder }}>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: '#1d4ed8', fontWeight: 700 }}>
                  {project.demandNum}
                </td>
                <td style={{ ...tdStyle, fontWeight: 600, color: '#111827', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {project.projectName}
                </td>
                <td style={tdStyle}>{project.serviceManager || '—'}</td>
                <td style={tdStyle}>{project.demandManager || '—'}</td>
                <td style={tdStyle}>{project.technicalLead || '—'}</td>
                <td style={tdStyle}>{project.projectManager || '—'}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(project.dateAssigned)}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(project.timScheduled)}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{project.techNarrative || '—'}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#374151' }}>{project.rom || '—'}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(project.projectAuthorized)}</td>
                <td style={tdStyle}><Badge value={project.projectStatus} type="status" /></td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(project.projectKickoff)}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(project.scheduleBaselined)}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(project.baselineFinish)}</td>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(project.dateCompleted)}</td>
                <td style={{ ...tdStyle, minWidth: 200 }}>
                  <PhaseBar currentPhase={project.currentPhase} />
                </td>
                <td style={{ ...tdStyle, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', color: '#9ca3af', fontSize: 11 }}>
                  {project.notes || '—'}
                </td>
                <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                  <button
                    onClick={() => onEdit(project)}
                    style={{
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      border: '1px solid #bfdbfe',
                      borderRadius: 5,
                      padding: '4px 10px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginRight: 6,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    style={{
                      background: '#fff5f5',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                      borderRadius: 5,
                      padding: '4px 10px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
