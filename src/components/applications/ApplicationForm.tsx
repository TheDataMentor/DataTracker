import { FC, useState } from 'react';
import { Application, ApplicationStatus } from '../../types/application';

interface ApplicationFormProps {
  onSubmit: (data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const ApplicationForm: FC<ApplicationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Application>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Application, 'id' | 'createdAt' | 'updatedAt'>);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="company"
        value={formData.company || ''}
        onChange={handleChange}
        placeholder="Company"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position || ''}
        onChange={handleChange}
        placeholder="Position"
        required
      />
      <input
        type="url"
        name="jobUrl"
        value={formData.jobUrl || ''}
        onChange={handleChange}
        placeholder="Job URL"
      />
      <select
        name="status"
        value={formData.status || ''}
        onChange={handleChange}
        required
      >
        <option value="">Select Status</option>
        <option value="applied">Applied</option>
        <option value="screening">Screening</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
        <option value="accepted">Accepted</option>
      </select>
      <input
        type="text"
        name="notes"
        value={formData.notes || ''}
        onChange={handleChange}
        placeholder="Notes"
      />
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;
