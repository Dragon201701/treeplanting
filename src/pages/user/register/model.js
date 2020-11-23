import { fakeRegister, Register } from './service';
const Model = {
  namespace: 'userAndregister',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      console.log('Register with: ', payload)
      const response = yield call(Register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
