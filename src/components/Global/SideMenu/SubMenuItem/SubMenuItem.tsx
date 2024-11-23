import Link from 'next/link';

interface ISubMenuItem {
  subItems: any;
  activeSubMenu: string | null;
  itemTitle: string;
}

const SubMenuItem = ({ subItems, activeSubMenu, itemTitle }: ISubMenuItem) => {
  return (
    <ul
      className={`pl-4 mt-2 transition duration-200 ${activeSubMenu === itemTitle ? 'block' : 'hidden'}`}
    >
      {subItems.map((subItem: any) => (
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
export default SubMenuItem;
