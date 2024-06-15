import React from "react";
import { Pagination } from "antd";

interface ICustomPagination {
  currentPage: number;
  total: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CustomPagination = ({
  currentPage,
  total,
  setCurrentPage,
}: ICustomPagination) => {
  const handleChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Pagination
      current={currentPage}
      total={total}
      onChange={(page) => handleChange(page)}
    />
  );
};

export default CustomPagination;
