import React, { useState } from "react";
import { NAVBAR_BACKGROUND_COLOR, NAVBAR_TEXT_COLOR } from "../../assets/constants";
import styles from "./styles.module.css";
import { Tabs, Tab, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavBarDropDownMenuInterface } from "../../assets/interfaces";

function NavBarDropDownMenu({ title, tabs }: NavBarDropDownMenuInterface): JSX.Element {

    const [tab, setTab] = useState<number>(0);

    return (
        <Accordion sx={{
            backgroundColor: NAVBAR_BACKGROUND_COLOR, color: NAVBAR_TEXT_COLOR, '.css-e2o6pt-MuiPaper-root-MuiAccordion-root': {
                backgroundColor: "#22a565"
            }
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: NAVBAR_TEXT_COLOR }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    paddingLeft: "8px"
                }}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0px" }}>
                <Tabs
                    value={tab}
                    onChange={(event, value) => setTab(value)}
                    variant="scrollable"
                    scrollButtons={false}
                    orientation={"vertical"}
                    aria-label="scrollable prevent tabs example"
                    style={{
                        color: "#808594"
                    }}
                    sx={{
                        '.MuiTabs-indicator': {
                            left: 0,
                        },
                        '.css-9jalnx-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                            color: "#22a565",
                            backgroundColor: "#2a324c",
                        },
                        '.css-9jalnx-MuiButtonBase-root-MuiTab-root': {
                            color: "#808594",
                            backgroundColor: "#1e2642",
                            textTransform: "none"
                        },
                        'MuiButtonBase-root MuiAccordionSummary-root Mui-expanded MuiAccordionSummary-gutters css-uow09t-MuiButtonBase-root-MuiAccordionSummary-root': {
                            backgroundColor: "#22a565"
                        }
                    }}
                    TabIndicatorProps={{
                        // hidden: true,
                        sx: {
                            backgroundColor: "#22a565",
                            alignItems: "flex-start"
                        }
                    }}
                >
                    {
                        tabs && tabs.map((tab, i) => (
                            <Tab key={i} label={tab} sx={{ color: "white", alignItems: "flex-start" }} />
                        ))
                    }
                    {/* <Tab label="Profiles" sx={{ color: "white", alignItems: "flex-start" }} />
                    <Tab label="Groups" sx={{ color: "white", alignItems: "flex-start" }} /> */}

                </Tabs>
            </AccordionDetails>
        </Accordion>
    )
}

export default NavBarDropDownMenu;