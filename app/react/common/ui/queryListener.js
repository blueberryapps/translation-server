import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

function getDiff(query1, query2) {
  const keys1 = Object.keys(query1);
  const keys2 = Object.keys(query2);


  const key1Diff = keys1.filter(key => keys2.indexOf(key) === -1);
  const key2Diff = keys2.filter(key => keys1.indexOf(key) === -1);
  const value1Diff = keys1.filter(key => query1[key] !== query2[key]);
  const value2Diff = keys2.filter(key => query1[key] !== query2[key]);

  const withoutDuplicates = new Set([...key1Diff, ...key2Diff, ...value1Diff, ...value2Diff]);
  return [...withoutDuplicates];
}

/* 2.E -
    # onQueryChange appenduje nove fetchnue keys jak pri pageChange tak i pri EDITED_CHANGE !!!
    # onQueryChange musí rozlišovat mezi "page" a "edited" parametry
          Aby buď - přidala do store keys
                  - nebo vymazalo data ze Store a pak přidala store keys
*/
export default function queryListener(onQueryChange) {
  return Decorated =>

  @connect(null, { onQueryChange })
  @withRouter
    class PageWrapper extends PureComponent {
      componentWillReceiveProps(nextProps) {
        const difference = getDiff(this.props.location.query, nextProps.location.query);
        if (difference) {
          this.props.onQueryChange(difference, nextProps); // 4.E - pass difference (query key that changed) in onQueryChange
        }
      }

      props: {
        onQueryChange: Function,
        location: { query: Object }
      }

      render() {
        return <Decorated {...this.props} />;
      }
    };
}
