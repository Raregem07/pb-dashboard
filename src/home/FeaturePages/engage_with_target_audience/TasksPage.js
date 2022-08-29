import React from 'react';
import FeatureDetails from "../../FeatureDetails";
import FeaturePageHeading from "../common/FeaturePageHeading";
import FeaturePageAnalyticsNote from "../analytics/FeaturePageAnalyticsNote";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import EngageWithTargetAudienceFeatureCards from "./EngageWithTargetAudienceFeatureCards";
import TargetLeadsFeatureCards from "./TargetLeadsFeatureCards";

function TasksPage(props) {
  const tasksPageFeatureDetail = FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS.TARGETED_LEADS;

  return <React.Fragment>
    <FeaturePageHeading
      backgroundImage={`linear-gradient(to right, ${tasksPageFeatureDetail.COLOR_CODE_2} , ${tasksPageFeatureDetail.COLOR_CODE})`}
      text={tasksPageFeatureDetail.FEATURE_PAGE_HEADING}
    />
    <FeaturePageAnalyticsNote
      note={tasksPageFeatureDetail.FEATURE_PAGE_NOTE}
    />

    <div style={{ marginLeft: 32, marginTop: 32 }}>
      <Breadcrumb style={{ fontSize: 20, fontWeight: "bold", cursor: "pointer" }}>
        <Breadcrumb.Item>
          <Link className="link" to={`/`}>
            Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link className="link" to={`/engage_with_target_audience`}>
            Engage with your Audience
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Targeted Leads (Target Audience)
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>

    <div style={{ marginTop: 32, marginLeft: 32 }}>
      <TargetLeadsFeatureCards/>
    </div>
  </React.Fragment>;
}

export default TasksPage;
