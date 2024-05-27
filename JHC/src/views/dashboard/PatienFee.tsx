import { patientFeeArr } from '../../constants/constants';
import { Icons } from '../../components/icons';

export default function PatienFee() {
  return (
    <div className="w-[23rem] h-full bg-white p-5">
      <div className="w-full mb-3 flex justify-between items-center">
        <p className="text-JHC/Darkest font-bold">Patient Fee</p>
        <Icons.expand />
      </div>

      <div>
        {patientFeeArr.map((content, index) => (
          <div
            className="flex justify-between border-b items-center"
            key={index}
          >
            <div className="flex py-3  items-center justify-start gap-3">
              <div className="w-[30px] h-[30px] rounded-full">
                <img
                  src={content.img}
                  className="w-full h-full object-cover rounded-full"
                  alt=""
                />
              </div>
              <div>
                <p className="text-JHC/Darkest font-semibold text-sm">
                  {content.patient}
                </p>
                <p className="text-xs text-JHC/Darkest">
                  {content.isFeePending ? "Doctor fee pending" : "Paid"}
                </p>
              </div>
            </div>
            <button className="bg-JHC-Primary px-2 py-1 text-xs rounded-lg text-white hover:scale-105 transition-all">
              Request Fee
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
