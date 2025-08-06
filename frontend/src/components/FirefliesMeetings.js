// frontend/src/components/FirefliesMeetings.js
import React, { useState, useEffect } from 'react';

const FirefliesMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/fireflies/meetings');
      const data = await response.json();
      
      if (data.success) {
        setMeetings(data.meetings);
      } else {
        setError(data.error || 'Failed to load meetings');
      }
    } catch (err) {
      setError('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">🎙️</span> Fireflies Meetings
        </h2>
        <div className="text-gray-500">Loading meetings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">🎙️</span> Fireflies Meetings
        </h2>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🎙️</span> Fireflies Meetings ({meetings.length})
      </h2>
      
      {meetings.length === 0 ? (
        <div className="text-gray-500">No meetings found</div>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="font-semibold">{meeting.title}</div>
              <div className="text-sm text-gray-600">
                {new Date(meeting.date).toLocaleDateString()} • {meeting.duration} • {meeting.attendees} attendees
              </div>
              {meeting.actionItems && meeting.actionItems.length > 0 && (
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-700">Action Items:</div>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {meeting.actionItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={fetchMeetings}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Refresh Meetings
      </button>
    </div>
  );
};

export default FirefliesMeetings;
