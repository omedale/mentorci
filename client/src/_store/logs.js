import router from "../router";
import { logService } from "../_services";
import axios from "../_config";

export const logs = {
  namespaced: true,
  state: {
    logs: [],
    sessionTypes: [],
    sessionFeelings: [],
    import: ""
  },
  actions: {
    async getLogs({ commit }) {
      const logs = await logService.getLogs();
      commit("getLogsSuccess", logs);
      return logs;
    },
    async createLog({ commit }, log) {
      const newLog = await logService.createLog(log);
      commit("createLogSuccess", newLog);
      return newLog;
    },
    async updateLog({ commit }, log) {
      const updatedLog = await axios.put(`sessions/${log.id}/`, log);
      commit("updateLogSuccess", updatedLog);
      router.push("/sessions");
      return updatedLog;
    },
    async deleteLog({ commit }, log) {
      await axios.delete(`sessions/${log.id}/`);
      commit("deleteLogSuccess", log);
      router.push("/sessions");
      return log;
    },
    async getSessionTypes({ commit }) {
      const res = await axios.get(`sessions/types/`);
      commit("getSessionTypesSuccess", res.data);
    },
    async getSessionFeelings({ commit }) {
      const res = await axios.get(`sessions/feelings/`);
      commit("getSessionFeelingsSuccess", res.data);
    }
  },
  mutations: {
    getLogsSuccess(state, logs) {
      logs.forEach(log => {
        log.durationInMins = Number(log.durationInMins);
      });
      state.logs = logs;
    },
    createLogSuccess(state, log) {
      log.durationInMins = Number(log.durationInMins);
      state.logs.unshift(log);
    },
    updateLogSuccess(state, log) {
      log.durationInMins = Number(log.durationInMins);
      state.logs = state.logs.map(lg => (lg.id == log.id ? log : lg));
    },
    deleteLogSuccess(state, log) {
      state.logs = state.logs.filter(lg => lg.id != log.id);
    },
    getSessionTypesSuccess(state, sessionTypes) {
      state.sessionTypes = sessionTypes;
    },
    getSessionFeelingsSuccess(state, sessionFeelings) {
      state.sessionFeelings = sessionFeelings;
    },
    setImportText(state, importText) {
      state.import = importText;
    },
    reset(state) {
      state.logs = [];
    }
  }
};
