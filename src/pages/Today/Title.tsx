const Title = () => {

  let today = new Date();

  return (
      <div className="header">
        <span>Today</span>
        <span className="date">{today.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })}</span>
      </div>
  );
};

export default Title;
