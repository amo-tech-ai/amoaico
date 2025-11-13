import React from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { useParams, Navigate } from 'react-router-dom';

export const BriefRedirect = () => {
  const { briefId } = useParams<{ briefId: string }>();
  return <Navigate to={`/dashboard/briefs/${briefId}`} replace />;
};