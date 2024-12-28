import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { MenuItems } from '../SideMenu';

interface SubMenuProps {
  handleSubMenuToggle: (item: MenuItems) => void;
  item: MenuItems;
  activeSubMenu: string | null;
}

export const SubMenu = ({
  handleSubMenuToggle,
  item,
  activeSubMenu,
}: SubMenuProps) => {
  return (
    <span
      className="flex items-center gap-2"
      onClick={() => handleSubMenuToggle(item)}
    >
      {item.icon}
      {item.title}
      {item.subItems && (
        <ChevronUpIcon
          className={`ml-2 h-4 w-4 transform transition duration-200 ${
            activeSubMenu === item.title ? 'rotate-180' : ''
          }`}
        />
      )}
    </span>
  );
};
