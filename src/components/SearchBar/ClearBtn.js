const ClearBtn = ({ reset }) => (
  <button
    className='clear-search'
    aria-label='effacer la recherche'
    onClick={reset}
  >
    <span className='material-symbols-rounded'>clear</span>
  </button>
);

export default ClearBtn;
