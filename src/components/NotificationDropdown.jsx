import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { useSharedData } from '../contexts/SharedDataContext';

export const NotificationDropdown = ({ userRole }) => {
  const { assignments, reports, attendance, getAttendanceRate } = useSharedData();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userRole === 'admin') {
      // Admin: low attendance, new reports, recent attendance
      const newNotifications = [];

      assignments.forEach(assignment => {
        const rate = getAttendanceRate(assignment.studentId);
        if (rate < 75 && rate > 0) {
          newNotifications.push({
            id: `att-${assignment.studentId}`,
            title: '⚠️ Low Attendance Alert',
            description: `${assignment.studentName} (${assignment.rollNumber}) has ${rate}% attendance.`,
            timestamp: new Date(),
            read: false,
            type: 'warning',
          });
        }
      });

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      reports.forEach(report => {
        const reportDate = new Date(report.date);
        if (reportDate >= oneDayAgo) {
          newNotifications.push({
            id: `rep-${report.id}`,
            title: '📋 New Report Submitted',
            description: `${report.studentName} submitted a report: "${report.title}"`,
            timestamp: reportDate,
            read: false,
            type: 'info',
          });
        }
      });

      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      attendance.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate >= threeDaysAgo && !newNotifications.some(n => n.id === `att-${record.studentId}` && n.type === 'warning')) {
          newNotifications.push({
            id: `att-${record.id}`,
            title: '📅 Attendance Logged',
            description: `${record.studentName} marked ${record.status} on ${record.date} (${record.hoursWorked}h)`,
            timestamp: recordDate,
            read: false,
            type: 'info',
          });
        }
      });

      const sorted = newNotifications.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
      setNotifications(sorted);
      setUnreadCount(sorted.filter(n => !n.read).length);
    } else if (userRole === 'company') {
      // Company: application updates, interview schedules, etc.
      const companyNotifications = [
        { id: 1, title: '✨ New Application Received', description: 'A student applied to "Software Engineer Intern"', timestamp: new Date(), read: false },
        { id: 2, title: '📅 Interview Scheduled', description: 'You have an interview with Arjun Sharma tomorrow at 10:00 AM', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: true },
        { id: 3, title: '📊 Application Review', description: 'Pending review for 3 applications', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), read: false },
      ];
      setNotifications(companyNotifications);
      setUnreadCount(companyNotifications.filter(n => !n.read).length);
    } else {
      // Student: application updates, interview reminders, etc.
      const studentNotifications = [
        { id: 1, title: '📝 Application Update', description: 'Your application for Google is under review', timestamp: new Date(), read: false },
        { id: 2, title: '🎯 Interview Scheduled', description: 'Microsoft interview on March 15 at 2:00 PM', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), read: false },
        { id: 3, title: '📄 New Opportunity', description: 'Amazon has posted a new internship', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: true },
      ];
      setNotifications(studentNotifications);
      setUnreadCount(studentNotifications.filter(n => !n.read).length);
    }
  }, [userRole, assignments, reports, attendance, getAttendanceRate]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount(prev => prev - 1);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 dark:bg-gray-800 dark:border-gray-700" align="end">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 className="font-semibold dark:text-gray-100">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="dark:text-gray-300 dark:hover:bg-gray-700">
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">No notifications</div>
          ) : (
            <div className="divide-y dark:divide-gray-700">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className="text-sm font-medium dark:text-gray-100">{notification.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};