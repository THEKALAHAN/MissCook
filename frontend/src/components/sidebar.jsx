import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { FaBars, FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MySidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#592f38", // color del sidebar
            color: "#fff", // texto
            height: "100vh",
            collapsedWidth: "80px",
            display: "flex",
            flexDirection: "column", 
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              "&:hover": {
                backgroundColor: "#eec6c8",
              },
            },
          }}
        >
          <MenuItem icon={<FaBars />} onClick={() => setCollapsed(!collapsed)}></MenuItem>
          <MenuItem icon={<FaHome />}>
            {collapsed ? "" : "Dashboard"}
            <Link to="/dashboard" />
          </MenuItem>
        </Menu>
        <Menu
          style={{ marginTop: "auto" }}
          menuItemStyles={{
            button: {
              "&:hover": {
                backgroundColor: "#eec6c8",
              },
              alignItems: "center",
            },
          }}
        >
          <MenuItem icon={<FaUser />}>
            {collapsed ? "" : "Perfil"}
            <Link to="/perfil" />
          </MenuItem>
          <MenuItem icon={<FaSignOutAlt />}>
            {collapsed ? "" : "Salir"}
            <Link to="/logout" />
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
