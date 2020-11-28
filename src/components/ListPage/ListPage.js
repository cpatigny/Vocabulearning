import React, { useState } from 'react';

import { updateWordList } from '../../firebase/wordListMethods';

import Modal from '../Modal/Modal';
import Loading from '../Loading/Loading';
import WordList from '../WordList/WordList';
import WordCard from '../WordCard/WordCard';
import WordForm from '../WordForm/WordForm';

import './ListPage.css';

const ListPage = props => {

  const {
    currentWordListToShow,
    currentWordListData,
    userId,
    history,
    searchMode,
    disableSearchMode,
  } = props;

  const [showWordCard, setShowWordCard] = useState(false);
  const [showWordForm, setShowWordForm] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [showRightPart, setShowRightPart] = useState(true);
  const [invertWordWithTrad, setInvertWordWithTrad] = useState(false);

  const startLearningMode = () => alert('Coming soon !');

  const toggleListOrder = (currentOrder, wordListId, userId) => {
    let newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    updateWordList({ order: newOrder }, wordListId, userId);
  };

  const toggleShowRightPart = () => setShowRightPart(!showRightPart);
  const toggleInvertWordWithTrad = () => setInvertWordWithTrad(!invertWordWithTrad);

  const handleClose = () => {
    setShowWordCard(false);
    setShowWordForm(false);
    setCurrentWord(null);
  };

  const openWordCard = (word) => {
    setCurrentWord(word);
    setShowWordCard(true);
    setShowWordForm(false);
  };

  const openWordForm = () => {
    disableSearchMode();
    setShowWordForm(true);
    setShowWordCard(false);
  };

  if (currentWordListToShow === false || !userId) {
    return <Loading />;
  }

  let words = currentWordListData && currentWordListData.words;
  let nbWords = words ? Object.keys(words).length : 0;

  return (
    <>
      <WordList
        wordList={currentWordListToShow}
        userId={userId}
        searchMode={searchMode}
        history={history}
        openWordCard={openWordCard}
        nbWords={nbWords}
        disableSearchMode={disableSearchMode}
        showRightPart={showRightPart}
        invertWordWithTrad={invertWordWithTrad}
        toggleListOrder={toggleListOrder}
        toggleShowRightPart={toggleShowRightPart}
        toggleInvertWordWithTrad={toggleInvertWordWithTrad}
      />

      <Modal visible={showWordCard} handleClose={handleClose}>
        <WordCard 
          openWordForm={openWordForm}
          currentWordListId={currentWordListToShow.id}
          userId={userId}
          currentWord={currentWord}
          closeModal={handleClose}
        />
      </Modal>

      <Modal visible={showWordForm} handleClose={handleClose}>
        <WordForm
          currentWordListId={currentWordListToShow.id}
          userId={userId}
          wordToUpdate={currentWord}
          closeModal={handleClose}
        />
      </Modal>

      <footer>
        <button onClick={toggleInvertWordWithTrad}>ordre</button>
        <button onClick={openWordForm}>Ajouter un mot</button>
        <button onClick={toggleShowRightPart}>Masquer</button>
      </footer>

      <button id='start-learning-mode' onClick={startLearningMode}>
        <i className='icofont-dumbbell' />
      </button>
    </>
  );
}

export default ListPage;
