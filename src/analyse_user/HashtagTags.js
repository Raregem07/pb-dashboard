import React, { useState } from "react";
import { Button, Tag, Tooltip } from "antd";
import randomColor from "randomcolor";

//props: justShowTags to just show
function HashtagTags(props) {
  const [showMore, setShowMore] = useState(false);
  let tagsAndCounts = props.tagsAndCounts;
  let i = 0;
  tagsAndCounts = tagsAndCounts.map(h => {
    h["key"] = i++;
    return h;
  });
  // const colors = ["magenta", "geekblue", "red", "purple", "blue", "orange"];
  let tagComponents = props.tagsAndCounts.map((tagAndCounts, i) => {
    let title = "Click to add the hashtag to selected hashtags";
    if (props.justShowTags) {
      title = `${tagAndCounts.name} occurred ${tagAndCounts.count} times`;
    }
    return (
      <Tooltip title={title} key={i}>
        <Tag
          color={randomColor({
            luminosity: "dark",
            hue: "blue" // e.g. 'rgba(9, 1, 107, 0.5)',
          })}
          onClick={() => {
            props.onTagClick(tagAndCounts.name);
          }}
        >
          {tagAndCounts.name} ({tagAndCounts.count}) &nbsp;
        </Tag>
      </Tooltip>
    );
  });
  let tagsToShow = tagComponents;
  if (tagComponents.length > 50) {
    tagsToShow = tagComponents.slice(0, 50);
  }
  return (
    <React.Fragment>
      {showMore ? (
        <div>
          {tagComponents}
          {props.justShowTags ? (
            <React.Fragment />
          ) : (
            <Button
              type="primary"
              style={{ margin: 8 }}
              onClick={() => setShowMore(false)}
            >
              Show less Tags
            </Button>
          )}
        </div>
      ) : (
        <div>
          {tagsToShow}
          {props.justShowTags ? (
            <React.Fragment />
          ) : (
            <Button
              type="primary"
              style={{ margin: 8 }}
              onClick={() => setShowMore(true)}
            >
              Show More Tags
            </Button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default HashtagTags;
