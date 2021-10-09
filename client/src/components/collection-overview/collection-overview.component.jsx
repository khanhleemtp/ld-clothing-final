import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview.component';
import './collection-overview.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPrevew } from '../../redux/shop/shop.selectors';

const CollectionOverview = ({ collections }) => {
  return (
    <div className="collection-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPrevew,
});

export default connect(mapStateToProps)(CollectionOverview);
