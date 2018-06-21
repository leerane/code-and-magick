'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarCharactersBlock = document.querySelector('.setup-similar');
similarCharactersBlock.classList.remove('hidden');

var similarCharactersList = similarCharactersBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var similarWizardItem = similarWizardTemplate.content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашинтгтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Люпита', 'Вашинтгтон'];
var COAT_COLORS = [
  'rgba(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;

var characters = [];
var wizardsData = [];
var wizardsList = [];
var fragment = document.createDocumentFragment();

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Функция проверяет, попадается ли среди всех объектов объект со схожим свойством
 *
 * @param {object} array Массив объектов
 * @param value Схожее свойство
 * @returns {boolean}
 */

var isEqual = function (array, value) {
  return array.some(function (obj) {
    return Object.keys(obj).some(function (key) {
      return obj[key] === value;
    });
  });
};

var createCharacter = function (name, surname, coat, eyes) {
  return {
    name: name + ' ' + surname,
    coatColor: coat,
    eyesColor: eyes
  }
};

var renderCharacters = function (amount, names, surnames, coats, eyes) {
  var tempCharacters = [];
  while (tempCharacters.length < amount) {
    var randomName = names[getRandomNumber(0, names.length)];
    var randomSurname = surnames[getRandomNumber(0, surnames.length)];
    var randomCoatColor = coats[getRandomNumber(0, coats.length)];
    var randomEyesColor = eyes[getRandomNumber(0, eyes.length)];
    var currentCharacter = createCharacter(randomName, randomSurname, randomCoatColor, randomEyesColor);
    if (isEqual(tempCharacters, currentCharacter.name)) continue;
    tempCharacters.push(currentCharacter);
  }
  return tempCharacters;
};

characters = renderCharacters(
  WIZARDS_AMOUNT, WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYE_COLORS
);
console.log(characters);

var renderCharacterNode = function (character) {
  var currentWizard = similarWizardItem.cloneNode(true);
  var currentWizardContent = currentWizard.querySelector('.setup-similar-content');
  var currentWizardEyes = currentWizardContent.querySelector('.wizard-eyes');
  var currentWizardCoat = currentWizardContent.querySelector('.wizard-coat');
  var currentWizardName = currentWizard.querySelector('.setup-similar-label');
  currentWizardEyes.style.fill = character.eyesColor;
  currentWizardCoat.style.fill = character.coatColor;
  currentWizardName.textContent = character.name;
  return currentWizard;
};

var appendCharacters = function (element, amount, data) {
  for (var i = 0; i < amount; i++) {
    element.appendChild(renderCharacterNode(data[i]));
  }
  return element;
};

similarCharactersList.appendChild(appendCharacters(fragment, WIZARDS_AMOUNT, characters));
