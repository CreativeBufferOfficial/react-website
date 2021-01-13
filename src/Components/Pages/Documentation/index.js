import React, { Fragment, useState } from "react";
import Spinner from "../../Layouts/Spinner";

// Page imports
import Introduction from "./pages/Introduction";
import TestingEnvironment from "./pages/TestingEnvironment";
import NonMerchantXportHostedIntegration from "./pages/NonMerchantXportHostedIntegration";
import ApprovedMerchantXportHostedIntegration from "./pages/ApprovedMerchantXportHostedIntegration";
import Docker from "./pages/Docker"
import APIIntegration from "./pages/APIIntegration";
import ApiCalls from "./pages/ApiCalls";
import HelpfulLinks from "./pages/HelpfulLinks";
import "../../../../node_modules/highlight.js/styles/agate.css";

const Index = () => {
  const [value, setValue] = useState({
    loading: false,
  });

  const [currentTab, setCurrentTab] = useState(<Introduction />);
  const [currentTabNum, setCurrentTabNum] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { loading } = value;

  const onContentLoaded = (e) => {
    setValue({ loading: true });
  };

  const changeTab = (tab) => {
    setCurrentTabNum(tab);
    isMenuOpen && setIsMenuOpen(!isMenuOpen)
    switch (tab) {
      case 0:
        setCurrentTab(<Introduction />);
        break;
      case 1:
        setCurrentTab(<NonMerchantXportHostedIntegration />);
        break;
      // case 2:
      //   setCurrentTab(<NonMerchantXportHostedIntegration />);
      //   break;
      case 3:
        setCurrentTab(<ApprovedMerchantXportHostedIntegration />);
        break;
      case 4:
        setCurrentTab(<Docker />);
        break;
      case 5:
        setCurrentTab(<APIIntegration />);
        break;
      case 6:
        setCurrentTab(<ApiCalls />)
        break;
      // case 7:
      //   setCurrentTab(<HelpfulLinks />);
        break;

      default:
        break;
    }
  };

  return (
    <Fragment>
      {!loading && <Spinner />}

      <section className="banner--item page--header--section pt--30 pb--150 bg--overlay">
        <div className="container">
          <div className="page--header-breadcrumb text-uppercase text-center">
            <ol className="breadcrumb"></ol>
          </div>
          <div className="page--header-title text-uppercase text-center"></div>
        </div>
      </section>
      <div className={!isMenuOpen ? "bars" : ''}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        Documentation Menu</div>
      <section
      // className="page--header--section pt--30 pb--150 bg--overlay gradient-background"
      // style={{ height: "70rem" }}
      >
        <div className="container api-doc-container">
          <div className="doc-container">

            <div className={!isMenuOpen ? "side-nav" : "side-navbar"}>
              <div className="bar" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className="bar-1" />
                <div className="bar-2" />
              </div>

              <ul>
                <li
                  onClick={() => changeTab(0)}
                  className={currentTabNum == 0 ? "activeTab" : ""}
                >
                  <span className="on-hover">Introduction</span>
                </li>
                <li
                  onClick={() => changeTab(1)}
                  className={currentTabNum == 1 ? "activeTab" : ""}
                >
                  {/* Testing Environment
                </li>
                <li
                  onClick={() => changeTab(2)}
                  className={currentTabNum == 2 ? "activeTab" : ""}
                > */}
                  <span className="on-hover">Non Merchant XPort Hosted Integration</span>
                </li>
                <li
                  onClick={() => changeTab(3)}
                  className={currentTabNum == 3 ? "activeTab" : ""}
                >
                  <span className="on-hover">Approved Merchant XPort Hosted Integration</span>
                </li>
                <li
                  onClick={() => changeTab(4)}
                  className={currentTabNum == 4 ? "activeTab" : ""}
                >
                  <span className="on-hover">Docker Integration</span>
                </li>
                <li
                  onClick={() => changeTab(5)}
                  className={currentTabNum == 5 ? "activeTab" : ""}
                >
                  <span className="on-hover">API Integration</span>
                </li>
                <li
                  onClick={() => changeTab(6)}
                  className={currentTabNum == 6 ? "activeTab" : ""}
                >
                  <span className="on-hover">API Calls</span>
                </li>
                <li
                  onClick={() => changeTab(7)}
                  className={currentTabNum == 7 ? "activeTab" : ""}
                >
                  {/* <span className="on-hover">Helpful Links</span> */}
                </li>
              </ul>
            </div>
            <div className="doc-data">{currentTab}</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Index;
