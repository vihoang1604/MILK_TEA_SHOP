import React, { Component } from 'react';

class Dashboard extends Component{
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (
      <div className="animated fadeIn">
          <p>This is my Dashboard</p>
      </div>
    );
  }
}

export default Dashboard;
