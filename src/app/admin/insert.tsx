// src/app/admin/insert.tsx

import React from 'react';
import InsertForm from '../../components/admin/InsertForm';

const InsertPage: React.FC = () => {
  const handleSave = () => {
    // handle save action
  };

  const handleCancel = () => {
    // handle cancel action
  };

  return <InsertForm onSave={handleSave} onCancel={handleCancel} />;
};

export default InsertPage;
