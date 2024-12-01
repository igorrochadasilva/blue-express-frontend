'use client';

import {
  ArrowLeftStartOnRectangleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import { HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

import SideMenuContent from '.';
import { UserSession } from '@/types/auth/sign';

export interface SubMenuItem {
  title: string;
  path: string;
}

export interface MenuItems {
  title: string;
  path?: string;
  icon?: ReactNode;
  subItems?: SubMenuItem[];
}

const SideMenu: React.FC = () => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const { data: session } = useSession();
  const user = session?.user as UserSession;

  const menuItems: MenuItems[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <HomeIcon className="h-5" />,
    },
    {
      title: 'Requests',
      icon: <ListBulletIcon className="h-5" />,
      subItems: [
        {
          title: 'Contracts',
          path: '/contract-requests',
        },
      ],
    },
    {
      title: 'Approvers',
      icon: <UserGroupIcon className="h-5" />,
      path: '/approvers',
    },
    {
      title: 'Log out',
      icon: <ArrowLeftStartOnRectangleIcon className="h-5" />,
      path: 'logout',
    },
  ];

  const handleSubMenuToggle = (item: MenuItems) => {
    if (item.subItems) {
      setActiveSubMenu(item.title === activeSubMenu ? null : item.title);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="h-screen left-0 w-[228px] bg-white fixed">
      <SideMenuContent.Logo />
      <ul className="mt-6">
        {menuItems.map(
          (item) =>
            user?.role !== 1 && (
              <li
                key={item.title}
                className={`px-4 py-2 my-8 rounded-md text-base font-medium hover:bg-[#E6EFF8] cursor-pointer ${
                  activeSubMenu === item.title
                    ? 'bg-[#E6EFF8] text-be_first_color'
                    : ''
                }`}
              >
                {item.path ? (
                  <Link
                    href={item.path === 'logout' ? '' : item.path}
                    className="flex items-center gap-2"
                    onClick={
                      item.path === 'logout'
                        ? () => handleLogout()
                        : () => handleSubMenuToggle(item)
                    }
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ) : (
                  <SideMenuContent.SubMenu
                    handleSubMenuToggle={handleSubMenuToggle}
                    item={item}
                    activeSubMenu={activeSubMenu}
                  />
                )}

                {item.subItems && (
                  <SideMenuContent.SubMenuItem
                    activeSubMenu={activeSubMenu}
                    itemTitle={item.title}
                    subItems={item.subItems}
                  />
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default SideMenu;
