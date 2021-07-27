import cx from 'classnames';
import { getSingularOrPluralText } from '../../utils/misc';

const ResultInfo = ({ totalPostResultCount, showResultInfo, classnames }) => {

  const resultText = `${totalPostResultCount} ${getSingularOrPluralText(totalPostResultCount, 'result')} found`;
  return (
    // invisible minimises content shift/jump
    <div className={cx(classnames, { 'invisible': !showResultInfo })}>
      <h2 className="text-center text-lg text-gray-700 pt-2">{resultText}</h2>
      {0 === totalPostResultCount ? <h2 className="text-center text-lg text-gray-700 pt-1">Please try another search</h2> : null}
    </div>
  );
};

export default ResultInfo;