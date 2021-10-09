import { connect } from 'react-redux';
import { compose } from 'redux';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import CollectionPage from './collection.component';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsLoaded,
});
const CollectionPageContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionPage);

export default CollectionPageContainer;
