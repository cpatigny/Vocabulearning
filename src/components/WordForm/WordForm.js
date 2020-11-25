import React, { useState } from 'react';

import './WordForm.css';

const WordForm = props => {

  const { 
    addWord,
    updateWord, 
    wordListId, 
    userId, 
    wordToUpdate,
    closeModal,
    addMultipleWords } = props;

  const [wordFormData, setWordFormData] = useState({
    word: wordToUpdate ? wordToUpdate.word : '',
    translation: wordToUpdate ? wordToUpdate.translation : '',
    words: '', // for multi add mode
    wordError: null, 
    translationError: null,
    wordsError: null
  });

  const [updateMode] = useState(!!wordToUpdate);
  const [multiAddMode, setMultiAddMode] = useState(false);

  /**
   * creates and returns word objects from list
   * @param {string} wordList 
   * @return {object} word objects
   */
  const generateWordsFromList = wordList => {
    wordList = wordList
      .replace(/(\n|\r)+/g, '\n') // replaces multiple line breaks by one line break
      .split(/\n|\r/)
      .map(wordStr => {
        wordStr = wordStr.trim();

        // remove every "-" and spaces at the start of the string
        while (/-|\s/.test(wordStr[0])) wordStr = wordStr.substring(1);

        let separators = ['->', '-\\s>', '=', ':'];
        let separatorsRegexStr = separators.reduce((result, separator) => {
          return `${separator}|${result}`;
        });

        let separatorsRegex = new RegExp(separatorsRegexStr);
        let [word, translation] = wordStr.split(separatorsRegex);
        word = word.trim();
        translation = translation.trim();

        return { word, translation };
      });

    return wordList;
  };

  const validate = (word, translation) => {
    let errors = {
      empty: true,
      word: '',
      translation: ''
    };

    if (word.length > 1000) {
      errors.empty = false;
      errors.word = 'Le mot doit contenir 1000 caractères maximum';
    }
    
    if (translation.length > 1000) {
      errors.empty = false;
      errors.translation = 'La traduction doit contenir 1000 caractères maximum';
    }

    return errors;
  };

  const handleChange = e => {
    let { value, name } = e.target;
    setWordFormData({ ...wordFormData, [name]: value });
  };

  const clear = () => {
    setWordFormData({
      word: '',
      translation: '',
      words: '',
      wordError: null,
      translationError: null,
      wordsError: null
    });
  };

  const handleMultipleWordsSubmit = e => {
    e.preventDefault();
    let words, errors;

    try {
      words = generateWordsFromList(wordFormData.words);
    } catch (error) {
      setWordFormData({ ...wordFormData, wordsError: 'Format invalide' });
      return;
    }

    for (const { word, translation } of words) {
      errors = validate(word, translation);
      if (!errors.empty) break;
    }

    let errorMessage = 'Les mots et les traductions doivent contenir 1000 caractères maximum';

    setWordFormData({
      ...wordFormData,
      wordsError: errors.empty ? '' : errorMessage,
    });

    if (!errors.empty) return;
    addMultipleWords(words, wordListId, userId, () => closeModal());
  };

  const handleSubmit = e => {
    e.preventDefault();

    let { word, translation } = wordFormData;
    const errors = validate(word, translation);

    setWordFormData({
      ...wordFormData,
      wordError: errors.word,
      translationError: errors.translation
    });

    if (!errors.empty) return;

    if (updateMode) {
      updateWord({ word, translation }, wordListId, userId, wordToUpdate.id);
      closeModal();
    } else {
      addWord({ word, translation }, wordListId, userId);
      clear();
    }
  };

  return (
    <>
      <form 
        className='word-form'
        onSubmit={ multiAddMode ? handleMultipleWordsSubmit : handleSubmit } 
      >
        { multiAddMode && !updateMode ? (
          <div>
            <label htmlFor='multi-words'>Liste de mots (1 mot par ligne)</label>
            <textarea 
              name='words' 
              id='multi-words'
              required
              value={wordFormData.words}
              onChange={handleChange}
              placeholder='mot en anglais : traduction(s)'
            ></textarea>
            <small className={ wordFormData.wordsError && 'invalid-message' }>
              { wordFormData.wordsError && wordFormData.wordsError }
            </small>
            <ul className='info'>
              <li>les tirets sont acceptés en début de ligne</li>
              <li>plusieurs séparateurs sont acceptés (:, -&#62;, =)</li>
            </ul>
          </div>
        ) : (
          <>
            <div>
              <label htmlFor='word'>Votre mot :</label>
              <input
                id='word'
                className={wordFormData.wordError && 'invalid'}
                type='text'
                required
                placeholder='En anglais'
                name='word'
                value={wordFormData.word}
                onChange={handleChange} 
              />
              <small className='invalid-message'>{ wordFormData.wordError }</small>
            </div>
            <div>
              <label htmlFor='translation'>Traduction(s) du mot :</label>
              <input
                id='translation'
                className={wordFormData.translationError && 'invalid'}
                type='text'
                required
                placeholder='En français'
                name='translation'
                value={wordFormData.translation}
                onChange={handleChange} 
              />
              <small className='invalid-message'>{ wordFormData.translationError }</small>
            </div>
          </>
        ) }
        { !updateMode &&
          <button 
            onClick={() => setMultiAddMode(!multiAddMode)} 
            type='button'
          >
            Multi
          </button>
        }
        <button onClick={closeModal} type='button'>Annuler</button>
        <button type='submit'>{ updateMode ? 'Modifier' : 'Ajouter' }</button>
      </form>
    </>
  );
}

export default WordForm;