import React from "react";
import HomePageHead from "./homePageHead";
import SearchBar from "./searchBar";
import LaunchCards from "./launchCards";
import logo from "../../images/pimster-x-logo.png";
import styles from "../../styles/Home.module.css";
import {ILaunch} from "../../pages/index";

export interface BodyComponentProps {
  missionName: string;
  launchesPast: any;
}

const bodyComponent = ({ missionName, launchesPast }: BodyComponentProps) => {
  return (
    <div className={styles.container}>
      {/* {JSON.stringify(data)} */}
      <HomePageHead />
      <div className="topSection">
        <img src={logo.src} alt="logo" className="logo" />
        <SearchBar missionName={missionName} />
      </div>
      <LaunchCards launchesPast={launchesPast} />
    </div>
  );
};

export default bodyComponent;
