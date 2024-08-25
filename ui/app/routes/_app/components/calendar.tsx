import { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const DAYS_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土'];

const CalendarEvent = ({ event }) => (
  <div className="text-xs mt-1 p-1 bg-blue-100 rounded shadow-sm hover:bg-blue-200 transition-colors">
    <span className="font-semibold">{event.time}</span> {event.title}
  </div>
);

const EventModal = ({ onClose, onAdd, selectedDate }) => {
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.time) {
      onAdd(newEvent);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">予定を追加 ({selectedDate}日)</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="タイトル"
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          />
          <input
            type="time"
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={newEvent.time}
            onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({
    '2024-7-20': [
      { title: '会議', time: '10:00' },
      { title: 'ランチミーティング', time: '12:30' }
    ],
    '2024-7-22': [
      { title: 'プロジェクト締め切り', time: '15:00' }
    ],
    '2024-7-25': [
      { title: '歯医者の予約', time: '14:00' }
    ],
    '2024-7-28': [
      { title: '誕生日パーティー', time: '18:00' }
    ]
  });

  const daysInMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), [currentDate]);
  const firstDayOfMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(), [currentDate]);

  const prevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const openEventModal = useCallback((date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  }, []);

  const closeEventModal = useCallback(() => {
    setShowEventModal(false);
    setSelectedDate(null);
  }, []);

  const addEvent = useCallback((newEvent) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`;
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));
  }, [currentDate, selectedDate]);

  const renderCalendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-50 border-r border-b border-gray-200"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
      const dayEvents = events[dateKey] || [];
      const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
      days.push(
        <div key={i} className="bg-white border-r border-b border-gray-200 p-2 h-32 overflow-y-auto transition-colors hover:bg-gray-50">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium ${isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>{i}</span>
            <button onClick={() => openEventModal(i)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          {dayEvents.map((event, index) => (
            <CalendarEvent key={index} event={event} />
          ))}
        </div>
      );
    }
    return days;
  }, [currentDate, daysInMonth, events, firstDayOfMonth, openEventModal]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center font-semibold p-2 bg-gray-100 border-r border-b border-gray-200 text-sm text-gray-700">
            {day}
          </div>
        ))}
        {renderCalendarDays}
      </div>
      {showEventModal && (
        <EventModal
          onClose={closeEventModal}
          onAdd={addEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};
