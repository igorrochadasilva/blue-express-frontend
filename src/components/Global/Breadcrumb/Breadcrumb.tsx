import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { v4 as uuid4 } from 'uuid'

const Breadcrumb = () => {
  const pathName = usePathname()
  const pathArray: string[] = pathName.split('/').filter((path) => path.length > 0)

  return (
    <div className="mt-2 mx-10 flex gap-2">
      {pathArray.map((path, i) => {
        const slicedPath = pathArray.slice(0, i + 1)
        const link = slicedPath.join('/')

        return (
          <div className="flex gap-2 text-xs" key={uuid4()}>
            <ChevronRightIcon className="w-3" />
            <Link
              href={`/${link}`}
              className={i === pathArray.length - 1 ? `text-be_first_color ` : `text-be_second_color `}
            >
              {path}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
export default Breadcrumb
