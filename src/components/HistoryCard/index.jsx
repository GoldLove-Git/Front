import moment from "moment";

const HistoryCard = ({ name, gold, date }) => {
  const newDate = moment(date).format("YYYY-MM-DD");
  return (
    <>
      <div className="min-w-[300px] mx-2.5 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{`획득 골드 : ${gold}`}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{`획득 일자 : ${newDate}`}</p>
      </div>
    </>
  );
};

export default HistoryCard;
