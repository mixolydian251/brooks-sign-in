import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Analytics from '../analytics';

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vw - 60px);
  width: 100%;
`;

const Statistic = styled.h3`
  margin: 20px;
`;

class AnalyticsPage extends React.Component {
  state = {
    analytics: null
  };

  componentDidMount() {
    this.setState({ analytics: new Analytics(this.props.customers) });
  }

  render() {
    const { analytics } = this.state;
    return (
      <Wrapper>
        <Statistic>
          {`Total number of customers in database: ${analytics && analytics.totalCustomers()}`}
        </Statistic>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({ customers: state.customers });

export default connect(mapStateToProps)(AnalyticsPage);
