import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'

const mLocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper: React.FC<{ children: React.ReactElement }> = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export function TestCalendar({
  localizer = mLocalizer,
  showDemoLink = true,
  ...props
}) {
  const { components, defaultDate} = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2024, 9, 15),
    }),
    []
  )

  return (
    <Fragment>
      <div className="height600" {...props}>
        <Calendar
          defaultDate={defaultDate}
          events={[]}
          localizer={localizer}
          showMultiDayTimes
          step={60}
          style={{ height: 500 }}
        />
      </div>
    </Fragment>
  )
}
TestCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}