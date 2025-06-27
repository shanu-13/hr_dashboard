// src/pages/Dashboard.js
import React from 'react';
import './dashboard.css';
import CountUp from 'react-countup';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const firstName = currentUser?.firstName || 'User';
  const initials = firstName.charAt(0).toUpperCase();

  const pieData = {
    labels: ['HR', 'R&D', 'Sales'],
    datasets: [
      {
        data: [12, 133, 92],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
      },
    ],
  };

  const barData = {
    labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
    datasets: [
      {
        label: 'Employees',
        data: [120, 213, 139, 73, 28],
        backgroundColor: '#4bc0c0',
      },
    ],
  };

  const donutData = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [87, 150],
        backgroundColor: ['#ff9ff3', '#00d2d3'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>HR Analytics Dashboard</h1>
        <div
          className="profile-icon"
          onClick={() => navigate('/profile')}
          title="My Profile"
        >
          {initials}
        </div>
      </header>

      <section className="dashboard-metrics">
        {[
          ['Employee Count', 1470],
          ['Attrition Count', 237],
          ['Attrition Rate', 16.12, '%'],
          ['Active Employees', 1233],
          ['Avg. Age', 37],
        ].map(([label, value, suffix], i) => (
          <div key={i} className="metric-card">
            <h3>{label}</h3>
            <CountUp end={value} duration={2} separator="," decimals={suffix ? 2 : 0} suffix={suffix || ''} />
          </div>
        ))}
      </section>

      <section className="dashboard-center">
        <div className="chart-wrapper">
          <h4>Department wise Attrition</h4>
          <Pie data={pieData} />
        </div>

        <div className="chart-wrapper">
          <h4>No. of Employees by Age Group</h4>
          <Bar data={barData} />
        </div>

        <div className="table-wrapper">
          <h4>Job Satisfaction</h4>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>1★</th>
                <th>2★</th>
                <th>3★</th>
                <th>4★</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>HR</td><td>5</td><td>10</td><td>20</td><td>25</td><td>60</td></tr>
              <tr><td>Sales</td><td>12</td><td>18</td><td>30</td><td>40</td><td>100</td></tr>
              <tr><td>R&D</td><td>8</td><td>22</td><td>50</td><td>70</td><td>150</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-bottom">
        {[25, 34, 44].map((age, idx) => (
          <div key={idx} className="donut-chart">
            <h4>{`Age ${age - 9}-${age}`}</h4>
            <Doughnut data={donutData} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;