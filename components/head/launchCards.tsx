import React, { useState } from "react";
import Modal from "./modal";
import { ILaunch } from "../../pages/index";

interface LaunchCardProps {
  launchesPast: ILaunch[];
}

export default function LaunchCards({ launchesPast }: LaunchCardProps) {
  // state to track whether the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState<ILaunch | null>(null);

  // function to toggle the modal open/closed
  // takes a Launch object argument and updates the state variables
  const toggleModal = (launch: ILaunch) => {
    setIsModalOpen(!isModalOpen);
    setSelectedLaunch(launch);
  };

  return (
    <div className="cardsWrap">
      {launchesPast.map((launch) => {
        const missionName = launch.mission_name;
        const launchDate = launch.launch_date_local;
        const launchSite = launch.launch_site.site_name_long;
        const rocket = launch.rocket.rocket_name;
        const images = launch.links.flickr_images;
        const success = launch.launch_success;
        const imagesMissionPatch = launch.links.mission_patch;
        const imagesMissionPatchSmall = launch.links.mission_patch_small;

        // Use the data to render the UI elements
        return (
          <div
            key={missionName}
            className="launchCard"
            onClick={() => toggleModal(launch)}
          >
            {images.length > 0 ? (
              <div className="rocketImg">
                <img src={images[0]} alt={missionName} />
              </div>
            ) : (
              <div className="rocketImg">
                <img src={imagesMissionPatch} alt={missionName} />
              </div>
            )}
            <div className="infoWrapper">
              <h2>{missionName}</h2>
              <p>Launch date: {launchDate}</p>
              {/* <p>Launch site: {launchSite}</p> */}
              <p>Rocket: {rocket}</p>
              {/* <p>Success: {success ? "Yes" : "No"}</p> */}
            </div>
          </div>
        );
      })}
      {selectedLaunch && isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          launch={selectedLaunch}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}
