import withSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from './collection-overview.component';
import { connect } from 'react-redux';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

export const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionOverview);
