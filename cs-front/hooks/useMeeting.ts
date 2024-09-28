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
  fetchMeetings: () => Promise<void>;
};

const MeetingStoreTemplate: StateCreator<
  MeetingStore,
  [],
  [["zustand/persist", MeetingStore]]
> = persist(
  (set) => ({
    // Initialize the store with the mock data
    meetings: [],
    filteredMeetings: [],

    // Fetch the meetings from the API
    fetchMeetings: async () => {
      // Simulate an API call with a delay

      const requestOptions = {
        method: "GET",
      };

      const res = await fetch(
        "http://localhost:5192/api/meetings/abouna/1",
        requestOptions
      );

      if (res.ok) {
        const meetings = await res.json();
        set({ meetings });
      } else {
        console.error("Error fetching meetings:", res.statusText);
      }
      // Return the allMeetings object
    },
  }),
  { name: "meeting-store" }
);

const MeetingStore = create(MeetingStoreTemplate);

export default MeetingStore;
