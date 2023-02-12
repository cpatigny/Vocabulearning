import { useContext, useEffect, useState } from 'react';
import { ROUTES } from '../../constants';
import { ListsContext } from '../../providers/ListsProvider';
import { SearchContext } from '../../providers/SearchProvider';

import AllLists from './AllLists';
import Loading from '../../components/Loading/Loading';
import AddList from './AddList';

import './ShowAllLists.css';

const ShowAllLists = ({ navigate }) => {

  const [closeCurrentForm, setCloseCurrentForm] = useState(false);

  let { lists, listsLoading, setList } = useContext(ListsContext);
  let { searchMode, disableSearchMode, listsWithMatchingWords } = useContext(SearchContext);

  // close the current form if there is one and set the new one
  const setCloseCurrentFormFunc = newCloseFunc => {
    if (closeCurrentForm) closeCurrentForm();
    setCloseCurrentForm(() => newCloseFunc);
  };

  const openList = slug => navigate(`${ROUTES.HOME}/${slug}`);

  useEffect(() => setList(null), [setList]);

  if (listsLoading) return <Loading />;

  return (
    <div className='all-lists-page'>
      <AddList
        existingLists={lists}
        searchMode={searchMode}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
        disableSearchMode={disableSearchMode}
      />

      <AllLists
        lists={lists}
        listsWithMatchingWords={listsWithMatchingWords}
        openList={openList}
        searchMode={searchMode}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
      />
    </div>
  );
}

export default ShowAllLists;
