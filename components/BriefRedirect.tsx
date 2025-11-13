import React from 'react';
// FIX: Changed imports from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { useParams, Navigate } from 'react-router-dom';

export const BriefRedirect = () => {
  const { briefId } = useParams<{ briefId: string }>();
  return <Navigate to={`/dashboard/briefs/${briefId}`} replace />;
};