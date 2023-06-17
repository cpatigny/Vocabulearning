import { useState } from 'react';
import { updateList } from '../../../utils/firebase/listMethods';
import { useToast } from '../../../contexts/ToastContext';
import { useUser } from '../../../contexts/UserContext';
import { ListOrder, ListWithId } from '../../../types/list';
import { WordWithId } from '../../../types/word';

import OptionsBar from './OptionsBar';
import AllWords from './AllWords';
import ListHeader from './ListHeader';
import ListOptions from './ListOptions';

interface ListProps {
  list: ListWithId;
  openWordCard: (word: WordWithId) => void;
  nbWords: number;
  openWordForm: () => void;
}

const List = (props: ListProps) => {

  const {
    list,
    openWordCard,
    nbWords,
    openWordForm
  } = props;

  const [showRightPart, setShowRightPart] = useState(true);
  const [invertWordWithTrad, setInvertWordWithTrad] = useState(false);

  const { toast } = useToast();
  const { user } = useUser();
  const userId = user ? user.uid : null;

  const toggleListOrder = (currentOrder: ListOrder, listId: string, userId: string) => {
    let newOrder: ListOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    updateList({ order: newOrder }, userId, listId)
      .catch(error => toast.error('Une erreur inconnue est survenue'));
  };

  const toggleShowRightPart = () => setShowRightPart(!showRightPart);
  const toggleInvertWordWithTrad = () => setInvertWordWithTrad(!invertWordWithTrad);

  let { order, name, words = null } = list;

  let reverseClass = order === 'desc' ? 'reverse' : '';
  let invertClass = invertWordWithTrad ? 'invert' : '';
  let hideRightPartClass = showRightPart ? '' : 'hide-right-part';

  return (
    <div className='list'>
      <ListHeader name={name} nbWords={nbWords} openWordForm={openWordForm} />

      {userId && (
        <ListOptions
          toggleCurrentListOrder={() => toggleListOrder(order, list.id, userId)}
          order={order}
          toggleInvertWordWithTrad={toggleInvertWordWithTrad}
          invertWordWithTrad={invertWordWithTrad}
          toggleShowRightPart={toggleShowRightPart}
          showRightPart={showRightPart}
        />
      )}

      {words && (
        <AllWords
          words={words}
          openWordCard={openWordCard}
          showRightPart={showRightPart}
          invertWordWithTrad={invertWordWithTrad}
          className={`${reverseClass} ${invertClass} ${hideRightPartClass}`}
        />
      )}

      <OptionsBar
        invertWordWithTrad={invertWordWithTrad}
        toggleInvertWordWithTrad={toggleInvertWordWithTrad}
        openWordForm={openWordForm}
        showRightPart={showRightPart}
        toggleShowRightPart={toggleShowRightPart}
      />
    </div>
  )
};

export default List;
