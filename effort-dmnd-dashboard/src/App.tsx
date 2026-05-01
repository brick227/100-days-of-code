import { useState, useMemo } from 'react';
import type { Project, CDRL } from './types';
import { PHASES } from './constants/phases';
import { MOCK_PROJECTS, MOCK_CDRLS } from './constants/mockData';
import Header from './components/Header';
import Widget from './components/Widget';
import ProjectTable from './components/ProjectTable';
import CDRLTable from './components/CDRLTable';
import ProjectModal from './components/ProjectModal';
import CDRLModal from './components/CDRLModal';

const PROJ_STATUSES = ['ACTIVE', 'DELAYED', 'AT RISK', 'ON HOLD', 'COMPLETE'];

const sectionCardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 10,
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  marginBottom: 28,
  overflow: 'hidden',
};

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 18px',
  borderBottom: '1px solid #e5e7eb',
  flexWrap: 'wrap' as const,
};

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  border: '1px solid #e5e7eb',
  borderRadius: 6,
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  color: '#374151',
  background: '#fff',
  cursor: 'pointer',
  outline: 'none',
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [cdrls, setCdrls] = useState<CDRL[]>(MOCK_CDRLS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [projModal, setProjModal] = useState<'add' | 'edit' | null>(null);
  const [cdrlModal, setCdrlModal] = useState<'add' | 'edit' | null>(null);
  const [editProject, setEditProject] = useState<Project | undefined>(undefined);
  const [editCDRL, setEditCDRL] = useState<CDRL | undefined>(undefined);

  const filteredProjects = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter(p => {
      const matchSearch = !q
        || p.demandNum.toLowerCase().includes(q)
        || p.projectName.toLowerCase().includes(q)
        || p.projectManager.toLowerCase().includes(q);
      const matchStatus = !statusFilter || p.projectStatus === statusFilter;
      const matchPhase = !phaseFilter || p.currentPhase === phaseFilter;
      return matchSearch && matchStatus && matchPhase;
    });
  }, [projects, search, statusFilter, phaseFilter]);

  function handleSaveProject(project: Project) {
    if (projModal === 'edit') {
      setProjects(ps => ps.map(p => p.id === project.id ? project : p));
    } else {
      setProjects(ps => [...ps, project]);
    }
    setProjModal(null);
    setEditProject(undefined);
  }

  function handleDeleteProject(id: string) {
    setProjects(ps => ps.filter(p => p.id !== id));
  }

  function handleSaveCDRL(cdrl: CDRL) {
    if (cdrlModal === 'edit') {
      setCdrls(cs => cs.map(c => c.id === cdrl.id ? cdrl : c));
    } else {
      setCdrls(cs => [...cs, cdrl]);
    }
    setCdrlModal(null);
    setEditCDRL(undefined);
  }

  function handleDeleteCDRL(id: string) {
    setCdrls(cs => cs.filter(c => c.id !== id));
  }

  function handleExport() {
    if (projects.length === 0) return;
    const headers = Object.keys(projects[0]) as (keyof Project)[];
    const rows = [
      headers.join(','),
      ...projects.map(p =>
        headers.map(h => {
          const val = String(p[h]);
          return val.includes(',') ? `"${val}"` : val;
        }).join(',')
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `effort-dmnd-projects-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const delayed = projects.filter(p => p.projectStatus === 'DELAYED').length;
  const atRisk = projects.filter(p => p.projectStatus === 'AT RISK').length;
  const capacity = projects.length;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {projModal && (
        <ProjectModal
          mode={projModal}
          project={editProject}
          projects={projects}
          onSave={handleSaveProject}
          onClose={() => { setProjModal(null); setEditProject(undefined); }}
        />
      )}
      {cdrlModal && (
        <CDRLModal
          mode={cdrlModal}
          cdrl={editCDRL}
          cdrls={cdrls}
          onSave={handleSaveCDRL}
          onClose={() => { setCdrlModal(null); setEditCDRL(undefined); }}
        />
      )}

      <Header
        onAddProject={() => { setEditProject(undefined); setProjModal('add'); }}
        onExport={handleExport}
      />

      <main style={{ padding: '24px 28px', maxWidth: 1700, margin: '0 auto' }}>
        <Widget projects={projects} />

        {/* Project Table Section */}
        <div style={sectionCardStyle}>
          <div style={toolbarStyle}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700, color: '#111827', marginRight: 'auto' }}>
              EFFORT DMND Project Status
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af', marginLeft: 10, fontWeight: 400 }}>
                {filteredProjects.length} / {projects.length} projects
              </span>
            </div>
            <input
              type="text"
              placeholder="Search demand #, name, PM…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                ...selectStyle,
                width: 240,
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <select value={phaseFilter} onChange={e => setPhaseFilter(e.target.value)} style={selectStyle}>
              <option value="">All Phases</option>
              {PHASES.map(ph => <option key={ph} value={ph}>{ph}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
              <option value="">All Statuses</option>
              {PROJ_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <ProjectTable
            projects={filteredProjects}
            onEdit={(project) => { setEditProject(project); setProjModal('edit'); }}
            onDelete={handleDeleteProject}
          />
        </div>

        {/* CDRL Table Section */}
        <div style={sectionCardStyle}>
          <div style={toolbarStyle}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700, color: '#111827', marginRight: 'auto' }}>
              Contract Deliverable List (CDRL)
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af', marginLeft: 10, fontWeight: 400 }}>
                {cdrls.length} deliverables
              </span>
            </div>
            <button
              onClick={() => { setEditCDRL(undefined); setCdrlModal('add'); }}
              style={{
                background: '#1d4ed8',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '7px 14px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Add CDRL
            </button>
          </div>
          <CDRLTable
            cdrls={cdrls}
            onEdit={(cdrl) => { setEditCDRL(cdrl); setCdrlModal('edit'); }}
            onDelete={handleDeleteCDRL}
          />
        </div>
      </main>

      <footer style={{
        padding: '14px 28px',
        borderTop: '1px solid #e5e7eb',
        background: '#fff',
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af' }}>
          CAPACITY: {capacity} / 75
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#ef4444' }}>
          DELAYED: {delayed}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#f59e0b' }}>
          AT RISK: {atRisk}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af', marginLeft: 'auto' }}>
          EFFORT DMND Dashboard © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
