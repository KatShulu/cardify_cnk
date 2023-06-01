import { saveNewCardInDeck } from "./services/CardLocalStorage";
import {createDeckFile} from "./services/DeckLocalStorage"

const createFlashcards = async () => {
  // Create deck files
  await createDeckFile("Alcohol");
  await createDeckFile("ObjectProgramming");
  await createDeckFile("Medical");

  // Deck: Alcohol
  const alcoholDeckName = "Alcohol";
  const alcoholCards = [
    { Vodka: "A distilled alcoholic beverage" },
    { Whiskey: "A type of distilled alcoholic beverage made from fermented grain mash" },
    { Rum: "A distilled alcoholic beverage made from sugarcane byproducts" },
    { Tequila: "A distilled alcoholic beverage made from the blue agave plant" },
    { Gin: "A distilled alcoholic beverage flavored with juniper berries" },
    { Beer: "An alcoholic beverage brewed from cereal grains" },
    { Wine: "An alcoholic beverage made from fermented grapes" },
    { Champagne: "A sparkling wine produced from specific grape varieties" },
    { Brandy: "A spirit produced by distilling wine" },
    { Sake: "A Japanese rice wine" },
  ];

  for (const card of alcoholCards) {
    await saveNewCardInDeck(alcoholDeckName, card);
  }

  // Deck: Object Programming
  const oopDeckName = "ObjectProgramming";
  const oopCards = [
    { Class: "A blueprint for creating objects with similar properties and methods" },
    { Inheritance: "The ability of a class to inherit properties and methods from another class" },
    { Encapsulation: "The bundling of data and methods within a class" },
    { Polymorphism: "The ability of an object to take on many forms" },
    { Abstraction: "The process of hiding complex implementation details and providing a simplified interface" },
    { Object: "An instance of a class that encapsulates data and behavior" },
    { Method: "A function defined within a class that operates on objects of that class" },
    { Constructor: "A special method used for initializing objects of a class" },
    { Encapsulation: "The bundling of data and methods within a class" },
    { Interface: "A contract that defines the methods and properties a class must implement" },
  ];

  for (const card of oopCards) {
    await saveNewCardInDeck(oopDeckName, card);
  }

  // Deck: Medical
  const medicalDeckName = "Medical";
  const medicalCards = [
    { Anatomy: "The study of the structure of organisms" },
    { Physiology: "The study of how organisms function" },
    { Diagnosis: "The identification of a disease or condition" },
    { Treatment: "The management and care provided for a disease or condition" },
    { Surgery: "The branch of medicine that uses operative techniques" },
    { Pediatrics: "The branch of medicine that focuses on the medical care of infants, children, and adolescents" },
    { Cardiology: "The branch of medicine that deals with the disorders of the heart" },
    { Neurology: "The branch of medicine that deals with disorders of the nervous system" },
    { Dermatology: "The branch of medicine that focuses on the skin, hair, and nails" },
    { Oncology: "The branch of medicine that deals with cancer" },
  ];

  for (const card of medicalCards) {
    await saveNewCardInDeck(medicalDeckName, card);
  }
};

createFlashcards();
