/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Menu } from "antd";
import { HomeOutlined, FileOutlined } from "@ant-design/icons";

interface SidebarProps {
  onSelect: (key: string) => void;
}

const sidebarStyle = css`
  height: 100vh; /* Full viewport height */
`;

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div css={sidebarStyle}>
      <Menu
        theme="dark"
        mode="inline"
        onClick={(e) => onSelect(e.key)}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Company
        </Menu.Item>
        <Menu.Item key="2" icon={<FileOutlined />}>
          Job
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
