import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface DashboardNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const navigationItems = [
  {
    id: 'overview',
    name: 'Overview',
    icon: 'home',
    description: 'Today\'s summary'
  },
  {
    id: 'workouts',
    name: 'Workouts',
    icon: 'dumbbell',
    description: 'Log & track workouts'
  },
  {
    id: 'goals',
    name: 'Goals',
    icon: 'target',
    description: 'Set & manage goals'
  },
  {
    id: 'progress',
    name: 'Progress',
    icon: 'bar_chart',
    description: 'View analytics'
  },
  {
    id: 'achievements',
    name: 'Achievements',
    icon: 'trophy',
    description: 'Badges & milestones'
  }
];

export function DashboardNavigation({ 
  activeTab, 
  onTabChange, 
  className = '' 
}: DashboardNavigationProps) {
  return (
           <div className={cn('bg-card-light rounded-xl shadow-card border border-stroke-card p-2', className)}>
         <div className="flex space-x-1">
           {navigationItems.map((item) => (
             <button
               key={item.id}
               onClick={() => onTabChange(item.id)}
               className={cn(
                 'flex-1 flex flex-col items-center py-2 sm:py-3 px-1 sm:px-2 rounded-lg transition-all duration-200',
                 activeTab === item.id
                   ? 'bg-accent-orange text-text-light border border-accent-orange'
                   : 'text-text-muted hover:text-text-card hover-bg-card-lighter'
               )}
             >
               <Icon 
                 name={item.icon as any} 
                 size={18} 
                 className={cn(
                   'mb-1',
                   activeTab === item.id ? 'text-text-light' : 'text-text-muted'
                 )} 
               />
               <span className="text-xs font-medium hidden sm:block">{item.name}</span>
             </button>
           ))}
         </div>
       </div>
  );
}
