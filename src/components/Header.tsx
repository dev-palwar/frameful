import { ThemeToggle } from './ThemeToggle'

const Header = () => {
  return (
    <div className='fixed h-10 px-4 flex justify-end items-center backdrop-blur-md'>
        <ThemeToggle />
    </div>
  )
}

export default Header