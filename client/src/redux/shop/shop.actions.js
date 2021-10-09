import { collection, getDocs } from '@firebase/firestore';
import {
  convertCollectionsSnapshotToMap,
  db,
} from '../../firebase/firebase.util';
import { ShopActionTypes } from './shop.types';

// export const updateCollections = (collections) => {
//   return {
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collections,
//   };
// };

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCollectionsStart());
      const querySnapshot = await getDocs(collection(db, 'collections'));
      const collectionsMap = convertCollectionsSnapshotToMap(
        querySnapshot.docs
      );
      dispatch(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
      dispatch(fetchCollectionsFailure(error?.message));
    }
  };
};

// action === js Obj
