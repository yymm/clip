import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sampleEvents = [
  { id: 1, title: '会議', start: new Date(2024, 6, 22, 10, 0), end: new Date(2024, 6, 22, 11, 30), color: '#4285F4' },
  { id: 2, title: 'ランチ', start: new Date(2024, 6, 22, 12, 0), end: new Date(2024, 6, 22, 13, 0), color: '#0F9D58' },
  { id: 3, title: 'プレゼン', start: new Date(2024, 6, 23, 14, 0), end: new Date(2024, 6, 23, 15, 0), color: '#DB4437' },
  { id: 4, title: 'ミーティング', start: new Date(2024, 6, 24, 9, 0), end: new Date(2024, 6, 24, 10, 30), color: '#F4B400' },
  { id: 5, title: 'チームビルディング', start: new Date(2024, 6, 22, 11, 0), end: new Date(2024, 6, 22, 12, 30), color: '#8E24AA' },
];

export const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 22));

  const getWeekDates = useCallback((date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(monday);
      nextDate.setDate(monday.getDate() + i);
      weekDates.push(nextDate);
    }
    return weekDates;
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric' };
    return date.toLocaleDateString('ja-JP', options);
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const weekDates = getWeekDates(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventPosition = (event) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    const top = `${startHour * 48}px`;
    const height = `${(endHour - startHour) * 48}px`;
    return { top, height };
  };

  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const getEventsForDate = (date) => {
    return sampleEvents.filter(event => isSameDay(event.start, date));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousWeek} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {`${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}, ${weekDates[0].getFullYear()}`}
        </h2>
        <button onClick={goToNextWeek} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-8 gap-1">
        <div className="col-span-1"></div>
        {weekDates.map((date) => (
          <div key={date.toString()} className="text-center font-semibold text-sm text-gray-600 pb-2">
            {formatDate(date)}
          </div>
        ))}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-right pr-2 text-sm text-gray-500">{`${hour}:00`}</div>
            {weekDates.map((date) => (
              <div
                key={`${date}-${hour}`}
                className="border-t border-gray-200 h-12 relative"
              >
                {getEventsForDate(date).map((event) => {
                  const position = getEventPosition(event);
                  // console.log(position, event, getEventsForDate(date));
                  return (
                    <div
                      key={event.id}
                      className="absolute rounded px-1 text-xs text-white overflow-hidden"
                      style={{
                        top: position.top,
                        height: position.height,
                        backgroundColor: event.color,
                        width: '95%',
                        left: '2.5%',
                      }}
                    >
                      {event.title}
                    </div>
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
