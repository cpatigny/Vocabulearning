import React, { useContext } from 'react';
import { PopUpContext } from '../../providers/PopUpProvider';

import HorizontalBar from '../HorizontalBar/HorizontalBar';

import { deleteWord } from '../../firebase/wordMethods';

const WordCard = props => {

  const { 
    openWordForm, 
    currentWordListId, 
    currentWord,
    userId,
    closeModal 
  } = props;

  let { showPopUp } = useContext(PopUpContext);
  let dateStr = null;

  if (currentWord.lastRepetition) {
    const date = new Date(currentWord.lastRepetition);

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    dateStr = `Révisé le ${date.toLocaleDateString('fr-FR')} à ${hours}h${minutes}`;
  }

  const handleDelete = () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce mot ?')) return;
    
    deleteWord(currentWordListId, userId, currentWord.id, () => {
      closeModal();
      showPopUp('Le mot a bien été supprimé');
    });
  };

  return (
    <div className='word-card'>
      <p className='word'>Anglais : { currentWord.word }</p>
      <p className='translation'>Français : { currentWord.translation }</p>
      
      <HorizontalBar />
      <p className='time'>{ dateStr ? dateStr : 'Pas encore révisé' }</p>
      <HorizontalBar />
      
      <div className='bottom'>
        <button className='edit btn btn-text-primary' onClick={openWordForm}>
          Modifier
          <span className='material-icons-round'>edit</span>
        </button>
        <button onClick={handleDelete} className='delete btn btn-text-danger'>
          Supprimer
          <span className='material-icons-round'>delete</span>
        </button>
      </div>
    </div>
  );
}

export default WordCard;
