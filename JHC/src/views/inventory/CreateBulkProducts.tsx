import { Button, Input, Spin, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import {
  productsApi,
} from "../../api/products.api";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

interface IBulkProducts {
  file: any;
}
export default function CreateBulkProducts() {
  const {
    control,
    setValue,
    formState: { isValid },
    watch,
  } = useForm<IBulkProducts>({
    mode: "onChange",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      if (
        file.type !== "text/csv" &&
        !file.name.toLowerCase().endsWith(".csv")
      ) {
        message.error("Please select a CSV file.");
        return;
      }
      setValue("file", file, {
        shouldValidate: true,
      });
    }
  };
  console.log("valid", isValid);

  const formVal = watch();

  const [errorArr, setErrorArr] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (errorArr) {
      errorArr.forEach((error) => {
        toast.error(error?.message);
        setErrorArr(null);
      });
    }
  }, [errorArr]);

  const dispatch = useDispatch();

  const handleFileSubmit = async () => {
    setLoading(true);

    if (formVal.file) {
      const formData = new FormData();
      formData.append("file", formVal.file);

      try {
        const token = Cookies.get("token");
        const response = await axios.post(
          "http://localhost:8000/api/v1/JHC-hms/product/bulk-create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          dispatch(productsApi.util.invalidateTags(["Products"]));
        }
        const errorArr = response?.data?.invalidProducts;
        if (errorArr) {
          setErrorArr(errorArr);
        }
      } catch (error: any) {
        toast.error("Failed to create products.");
      }
    }
  };

  console.log("value", formVal);
  return (
    <div className="w-full bg-white p-12">
      <form action="">
        <div className="w-full flex justify-center items-center">
          <Controller
            name="file"
            control={control}
            rules={{
              required: "A csv file is required",
            }}
            render={() => (
              <Input
                type="file"
                onChange={handleFileChange}
                className="w-[50%] h-10"
              />
            )}
          />
        </div>

        <Button
          disabled={!isValid}
          type="primary"
          className="mx-auto flex justify-center items-center mt-8"
          onClick={handleFileSubmit}
        >
          {loading ? (
            <Spin
              className="text-white"
              indicator={<LoadingOutlined spin color="white" />}
            />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
