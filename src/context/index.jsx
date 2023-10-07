import React, { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x753a489Fb339C773C3527Cf7BA8FE49c812351a1');
  const chainId = 5;
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await contract.call("createCampaign", [
        address, // Owner of the campaign.
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(), // Deadline in milliseconds.
        form.image,
      ]);
      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };
  

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call('getCampaigns');

      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i,
      }));

      return parsedCampaigns;
    } catch (error) {
      console.error("Error fetching campaigns:", error); // Log the error
      // You can handle or display this error in your application's UI
      throw error; // Rethrow the error to notify the caller
    }
  }

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();

      const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

      return filteredCampaigns;
    } catch (error) {
      console.error("Error fetching user campaigns:", error); // Log the error
      // Handle or display the error as needed
      throw error; // Rethrow the error to notify the caller
    }
  }

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount) });

      return data;
    } catch (error) {
      console.error("Error donating to campaign:", error); // Log the error
      // Handle or display the error as needed
      throw error; // Rethrow the error to notify the caller
    }
  }

  const getDonations = async (pId) => {
    try {
      const donations = await contract.call('getDonators', [pId]);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString())
        });
      }

      return parsedDonations;
    } catch (error) {
      console.error("Error fetching donations:", error); // Log the error
      // Handle or display the error as needed
      throw error; // Rethrow the error to notify the caller
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
