import { FC, useState, useEffect } from 'react';
import ApplicationForm from '../components/applications/ApplicationForm';
import { Application } from '../types/application';

const Home: FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await fetch('/api/applications');
    const data = await response.json();
    setApplications(data);
  };

  const handleSubmit = async (data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      fetchApplications();
    } else {
      console.error('Failed to submit application');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Job Application Tracker</h1>
      <ApplicationForm onSubmit={handleSubmit} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Current Applications</h2>
        {applications.map((app) => (
          <div key={app.id} className="border p-4 mb-2 rounded">
            <h3 className="font-bold">{app.company}</h3>
            <p>{app.position}</p>
            <p>Status: {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
