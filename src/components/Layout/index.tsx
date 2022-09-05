import React from "react";
import MainView from "../MainView";
import NavBar from "../NavBar";
import styles from "./styles.module.css";

type Props = {}

export default function Layout({ }: Props) {
    return (
        <div className={styles.container}>
            <NavBar />
            <MainView />
        </div>
    )
}