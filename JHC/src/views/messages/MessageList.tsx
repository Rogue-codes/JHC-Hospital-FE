import { Icons } from '../../components/icons';
import { messageListArr } from '../../constants/constants';

export default function MessageList() {
  return (
    <div className="w-[28vw] h-[90%] bg-white">
      {/* search */}
      <div className="w-full p-6 border-b border-[#D9D9D9]">
        <div className="w-[23vw] h-9 mx-auto relative rounded-3xl border bg-[#EBF5FF]">
          <input
            className="px-5 pl-8 h-full w-full focus:outline-none rounded-3xl bg-transparent"
            type="text"
            name=""
            id=""
            placeholder="search"
          />
          <Icons.search className="absolute left-3 top-[10px]" />
        </div>
      </div>

      {/* list */}
      <div className='overflow-y-scroll pl-8'>
        {messageListArr.map((message, index) => (
          <div className="border-b border-[D9D9D9] px-5 py-2 flex items-start justify-between" key={index}>
            <div className="flex justify-start items-start gap-2">
              <div className="w-10 flex justify-center items-center h-10 rounded-full">
                <img src={message.img} className='' alt="" />
              </div>
              <div>
                <h2 className='text-sm'>{message.name}</h2>
                <p className="text-[#969696] text-xs mt-1">{message.action}</p>
              </div>
            </div>

            <p className="text-[#969696] text-xs">9:00am</p>
          </div>
        ))}
      </div>
    </div>
  );
}
