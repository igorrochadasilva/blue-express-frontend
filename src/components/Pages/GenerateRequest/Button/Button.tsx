import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface IButtonProps {
  text: string
  link: string
}

const Button = ({ text, link }: IButtonProps) => (
  <Link href={link} className="bg-white p-5 flex-1 rounded shadow-sm font-medium">
    {text} <ChevronRightIcon className="w-6 ml-3 text-be_first_color" />
  </Link>
)

export default Button
