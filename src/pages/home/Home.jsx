import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {useState ,useEffect, useMemo } from "react";
import axios from "axios"

export default function Home() {
  const MONTHS = useMemo (()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
],[]);

const [userStats, setUserStats] = useState([]);
 useEffect(() => {
  
    const getStats = async ()=>{
      try{
      const res = await axios.get('http://localhost:8800/api/user/stats',{
        headers : 
          {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken}
        
    });
    // important code snippet
    const statsList = res.data.sort(function(a, b){
      return a._id - b._id;
    })

    statsList.map(item => 
      
      setUserStats(prev => 
        [...prev, 
          {name: MONTHS[item._id - 1], "New User" : item.total}]));
    // console.log(userStats);
    
    // console.log(res.data);
  }catch(err){
    console.log(err);
  }
}
getStats();
 
 }, [MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
