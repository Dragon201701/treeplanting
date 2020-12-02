import { queryFakeList, queryAllTrees } from './service';
const Model = {
  namespace: 'mytrees',
  state: {
    treelist: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAllTrees, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, treelist: action.payload };
    },
  },
};
export default Model;
