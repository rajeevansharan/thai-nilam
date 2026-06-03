import React from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../types';

interface ProtectedRouteProps {
    user: User | null;
    requireAdmin?: boolean;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    user,
    requireAdmin = false,
    children
}) => {
    // If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If route requires admin but user is not admin, redirect to home
    if (requireAdmin && user.role !== 'ADMIN') {
        return <Navigate to="/home" replace />;
    }

    // If all checks pass, render the protected component
    return <>{children}</>;
};

export default ProtectedRoute;
