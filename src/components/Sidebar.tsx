import React from 'react';
import { ChevronRight, ShieldCheck, PlusCircle } from 'lucide-react';
import { SIDEBAR_CONFIG, type UserRoleKey, type SidebarSection } from '@/config/sidebarConfig';

export interface SidebarProps {
  userRole: string;
  activePath?: string;
  onNavigate?: (path: string, name: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  activePath = '/overview',
  onNavigate,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  // Normalize userRole to match SIDEBAR_CONFIG keys
  const getRoleKey = (role: string): UserRoleKey => {
    if (role === 'Corporate HQ' || role === 'Corporate Management') {
      return 'Corporate Management';
    }
    if (role in SIDEBAR_CONFIG) {
      return role as UserRoleKey;
    }
    return 'Mine Official';
  };

  const roleKey = getRoleKey(userRole);
  const sections: SidebarSection[] = SIDEBAR_CONFIG[roleKey] || SIDEBAR_CONFIG['Mine Official'];

  const isCorporate = userRole === 'Corporate Management' || userRole === 'Corporate HQ';
  const contextLine1 = isCorporate ? 'CIL HEADQUARTERS' : 'JHARIA COLLIERY';
  const contextLine2 = isCorporate ? 'All Subsidiaries' : 'Block IV · Pit 07';

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out bg-[#1E293B] text-slate-300 flex flex-col shrink-0 border-r border-slate-700/60 z-30 select-none h-full`}
    >
      {/* --------------------------------------------------------------------- */}
      {/* BRAND & MINING IDENTITY HEADER */}
      {/* --------------------------------------------------------------------- */}
      <div className="h-16 px-4 bg-[#0F172A] border-b border-slate-700/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* New Logo Image */}
          <div className="h-10 w-auto flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Mine Parivar Logo" className="h-[40px] w-auto object-contain" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm tracking-wider text-white uppercase truncate flex items-center gap-1.5">
                Mine Parivar <span className="text-[#F59E0B] text-[10px] px-1 py-0.5 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40">GOV</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight truncate">
                DGMS / CIL Smart Governance
              </span>
            </div>
          )}
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
          </button>
        )}
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* DYNAMIC CONTEXT HEADER CARD (BELOW LOGO, ABOVE NAVIGATION MENU)        */}
      {/* --------------------------------------------------------------------- */}
      {!isCollapsed ? (
        <div className="mx-3 mt-3 mb-1 p-3 bg-slate-900/80 border border-slate-700/60 rounded-lg shadow-sm shrink-0">
          <div className="font-bold text-sm text-white uppercase tracking-wide truncate">
            {contextLine1}
          </div>
          <div className="text-xs text-slate-400 mt-0.5 truncate font-sans">
            {contextLine2}
          </div>
          <div className="text-[11px] font-mono text-[#10B981] mt-1.5 flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
            <span>● Live telemetry</span>
          </div>
        </div>
      ) : (
        <div
          className="mx-2 mt-2 mb-1 p-2 bg-slate-900/80 border border-slate-700/60 rounded-lg text-center shrink-0"
          title={`${contextLine1} - ${contextLine2}`}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* FIELD INSPECTOR CTA BUTTON */}
      {/* --------------------------------------------------------------------- */}
      {userRole === 'Field Inspector' && !isCollapsed && (
        <div className="px-3 pb-2 shrink-0">
          <button
            onClick={() => onNavigate?.('/field/new-inspection', '+ New Inspection')}
            className="
              w-full flex items-center justify-center gap-2
              px-4 py-3 rounded-xl
              bg-[#F59E0B] hover:bg-[#FBBF24] active:bg-[#D97706]
              text-[#0F172A] font-extrabold text-xs tracking-widest uppercase
              shadow-lg shadow-amber-900/30
              border border-[#FBBF24]/60
              transition-all duration-150
              hover:shadow-amber-500/40 hover:shadow-xl hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            <PlusCircle className="h-4 w-4 shrink-0" />
            + New Inspection
          </button>
        </div>
      )}
      {userRole === 'Field Inspector' && isCollapsed && (
        <div className="px-2 pb-2 shrink-0">
          <button
            onClick={() => onNavigate?.('/field/new-inspection', '+ New Inspection')}
            title="+ New Inspection"
            className="
              w-full flex items-center justify-center
              p-2.5 rounded-xl
              bg-[#F59E0B] hover:bg-[#FBBF24]
              text-[#0F172A]
              shadow-md shadow-amber-900/30
              transition-all duration-150 hover:scale-105
            "
          >
            <PlusCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* SECTIONED NAVIGATION ITEMS */}
      {/* --------------------------------------------------------------------- */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            {/* Section Title: Small, uppercase, greyed-out text */}
            {!isCollapsed && (
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 pt-1 pb-1">
                {section.title}
              </div>
            )}

            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === item.path || activePath === item.name;

                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate?.(item.path, item.name)}
                    title={isCollapsed ? item.name : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#0F172A] text-[#F59E0B] border-l-4 border-[#F59E0B] shadow-inner font-bold'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* --------------------------------------------------------------------- */}
      {/* BOTTOM SAFETY STATUS CARD */}
      {/* --------------------------------------------------------------------- */}
      <div className="p-3 border-t border-slate-700/80 bg-[#0F172A] shrink-0">
        {!isCollapsed ? (
          <div className="bg-[#1E293B] border border-slate-700/60 rounded p-2.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">SHIFT B (Underground)</span>
              <span className="text-[#10B981] font-bold">STABLE</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#10B981] h-full w-[94.8%]" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Safe Man-Hours: 1,840h</span>
              <span className="text-[#F59E0B]">94.8%</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-[#10B981]" title="Shift B: Safe (94.8%)">
            <ShieldCheck className="h-5 w-5" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
