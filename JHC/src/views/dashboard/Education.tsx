import { Icons } from '../../components/icons';
import { educationalContentArr } from '../../constants/constants';

export default function Education() {
  return (
    <div className="w-[23rem] h-[20rem] bg-white p-5">
      <div className="w-full mb-3 flex justify-between items-center">
        <p className='text-JHC/Darkest font-bold'>Education Content</p>
        <Icons.expand />
      </div>

      <div>
        {educationalContentArr.map((content, index) => (
          <div className="flex justify-between border-b items-center" key={index}>
            <div className='flex py-3  items-center justify-start gap-3'>
              <div className="w-[30px] h-[30px] rounded-full">
                <img src={content.img} className='w-full h-full object-cover rounded-full' alt="" />
              </div>
              <div>
                <p className="text-JHC/Darkest font-semibold text-sm">
                  {content.title}
                </p>
                <p className="text-xs text-JHC/Darkest">{content.author}</p>
              </div>
            </div>
            <button className='bg-JHC-Primary w-16 py-1 text-xs rounded-lg text-white hover:scale-105 transition-all'>Assign</button>
          </div>
        ))}
      </div>
    </div>
  );
}
