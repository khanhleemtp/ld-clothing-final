import { put, takeLatest, call, all } from 'redux-saga/effects';
import { ShopActionTypes } from './shop.types';
import { collection, getDocs } from '@firebase/firestore';
import {
  convertCollectionsSnapshotToMap,
  db,
} from '../../firebase/firebase.util';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

export function* fetchCollectionAsync() {
  try {
    const querySnapshot = yield getDocs(collection(db, 'collections'));
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      querySnapshot.docs
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield fetchCollectionsFailure(error.message);
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
