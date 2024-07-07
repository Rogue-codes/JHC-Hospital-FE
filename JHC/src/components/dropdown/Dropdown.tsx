import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

interface IDropdown {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function DropdownComponent({ setOpenModal,setSelectedOption }: IDropdown) {
  const onClick: MenuProps["onClick"] = ({ key }) => {
      setOpenModal(true);
    if (key === "1") {
      setSelectedOption("single");
    }else{
      setSelectedOption("bulk");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Single Product",
      key: "1",
    },
    {
      label: "Bulk Product",
      key: "2",
    },
  ];
  return (
    <Dropdown menu={{ items, onClick }}>
      <Button type="primary" onClick={(e) => e.preventDefault()}>
        <Space>
          Create Product
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
