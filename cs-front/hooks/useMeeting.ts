import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { allMeetings } from "@/constants/meetings";

// Define the meeting type
export type Meeting = {
  meetingId: string;
  meetingType: string;
  abounaId: string;
  schedulingUserName: string;
  schedulingUserEmail: string;
  startTime: string;
  endTime: string;
};

// Define the store state and actions
type MeetingStore = {
  meetings: Meeting[];
  filteredMeetings: Meeting[];
  fetchMeetings: () => Promise<Meeting[]>;
  filterMeetings: (type: string) => void;
};

const MeetingStoreTemplate: StateCreator<
  MeetingStore,
  [],
  [["zustand/persist", MeetingStore]]
> = persist(
  (set) => ({
    // Initialize the store with the mock data
    meetings: allMeetings,
    filteredMeetings: allMeetings,

    // Fetch the meetings from the API
    fetchMeetings: async () => {
      // Simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Return the allMeetings object
      return allMeetings;
    },

    // Filter the meetings based on the type
    filterMeetings: (type: string) => {
      // Filter the meetings based on the type
    },
  }),
  { name: "meeting-store" }
);

const MeetingStore = create(MeetingStoreTemplate);

export default MeetingStore;
