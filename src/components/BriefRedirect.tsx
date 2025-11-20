
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

export const BriefRedirect = () => {
  const { briefId } = useParams<{ briefId: string }>();
  return <Navigate to={`/dashboard/briefs/${briefId}`} replace />;
};
