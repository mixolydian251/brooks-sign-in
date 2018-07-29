import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import Analytics from '../analytics';

const Wrapper = styled.div`
  width: 100%;
  color: #222;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
`;

const Statistic = styled.h3`
  padding: 20px;
  font-size: 20px;
  font-weight: 100;
  color: #555;
  margin: 50px 0 ;
  
  span{
    font-weight: 600;
    font-size: 25px;
    color: #222;
  }
`;

const ChartContainer = styled.div`
  width: 900px;
  margin: 50px 0 ;
`;

const List = styled.div`
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  align-self: center;
  margin: 50px 0 ;
  justify-self: center;
`;

const ListItem = styled.div`
  width: 100%;
  height: 35px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: flex-start;
  align-items: center;
  color: #333;
  background-color: #ffffff;
  &:nth-child(even){
    background-color: #ebebeb;
  }
  
  p {
    margin: 0 0 0 10px;
  }
`;

class AnalyticsPage extends React.Component {
  state = {
    analytics: new Analytics(this.props.customers)
  };

  generateFamilySizeList = (listSize) => {
    const list = [];
    const data = this.state.analytics.sortByMostDependants();
    for(let i = 0; i < listSize; i++){
      list.push(
        <ListItem key={data[i].name}>
          <p><b>Name</b>: {data[i].name}</p>
          <p><b>Family size</b>: {data[i].familySize}</p>
        </ListItem>
      )
    }
    return list
  };

  generateFrequentVisitors = (listSize) => {
    const list = [];
    const data = this.state.analytics.sortByMostVisits();
    for(let i = 0; i < listSize; i++){
      list.push(
        <ListItem key={data[i].name}>
          <p><b>Name</b>: {data[i].name}</p>
          <p><b>Visits</b>: {data[i].visits}</p>
        </ListItem>
      )
    }
    return list
  };

  render() {
    return (
      <Wrapper>
        <Statistic>
          Total number of customers in database:
          <span>{` ${this.state.analytics.totalCustomers()}`}</span>
        </Statistic>

        <h2>Most Frequent Visitors</h2>
        <List>
          {this.generateFrequentVisitors(20)}
        </List>

        <ChartContainer>
          <Doughnut
            data={{
              labels: [
                "1 person", "2 people", "3 people", "4 people",
                "5 people", "6 people", "7 people", "8 or more people"
              ],
              datasets: [{
                data: Object.values(this.state.analytics.familySizeDemographics()),
                backgroundColor: [
                  "#F1A83E","#C62F57", "#F27036", "#2C86A3", "#515463",
                  "#93689B", "#66B093", "#FA3B49"
                ],
                borderWidth: 0
              }]
            }}
            options={{
              title: {
                display: true,
                text: "Distribution -- Number of people per family",
                fontSize: 20,
                fontFamily: 'Avenir, Helvetica',
                fontColor: "#222"
              }
            }}
          />
        </ChartContainer>

        <h2>Largest families</h2>
        <List>
          {this.generateFamilySizeList(20)}
        </List>

        <ChartContainer>
          <Doughnut
            data={{
              labels: ["Age unlisted", "Age 18-24", "Age 25-39", "Age 40-59", "Age 60+"],
              datasets: [{
                data: Object.values(this.state.analytics.ageDemographics()),
                backgroundColor: [
                  "#F1A83E","#C62F57", "#F27036", "#2C86A3", "#515463",
                  "#93689B", "#66B093", "#FA3B49"
                ],
                borderWidth: 0
              }]
            }}
            options={{
              title: {
                display: true,
                text: "Distribution -- Age of customer",
                fontSize: 20,
                fontFamily: 'Avenir, Helvetica',
                fontColor: "#222"
              }
            }}
          />
        </ChartContainer>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({ customers: state.customers });

export default connect(mapStateToProps)(AnalyticsPage);
