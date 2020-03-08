import React from 'react';


import {getCategory} from '../public/redux/actions/category'
import {connect} from 'react-redux'
import LineChart from "@rsuite/charts/lib/charts/LineChart";
import {getOrders} from '../public/redux/actions/orders'
import Moment from 'moment'




class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

  }


  render() {
    const data = [["January", "0"], ["Februari", "468000"], ["Marc", "0"]];
    const ChartsData = () => <LineChart data={data} />;
    
    return (
        <div>

      <ChartsData />
        </div>
    
       
    );
  }
}


const mapStateToProps = state => {
  return {
      product: state.product,
      category: state.category,
      orders: state.orders,
      user: state.user
  }
}

export default connect(mapStateToProps)(Charts)


