import { ChevronUpIcon } from '@heroicons/react/24/outline'

interface ISubMenu {
  handleSubMenuToggle: (item: any) => void
  item: any
  activeSubMenu: string | null
}

const SubMenu = ({ handleSubMenuToggle, item, activeSubMenu }: ISubMenu) => {
  return (
    <span className="flex items-center gap-2" onClick={() => handleSubMenuToggle(item)}>
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
  )
}
export default SubMenu
