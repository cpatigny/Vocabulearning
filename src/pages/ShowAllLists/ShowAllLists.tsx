import { useEffect, useState } from 'react';
import { ROUTES } from '../../constants';
import { useLists } from '../../contexts/ListsContext';
import { useSearch } from '../../contexts/SearchContext';
import { NavigateFunction } from 'react-router-dom';

import { AllLists } from './AllLists';
import { Loading } from '../../components/Loading/Loading';
import { AddList } from './AddList';

import './ShowAllLists.css';

export const ShowAllLists = ({ navigate }: { navigate: NavigateFunction }) => {
  const [closeCurrentForm, setCloseCurrentForm] = useState<(() => void) | false>(false);

  const { lists, listsLoading, setList } = useLists();
  const { searchMode } = useSearch();
  const nbLists = lists ? Object.keys(lists).length : 0;

  // close the current form if there is one and set the new close functionet the new one
  const setCloseCurrentFormFunc = (newCloseFunc: (() => void) | false) => {
    if (closeCurrentForm) closeCurrentForm();
    setCloseCurrentForm(() => newCloseFunc); // we just pass the reference
  };

  const openList = (slug: string) => navigate(`${ROUTES.HOME}/${slug}`);

  useEffect(() => setList(null), [setList]);

  if (listsLoading) return <Loading />;

  return (
    <div className='all-lists-page'>
      {!searchMode &&
        <>
          <div className='wrap'>
            <h1>Mes listes ({ nbLists })</h1>
          </div>

          <AddList setCloseCurrentFormFunc={setCloseCurrentFormFunc} />
        </>
      }

      <AllLists
        lists={lists}
        openList={openList}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
        searchMode={searchMode}
      />
    </div>
  );
};
