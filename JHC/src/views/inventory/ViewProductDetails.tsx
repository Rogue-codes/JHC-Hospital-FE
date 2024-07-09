import { useState } from "react";
import { useGetProductByIdQuery } from "../../api/products.api";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface IViewProductDetails {
  id: string;
}

interface IProduct {
  _id: string;
  name: string;
  price: number | string;
  description: string;
  expiry_date: any;
  quantity: number | string;
  category: string;
  manufacturer: string;
  images?: string[];
}

export default function ViewProductDetails({ id }: IViewProductDetails) {
  const { data, isLoading } = useGetProductByIdQuery({
    id,
  });

  const product: IProduct = data?.data;

  const imagesArr = product?.images;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageSelect = (index: number) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex + 1 === imagesArr?.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!imagesArr || imagesArr.length === 0) {
      return; // Handle the case where imagesArr is undefined or empty
    }

    if (activeIndex === 0) {
      setActiveIndex(imagesArr.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="w-full py-12 flex justify-center items-center">
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : (
        <div className="w-full bg-white flex gap-6 justify-center items-start">
          <div className="w-1/2 h-full">
            <div className="h-56 relative">
              <img
                src={imagesArr && imagesArr[activeIndex]}
                className="w-full h-full object-cover"
                alt=""
              />

              <div
                className="w-8 h-8 bg-JHC-Primary flex justify-center items-center absolute top-24 left-2 rounded-full cursor-pointer"
                onClick={handlePrevious}
              >
                <MdOutlineNavigateBefore color="white" size={20} />
              </div>

              <div
                className="w-8 h-8 bg-JHC-Primary flex justify-center items-center absolute top-24 right-2 rounded-full cursor-pointer"
                onClick={handleNext}
              >
                <MdOutlineNavigateNext color="white" size={20} />
              </div>
            </div>
            <div className="h-16 mt-3 flex gap-3 justify-between items-center">
              {imagesArr?.map((image: string, index: number) => (
                <div
                  className={`${
                    activeIndex === index && "border-2 border-JHC-Primary"
                  } w-[33%] border rounded-lg h-full !cursor-pointer hover:scale-105 transition-all`}
                  key={index}
                  onClick={() => handleImageSelect(index)}
                >
                  <img
                    src={image}
                    className="w-full rounded-lg h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-4  h-full border rounded-lg">
            <p className="text-md">
              <b>Product Name:</b> {product?.name}
            </p>
            <p className="text-md my-3">
              <b>Manufacturer:</b> {product?.manufacturer}
            </p>
            <p className="text-md">
              <b>Price:</b> ₦ {product?.price.toLocaleString()}
            </p>
            <p className="text-md mt-3">
              <b>Expiry date:</b> {product?.expiry_date}
            </p>
            <p className="text-md my-3">
              <b>Category Name:</b> {product?.category}
            </p>
            <p className="text-md">
              <b>Description:</b> {product?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
