'use client';
import DashboardLayout from '@/components/layout/admin/dashboard';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

export default Layout;
