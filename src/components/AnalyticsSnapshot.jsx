import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

export const AnalyticsSnapshot = () => {
  const departmentStats = [
    { department: 'Computer Science', placed: 95, total: 100 },
    { department: 'Electronics', placed: 87, total: 95 },
    { department: 'Mechanical', placed: 78, total: 85 },
    { department: 'Civil', placed: 82, total: 90 },
  ];

  const recentActivities = [
    { type: 'placement', message: 'Sarah Johnson placed at Google', time: '2 hours ago' },
    { type: 'interview', message: '15 students scheduled for Microsoft interviews', time: '4 hours ago' },
    { type: 'application', message: '23 new applications for Amazon internship', time: '6 hours ago' },
    { type: 'company', message: 'Netflix added as placement partner', time: '1 day ago' },
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Analytics Dashboard</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Real-time insights into our campus placement performance</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <Card className="border-0 shadow-lg h-full dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="dark:text-gray-100">Department Wise Placement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {departmentStats.map((dept, index) => {
                  const percentage = Math.round((dept.placed / dept.total) * 100);
                  return (
                    <motion.div key={index} className="space-y-2" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{dept.department}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{dept.placed}/{dept.total}</span>
                      </div>
                      <Progress value={percentage} className="h-3 dark:bg-gray-700" />
                      <div className="text-right text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <Card className="border-0 shadow-lg h-full dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="dark:text-gray-100">Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }}>
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'placement' ? 'bg-green-500' : activity.type === 'interview' ? 'bg-blue-500' : activity.type === 'application' ? 'bg-gray-500 dark:bg-gray-400' : 'bg-purple-500'}`} />
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{activity.message}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};