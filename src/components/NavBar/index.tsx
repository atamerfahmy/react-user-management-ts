import React, { useState, useEffect } from "react";
import { NAVBAR_BACKGROUND_COLOR, NAVBAR_TEXT_COLOR } from "../../assets/constants";
import styles from "./styles.module.css";
import logo from "../../assets/images/reno_systems.png";
import { Tabs, Tab, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBarDropDownMenu from "../NavBarDropDownMenu";
import { NavBarDropDownMenuInterface } from "../../assets/interfaces";

function NavBar() {


    const [search, setSearch] = useState("");
    const [data, setData] = useState<Array<NavBarDropDownMenuInterface>>([
        {
            title: "ATM Settings",
            tabs: []
        },
        {
            title: "Business Setup",
            tabs: []
        },
        {
            title: "User Management",
            tabs: ["Users", "Profiles", "Groups"]
        }
    ]);

    const [menuData, setMenuData] = useState<Array<NavBarDropDownMenuInterface>>();

    useEffect(() => {
        setMenuData(data);
    }, []);

    const updateMenu = (event: React.FormEvent<HTMLInputElement>) => {
        let searchValue = event.currentTarget?.value;
        setSearch(searchValue);

        setMenuData(() => {
            if (searchValue.length === 0) {
                return data;
            } else
                return data.filter((item) => item.title.toLowerCase().includes(searchValue));
        })
    }

    return (
        <div className={styles.container} style={{ backgroundColor: NAVBAR_BACKGROUND_COLOR, color: NAVBAR_TEXT_COLOR }}>
            <img src={logo} alt="Girl in a jacket" width="50%" style={{ alignSelf: "center" }} />
            <input type="text" className={styles.search_bar} placeholder="Quick access" onChange={updateMenu} />
            <div className={`${styles.flex_center}`} style={{ gap: "5px", alignSelf: "flex-start", marginLeft: "5px", marginTop: "15px" }}>
                <DashboardIcon />
                <Typography fontSize={"14px"}>Dashboard</Typography>
            </div>
            <div className={`${styles.settings_container}`}>
                <Typography fontSize={"12px"} color={"#4f556b"} sx={{ marginLeft: "8px" }}>SETTINGS</Typography>

                {
                    menuData && menuData.map((item, i) => (
                        <NavBarDropDownMenu key={i} {...item} />
                    ))
                }
                {/* <NavBarDropDownMenu title={"Business Setup"} />
                <NavBarDropDownMenu title={"User Management"} tabs={["Users", "Profiles", "Groups"]} /> */}

                <Typography fontSize={"14px"} color={"#808594"} sx={{ marginLeft: "8px", my: "12px" }}>License Management</Typography>
            </div>
        </div>
    )
}

export default NavBar;