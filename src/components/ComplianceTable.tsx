import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, MapPin, Clock, User, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionItem {
  id: string;
  issue: string;
  location: string;
  dueDate: string;
  assignedTo: string;
  status: string;
}

const mockActions: Record<string, ActionItem[]> = {
  "Today's Inspection Queue": [
    { id: '1', issue: 'Ventilation Fan V-04 Check', location: 'Seam III North', dueDate: 'Today, 14:00', assignedTo: 'Inspector R. Sharma', status: 'Scheduled' },
    { id: '2', issue: 'Haul Road Dust Suppression', location: 'Pit 2 Ramp', dueDate: 'Today, 16:30', assignedTo: 'Team Alpha', status: 'Pending' },
  ],
  "Overdue Actions": [
    { id: '3', issue: 'Roof Bolting Validation', location: 'Underground Face 4B', dueDate: 'Yesterday', assignedTo: 'Safety Officer K. Patel', status: 'Overdue' },
    { id: '4', issue: 'Equipment Audit (Excavator #12)', location: 'East Block', dueDate: '2 Days Ago', assignedTo: 'Maint. Team', status: 'Overdue' },
  ],
  "Compliance Due Soon": [
    { id: '5', issue: 'Monthly Water Quality Report', location: 'Effluent Plant', dueDate: 'In 2 days', assignedTo: 'Env. Engineer S. Das', status: 'Pending' },
    { id: '6', issue: 'Noise Level Assessment', location: 'Crusher Zone', dueDate: 'In 3 days', assignedTo: 'Inspector R. Sharma', status: 'Scheduled' },
  ],
  "Recently Closed Actions": [
    { id: '7', issue: 'Explosives Magazine Audit', location: 'Magazine Zone A', dueDate: 'Yesterday', assignedTo: 'Inspector R. Sharma', status: 'Closed' },
  ]
};

const statusColors: Record<string, string> = {
  'Scheduled': 'bg-blue-100 text-blue-700 border-blue-200',
  'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
  'Overdue': 'bg-red-100 text-red-700 border-red-200',
  'Closed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export const ComplianceTable: React.FC = () => {
  const tabs = Object.keys(mockActions);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-sans">
      <div className="px-5 py-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#D97706] shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm tracking-tight text-slate-900">
              Mine Safety &amp; Compliance Register
            </h3>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Action items and compliance tracking based on DGMS standards
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-slate-100 border border-slate-200">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F1F5F9] border-b border-slate-200 hover:bg-[#F1F5F9]">
                      <TableHead className="text-slate-700 font-bold text-[11px] uppercase tracking-wider py-3">Issue/Action</TableHead>
                      <TableHead className="text-slate-700 font-bold text-[11px] uppercase tracking-wider py-3">Location/Zone</TableHead>
                      <TableHead className="text-slate-700 font-bold text-[11px] uppercase tracking-wider py-3">Due Date</TableHead>
                      <TableHead className="text-slate-700 font-bold text-[11px] uppercase tracking-wider py-3">Assigned To</TableHead>
                      <TableHead className="text-slate-700 font-bold text-[11px] uppercase tracking-wider py-3">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white divide-y divide-slate-100">
                    {mockActions[tab].length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-10 text-center text-slate-400 font-mono text-xs">
                          No actions found for this category.
                        </TableCell>
                      </TableRow>
                    ) : (
                      mockActions[tab].map((row) => (
                        <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer">
                          <TableCell className="py-3 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-2">
                              {row.status === 'Overdue' ? <AlertCircle className="h-4 w-4 text-red-500" /> : row.status === 'Closed' ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <AlertTriangle className="h-4 w-4 text-amber-500" />}
                              {row.issue}
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                              <MapPin className="h-3 w-3 text-slate-400" />
                              {row.location}
                            </div>
                          </TableCell>
                          <TableCell className="py-3 text-slate-600 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3 text-slate-400" />
                              {row.dueDate}
                            </div>
                          </TableCell>
                          <TableCell className="py-3 text-slate-600 text-xs">
                            <div className="flex items-center gap-1.5">
                              <User className="h-3 w-3 text-slate-400" />
                              {row.assignedTo}
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center",
                              statusColors[row.status] || statusColors['Pending']
                            )}>
                              {row.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ComplianceTable;
