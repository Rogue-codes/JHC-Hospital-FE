import { DatePicker, Divider, Input, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../api/products.api";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined } from "@ant-design/icons";

interface IForm {
  name: string;
  category: string;
  price: string;
  quantity: string;
  expiry_date: null;
  manufacturer: string;
  description: string;
  images: File[];
}

interface ICreatePatient {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreateProduct({ setOpenModal }: ICreatePatient) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      price: "",
      quantity: "",
      expiry_date: null,
      manufacturer: "",
      description: "",
      images: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files); // Convert FileList to Array
      setValue("images", fileArray, {
        shouldValidate: true,
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (images: File[]) => {
    try {
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "JHC-hospital");

          const res = await fetch(
            "https://api.cloudinary.com/v1_1/osuji/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const imgObj = await res.json();
          return imgObj.secure_url.toString();
        })
      );

      return uploadedImageUrls;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const [createProduct, { data, isLoading, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      reset();
      setOpenModal(false);
    }
  }, [isSuccess]);

  const handleCreateProduct = async (values: IForm) => {
    try {
      setLoading(true);
      const imageUrls = await handleImageUpload(values.images);
      const productData = { ...values, images: imageUrls };
      setLoading(false);
      createProduct(productData)
        .unwrap()
        .catch((e: any) => {
          console.log(e);
          toast.error(e?.data?.message);
        });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="w-full bg-white">
          <div className="w-full flex my-8 justify-between items-center gap-5">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "name is required",
              }}
              render={({ field }) => (
                <Input
                  status={errors.name && "error"}
                  placeholder={errors.name ? errors.name.message : "Name"}
                  {...field}
                  className={`${
                    errors.name && "placeholder:text-red-400"
                  } w-full h-10`}
                />
              )}
            />

            <Controller
              name="manufacturer"
              control={control}
              rules={{
                required: "manufacturer name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "text/character not supported",
                },
              }}
              render={({ field }) => (
                <Input
                  status={errors.manufacturer && "error"}
                  placeholder={
                    errors.manufacturer
                      ? errors.manufacturer.message
                      : "manufacturer"
                  }
                  {...field}
                  className={`${
                    errors.manufacturer && "placeholder:text-red-400"
                  } w-full h-10`}
                />
              )}
            />
          </div>

          <div className="w-full flex my-8 justify-between items-center gap-5">
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  status={errors.price ? "error" : undefined}
                  placeholder={errors.price ? errors.price.message : "price"}
                  {...field}
                  className={`${
                    errors.price ? "placeholder:text-red-400" : ""
                  } w-full h-10`}
                />
              )}
              rules={{
                required: "price is required",
              }}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  status={errors.quantity ? "error" : undefined}
                  placeholder={
                    errors.quantity ? errors.quantity.message : "quantity"
                  }
                  {...field}
                  className={`${
                    errors.quantity && "placeholder:text-red-400"
                  } w-full h-10`}
                />
              )}
              rules={{
                required: "quantity number is required",
              }}
            />
          </div>

          <div className="w-full my-8 h-12 flex justify-start items-center gap-5">
            <Controller
              name="expiry_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  placeholder="expiry date"
                  className="border w-1/2 h-10"
                  // onChange={onChange}
                />
              )}
            />
            <div className="w-[50%] my-8 h-10 flex justify-between items-center gap-5">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    status={errors.category && "error"}
                    {...field}
                    placeholder={
                      errors.category ? errors.category.message : "category"
                    }
                    options={[
                      {
                        label: "Inhaler",
                        value: "Inhaler",
                      },
                      {
                        label: "Tablet",
                        value: "Tablet",
                      },
                      {
                        label: "Syrup",
                        value: "Syrup",
                      },
                      {
                        label: "Cream",
                        value: "Cream",
                      },
                      {
                        label: "Capsule",
                        value: "Capsule",
                      },
                      {
                        label: "Soap",
                        value: "Soap",
                      },
                    ]}
                    className="w-full h-10"
                  />
                )}
              />
            </div>
          </div>

          <div className="w-full">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  status={errors.description ? "error" : undefined}
                  placeholder={
                    errors.description
                      ? errors.description.message
                      : "description"
                  }
                  {...field}
                  className={`${
                    errors.description && "placeholder:text-red-400"
                  } w-full h-44`}
                />
              )}
            />
          </div>
        </div>

        <div className="w-full mt-5 flex justify-center items-center">
          <Controller
            name="images"
            control={control}
            render={() => (
              <Input
                type="file"
                onChange={handleFileChange}
                className="w-[50%] h-10"
                multiple
              />
            )}
          />
        </div>

        <Divider />

        <div className="w-full  mt-6 flex justify-end items-center gap-5">
          <button
            type="button"
            className="border border-JHC-Primary text-JHC-Primary p-1 hover:scale-110 transition-all px-6 rounded-lg"
            // onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className="bg-JHC-Primary text-white p-1 disabled:opacity-50 disabled:cursor-not-allowed border border-JHC-Primary hover:scale-110 transition-all px-6 rounded-lg"
          >
            {isLoading || loading ? (
              <Spin
                className="text-white"
                indicator={<LoadingOutlined spin color="white" />}
              />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
