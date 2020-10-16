import React from "react";
import SearchBar from "./../../components/searchBar";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../assets/css/customTabs.css";
import AllTime from "./AllTime";
import Today from "./Today";
import ThisWeek from "./ThisWeek";
import ThisMonth from "./ThisMonth";
import {
  resetAllTimeRecipeState,
  resetThisMonthRecipeState,
  resetThisWeekRecipeState,
  resetTodayRecipeState,
} from "./actions";

const Home = ({
  user,
  resetAllTimeRecipeState,
  resetTodayRecipeState,
  resetThisMonthRecipeState,
  resetThisWeekRecipeState,
}) => {
  return (
    <>
      <SearchBar user={user}></SearchBar>
      <div className="e">
        <Tabs
          defaultIndex={0}
          className="flex flex-col mx-10 my-10 w-4/5"
          onSelect={(index, lastIndex, event) => {
            switch (index) {
              case 0:
                resetAllTimeRecipeState();
                break;

              case 1:
                resetTodayRecipeState();
                break;

              case 2:
                resetThisWeekRecipeState();
                break;

              case 3:
                resetThisMonthRecipeState();
                break;

              default:
                break;
            }
          }}
          // selectedClassName="border-b-2 font-bold text-textColor-primary"
        >
          <TabList>
            <Tab>All Time</Tab>
            <Tab>Today</Tab>
            <Tab>This Week</Tab>
            <Tab>This Month</Tab>
          </TabList>

          <TabPanel>
            <AllTime />
          </TabPanel>
          <TabPanel>
            <Today />
          </TabPanel>
          <TabPanel>
            <ThisWeek />
          </TabPanel>
          <TabPanel>
            <ThisMonth />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  resetAllTimeRecipeState,
  resetTodayRecipeState,
  resetThisMonthRecipeState,
  resetThisWeekRecipeState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
