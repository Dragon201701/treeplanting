import { fakeSubmitForm } from './service';
const Model = {
  namespace: 'formAndstepForm',
  state: {
    current: 'info',
    step: {
      actcode:'',
      numtrees:'',
      treename:'',
    },
  },
  effects: {
    *submitStepForm({ payload }, { call, put }) {
      console.log('submit Step Form: ', payload)
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },
  },
};
export default Model;
