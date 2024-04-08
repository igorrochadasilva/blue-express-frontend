import { UserGroupIcon } from '@heroicons/react/24/solid'
import { ListBulletIcon } from '@heroicons/react/24/solid'
import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import Image from 'next/image'

type IMenuItems = {
  title: string
  path?: string
  icon?: ReactElement<any, any>
  subItems?: ISubMenuItem[]
}[]

interface ISubMenuItem {
  title: string
  path: string
}

const SideMenu = () => {
  const [activeSubMenu, setActiveSubMenu] = useState(null)

  const menuItems: IMenuItems = [
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
        {
          title: 'General',
          path: '/general-requests',
        },
      ],
    },
    {
      title: 'Approvers',
      icon: <UserGroupIcon className="h-5" />,
      path: '/approvers',
    },
  ]

  const handleSubMenuToggle = (item: any) => {
    if (item.subItems) {
      setActiveSubMenu(item.title === activeSubMenu ? null : item.title)
    }
  }

  return (
    <div className="h-screen left-0 w-[228px] bg-white fixed">
      <div className="flex flex-col items-center justify-center py-4">
        <Image src="/eaton_logo.svg" width={141} height={40} alt="Logo" />
        <span className="text-be_first_colors text-be_first_color">
          Blue Express
        </span>
      </div>
      <ul className="mt-6">
        {menuItems.map((item) => (
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
                href={item.path}
                className="flex items-center gap-2"
                onClick={() => handleSubMenuToggle(item)}
              >
                {item.icon}
                {item.title}
                {item.subItems && (
                  <svg
                    className={`ml-2 h-4 w-4 transform transition duration-200 ${
                      activeSubMenu === item.title ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.293l4.293-4.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414-1.414L5.293 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            ) : (
              <span
                className="flex items-center gap-2"
                onClick={() => handleSubMenuToggle(item)}
              >
                {item.icon}
                {item.title}
                {item.subItems && (
                  <svg
                    className={`ml-2 h-4 w-4 transform transition duration-200 ${
                      activeSubMenu === item.title ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.293l4.293-4.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414-1.414L5.293 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            )}

            {item.subItems && (
              <ul
                className={`pl-4 mt-2 transition duration-200 ${
                  activeSubMenu === item.title ? 'block' : 'hidden'
                }`}
              >
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem.title}
                    className="py-1 text-[#333F48] hover:text-be_first_color"
                  >
                    {subItem.path && (
                      <Link href={subItem.path} className="text-sm">
                        {subItem.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideMenu
