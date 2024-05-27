import { Icons } from '../icons';

export default function Nav() {
  return (
    <nav className="w-[calc(100vw-14.8vw)] flex justify-between items-center px-12 ml-[14.8vw] py-4">
      <p className='font-bold text-JHC/Darkest'>Dashboard</p>
      <div className="flex justify-center items-center gap-3 ">
        <div>
          <Icons.notification />
        </div>
        <div className="w-[50px] rounded-full h-[50px] border border-black"></div>
        <div className='text-JHC/Darkest text-sm'>
          <p>Jonitha Cathrine</p>
          <p>Admin</p>
        </div>
      </div>
    </nav>
  );
}
