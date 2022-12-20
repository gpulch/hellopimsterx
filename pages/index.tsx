import { gql, useQuery } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";
import HomePageHead from "../components/head/homePageHead";
import { initializeApollo } from "../lib/apolloClient";
import styles from "../styles/Home.module.css";
import LaunchCards from "../components/head/launchCards";
import logo from "../images/pimster-x-logo.png";
import SearchBar from "../components/head/searchBar";
import BodyComponent from "../components/head/bodyComponent";

export interface ILaunch {
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  rocket: {
    rocket_name: string;
  };
  links: {
    flickr_images: string[];
    mission_patch: string;
    mission_patch_small: string;
  };
  launch_success: boolean;
  missions: {
    description: string;
  }[];
}

export interface IndexProps {
  launchesPast: ILaunch[];
  onSearch: (query: string) => void;
}

// query to fetch data from the API
const APOLLO_QUERY = gql`
  query apolloQuery {
    launchesPast(limit: 20) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
      links {
        flickr_images
        mission_patch
        mission_patch_small
      }
      launch_success
    }
    missions {
      description
    }
  }
`;

export function Home() {
  const { loading, error, data } = useQuery(APOLLO_QUERY); // useQuery hook to fetch data from the API
  const { launchesPast, missions } = data || {}; // destructure the data object
  const [searchResults, setSearchResults] = useState([]); // state to track the search results

  if (error) return <>{"An error occured fetching data"}</>;
  if (loading) return <>{"Loading"}</>;
  // console.log(data);

  const onSearch = (query: string) => {
    // function to filter the launchesPast array based on the search query
    console.log(query);
    const result = launchesPast.filter((launch: ILaunch) =>
      launch.mission_name.toLowerCase().includes(query.toLowerCase())
    );
    console.log(result);
    setSearchResults(result);
  };

  return (
    <div className={styles.container}>
      {/* {JSON.stringify(data)} */}
      <HomePageHead />
      <div className="topSection">
        <img src={logo.src} alt="logo" className="logo" />
        <SearchBar onSearch={onSearch} />
      </div>
      {searchResults.length > 0 ? ( 
        <LaunchCards launchesPast={searchResults} /> // if search results are present, render the search results
      ) : (
        <LaunchCards launchesPast={launchesPast} /> // else render the launchesPast array
      )}
      {/* <BodyComponent launchesPast={launchesPast} missionName={missionName} /> */}
    </div>
  );
}

export default Home;
