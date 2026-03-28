import React from 'react';
import { motion } from 'motion/react';
import { Search, FileText, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export const QuickAccess = ({ onNavigate }) => {
  const quickActions = [
    { icon: Search, title: 'Find Internships', description: 'Browse available opportunities', color: 'from-gray-500 to-gray-600', page: 'opportunities' },
    { icon: BookOpen, title: 'Resource Library', description: 'Access guides and templates', color: 'from-gray-600 to-gray-700', page: 'resources' },
    { icon: Calendar, title: 'Event Calendar', description: 'View interviews and deadlines', color: 'from-gray-500 to-gray-600', page: 'calendar' },
    { icon: FileText, title: 'Offer Vault', description: 'Manage and compare offers', color: 'from-gray-500 to-gray-600', page: 'offers' },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your internship journey in one place
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => onNavigate && onNavigate(action.page)}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} dark:from-gray-700 dark:to-gray-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};