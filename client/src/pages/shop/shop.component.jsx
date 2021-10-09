import './shop.styles.scss';
import { Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from './../../redux/shop/shop.actions';
import { CollectionOverviewContainer } from './../../components/collection-overview/collection.container';
import { CollectionPageContainer } from '../collection/collection-page.container';

// import { createStructuredSelector } from 'reselect';
// import {
//   selectIsCollectionFetching,
//   selectIsCollectionsLoaded,
// } from '../../redux/shop/shop.selectors';
// import { fetchCollectionsStartAsync } from './../../redux/shop/shop.actions';
// import { collection, onSnapshot, getDocs } from '@firebase/firestore';
// import CollectionPage from '../collection/collection.component';
// import { updateCollections, fetchCollectionsStartAsync } from './../../redux/shop/shop.actions';
// import {
//   convertCollectionsSnapshotToMap,
//   db,
// } from '../../firebase/firebase.util';
// import CollectionOverview from './../../components/collection-overview/collection-overview.component';
// import withSpinner from './../../components/with-spinner/with-spinner.component';
// const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
// const CollectionPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = ({ fetchCollections, match }) => {
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <div className="shop-page">
      {/* <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner
              isLoading={isFechingCollections}
              {...props}
            />
          )}
        /> */}
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionsStart()),
});

// const mapStateToProps = createStructuredSelector({
//   isFechingCollections: selectIsCollectionFetching,
//   isCollectionsLoaded: selectIsCollectionsLoaded,
// });

export default connect(null, mapDispatchToProps)(ShopPage);
