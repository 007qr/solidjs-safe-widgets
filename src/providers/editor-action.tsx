import { EditorElement } from "./editor-provider";

// Define the available action types
export type EditorAction =
    | {
          type: "ADD_ELEMENT";
          payload: {
              containerId: string | null;
              elementDetails: EditorElement;
          };
      }
    | {
          type: "UPDATE_ELEMENT";
          payload: {
              elementDetails: EditorElement;
          };
      }
    | {
          type: "DELETE_ELEMENT";
          payload: {
              elementDetails: EditorElement;
          };
      }
    | {
          type: "CHANGE_CLICKED_ELEMENT";
          payload: {
              elementDetails: EditorElement;
          };
      }
    | {
          type: "TOGGLE_LIVE_MODE";
          payload?: {
              liveMode: boolean;
          };
      };
