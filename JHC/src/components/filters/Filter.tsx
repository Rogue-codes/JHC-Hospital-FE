
import DateSelect from './DatePicker';
import { Icons } from '../icons';

export default function Filter() {
  return (
    <div className="w-full mt-5 flex items-center gap-12">
      <div className="w-[18vw] relative rounded-3xl border bg-[#EBF5FF]">
        <input
          className="px-5 pl-8 h-8 w-full focus:outline-none rounded-3xl bg-transparent"
          type="text"
          name=""
          id=""
          placeholder='search'
        />
        <Icons.search className='absolute left-3 top-[10px]'/>
      </div>

      <DateSelect/>
    </div>
  );
}
