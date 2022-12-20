import React from "react";
import { ILaunch } from "../../pages/index";

type ModalProps = {
  isModalOpen: boolean;
  launch: ILaunch;
  toggleModal: (launch: ILaunch) => void;
};

const Modal = ({ isModalOpen, launch, toggleModal }: ModalProps) => {
  return (
    <div className={`modal ${isModalOpen ? "modal--open" : "modal--closed"}`}>
      <div className="modalCard">
        {/* Render the image */}
        {launch.links.flickr_images.length > 0 ? (
          <img src={launch.links.flickr_images[0]} alt={launch.mission_name} />
        ) : (
          <img src={launch.links.mission_patch} alt={launch.mission_name} />
        )}
        {/* Render the mission name */}
        <h2>{launch.mission_name}</h2>
        {/* Render the launch date */}
        <p>Launch date: {launch.launch_date_local}</p>
        {/* Render the success of the launch */}
        <p>Success: {launch.launch_success ? "Yes" : "No"}</p>
        {/* Render the launch site name */}
        <p>Launch site: {launch.launch_site.site_name_long}</p>

        <button
          className="closeModalButton"
          onClick={() => toggleModal(launch)}
        >
          {/* ensures toggleModal function is called with the correct arguments 
              and the state variables are updated correctly. */}
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
