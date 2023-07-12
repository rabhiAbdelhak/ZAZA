import React from 'react'
import TimeAgo from 'timeago-react'
import PropTypes from "prop-types";
export default function ZimouTimeAgo({ date }: any) {
  return (
    <span>
      <TimeAgo datetime={date} locale="en-EN" />
    </span>
  )
}
ZimouTimeAgo.propTypes = {
  date: PropTypes.any,
};