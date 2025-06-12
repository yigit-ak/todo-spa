import {MdLoop} from "react-icons/md";

const RecurrenceDetails = ({recurrence}) => {
  return (
      <div className="details-recurrence">
        <MdLoop/> Repeats {recurrence.period > 1 ? `every ${recurrence.period} days` : "each day"}


        {/*{recurrence.period} days until*/}
        {/*{recurrence?.endDate}*/}
      </div>
  );
};

export default RecurrenceDetails;
