import axios from "axios";

export const WORKFLOW_ID = "22528b60-AgentRag";
export const RUN_ID = "0194ea2a-b95c-7923-85bf-3eedb8a79679";

export const API_URL = "https://regyc6qz.clj5khk.gcp.restack.it/api/agents";

export const apiClient = axios.create({
  baseURL: API_URL,
});
