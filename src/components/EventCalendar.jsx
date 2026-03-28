import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Bell, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const eventTypes = {
  interview: { color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800', icon: '🎯' },
  'company-visit': { color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800', icon: '🏢' },
  training: { color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800', icon: '📚' },
  webinar: { color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800', icon: '💻' },
  deadline: { color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800', icon: '⏰' },
  other: { color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700', icon: '📅' },
};

export function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [showEventDialog, setShowEventDialog] = useState(false);

  const events = [
    { id: '1', title: 'Technical Interview - Google', type: 'interview', date: new Date(2024, 11, 28), time: '2:00 PM', duration: '1 hour', location: 'Virtual - Google Meet', description: 'Technical round focusing on DSA and system design', organizer: 'Google Recruitment Team', isReminder: true },
    { id: '2', title: 'Microsoft Campus Drive', type: 'company-visit', date: new Date(2024, 11, 30), time: '10:00 AM', duration: '4 hours', location: 'College Auditorium', description: 'On-campus recruitment drive for SDE positions', organizer: 'Placement Cell', attendees: 150 },
    { id: '3', title: 'Resume Building Workshop', type: 'training', date: new Date(2024, 11, 25), time: '4:00 PM', duration: '2 hours', location: 'Seminar Hall 201', description: 'Learn to craft compelling resumes that get noticed', organizer: 'Career Services', attendees: 75 },
    { id: '4', title: 'AI/ML Trends Webinar', type: 'webinar', date: new Date(2024, 11, 27), time: '6:00 PM', duration: '1.5 hours', location: 'Online', description: 'Industry experts discuss latest trends in AI/ML', organizer: 'Tech Alumni Network', attendees: 200 },
    { id: '5', title: 'Internship Application Deadline', type: 'deadline', date: new Date(2024, 11, 31), time: '11:59 PM', duration: '', location: 'Online Portal', description: 'Last date for summer internship applications', organizer: 'Placement Cell' },
  ];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getEventsForDate = (date) => events.filter(event => event.date.toDateString() === date.toDateString() && (filterType === 'all' || event.type === filterType));
  const navigateMonth = (direction) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1), 1));

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-24"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <motion.div key={day} whileHover={{ scale: 1.02 }} onClick={() => setSelectedDate(date)}
          className={`h-24 p-2 border border-gray-100 dark:border-gray-700 cursor-pointer relative overflow-hidden ${
            isToday ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          } ${isSelected ? 'ring-2 ring-orange-500 dark:ring-orange-400' : ''}`}>
          <div className={`text-sm font-medium ${isToday ? 'text-orange-600 dark:text-orange-400' : 'text-gray-800 dark:text-gray-200'}`}>{day}</div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                className={`text-xs p-1 rounded truncate ${eventTypes[event.type].color}`}>
                {eventTypes[event.type].icon} {event.title}
              </motion.div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">+{dayEvents.length - 2} more</div>}
          </div>
        </motion.div>
      );
    }
    return days;
  };

  const upcomingEvents = events.filter(event => event.date >= new Date() && (filterType === 'all' || event.type === filterType)).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-orange-500 dark:text-orange-400" />
            Event Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Stay updated with interviews, deadlines, and campus events</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="interview">Interviews</SelectItem>
              <SelectItem value="company-visit">Company Visits</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="webinar">Webinars</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md dark:bg-gray-800 dark:border-gray-700">
              <DialogHeader>
                <DialogTitle className="dark:text-gray-100">Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Event title" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <Select>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Event type" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="company-visit">Company Visit</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <Input type="time" placeholder="Time" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <Input placeholder="Location" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <Textarea placeholder="Description" rows={3} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowEventDialog(false)} className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">Create Event</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl dark:text-gray-100">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')} className="text-white hover:bg-white hover:bg-opacity-20">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')} className="text-white hover:bg-white hover:bg-opacity-20">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">{renderCalendarGrid()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-gray-100">
                <Bell className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {upcomingEvents.map((event, index) => (
                  <motion.div key={event.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200 line-clamp-1">{event.title}</h4>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-600 dark:text-gray-400">
                          <Clock className="w-3 h-3" />{event.date.toLocaleDateString()} • {event.time}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-600 dark:text-gray-400">
                          <MapPin className="w-3 h-3" />{event.location}
                        </div>
                      </div>
                      <Badge variant="secondary" className={`text-xs ${eventTypes[event.type].color}`}>
                        {eventTypes[event.type].icon}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No upcoming events</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Events</span>
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">{events.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Interviews</span>
                <span className="font-semibold text-lg text-red-600 dark:text-red-400">{events.filter(e => e.type === 'interview').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Deadlines</span>
                <span className="font-semibold text-lg text-orange-600 dark:text-orange-400">{events.filter(e => e.type === 'deadline').length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {selectedDate && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-gray-100">
                  Events on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map((event) => (
                    <motion.div key={event.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">{event.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{event.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{event.time} ({event.duration})</div>
                            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location}</div>
                            {event.attendees && <div className="flex items-center gap-1"><Users className="w-4 h-4" />{event.attendees} attendees</div>}
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${eventTypes[event.type].color}`}>
                          {eventTypes[event.type].icon} {event.type.replace('-', ' ')}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No events scheduled for this day</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}