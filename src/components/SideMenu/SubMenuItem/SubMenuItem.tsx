import Link from 'next/link';
import { SubMenuItem as SubMenuItemType } from '../SideMenu';

interface SubMenuItemProps {
  subItems: SubMenuItemType[];
  activeSubMenu: string | null;
  itemTitle: string;
}

export const SubMenuItem = ({
  subItems,
  activeSubMenu,
  itemTitle,
}: SubMenuItemProps) => {
  return (
    <ul
      className={`pl-4 mt-2 transition duration-200 ${activeSubMenu === itemTitle ? 'block' : 'hidden'}`}
    >
      {subItems.map((subItem: SubMenuItemType) => (
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
  );
};
