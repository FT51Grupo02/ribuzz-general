import SideBar from '@/components/SideBar/SideBar';
import UserSettings from '@/components/UserSettings/UserSettings';
import Link from 'next/link';
import React from 'react';

const Settings = () => {

  return (
    <SideBar>
      <UserSettings />
      <Link href="/user/orders">
        Ver Órdenes
      </Link>
    </SideBar>
  );
};

export default Settings;